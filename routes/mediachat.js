let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');

let formidable = require('formidable');
let savetemp = require('./utility/savetemp');
let authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let deleteMedia = require('./utility/deletemedia');
let uploadToBucket = require('./utility/upload');
const {mediachat, post,  tempFile, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    let model = req.body.page === 'post' ? post : post;
    if (req.header !== null && req.header('data-categ') === 'mediaInfo') {
        let chat = JSON.parse(req.body.chat);
        mediachat.find({_id: {$in: chat}}).then(result => {
            let media = null;
            if (result.length > 0) {
                media = [];
                for (let cnt of result) {
                    media.push({_id: cnt._id, like: cnt.like.length, chatTotal: cnt.chat.length, dislike: cnt.dislike.length,
                        isLiked: cnt.like.filter(userID => JSON.parse(JSON.stringify(userID))  === req.user)[0] ? true : false})
                }
            }
            res.status(200).send(media);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'mediaLike') {
        model.findById(req.body.pageID).then(doc => {
          if (doc) {
            let media = doc.media.filter(media => JSON.parse(JSON.stringify(media.id)) === req.body.mediaID)[0];
            let mediaIndex = doc.media.findIndex(media => JSON.parse(JSON.stringify(media.id)) === req.body.mediaID);
            if (media) {
                if (media.chat) {
                    mediachat.findOneAndUpdate({_id: media.chat, like: {$in: [req.user]}}, {$pull: {like: req.user}}).then(result => {
                        if (result) {
                            return res.status(200).send({isLiked: false, like: result.like.length - 1, dislike: result.dislike.length})
                        } else {
                            mediachat.findOneAndUpdate({_id: media.chat, like: {$nin: [req.user]}}, {$push: {like: req.user}, $pull: {dislike: req.user}}).then(cnt => {
                                if (cnt) {
                                    return res.status(200).send({isLiked: true, like: cnt.like.length + 1, dislike: cnt.dislike.length})
                                }
                            })
                        }
                    })
                } else {
                    let newDoc = new mediachat({
                        like: [req.user]
                    });
                    newDoc.save().then(result => {
                        media.chat = result._id;
                        let updateMedia = doc.media;
                        updateMedia[mediaIndex] = media;
                        doc.updateOne({media: updateMedia}).then(() => {
                            return res.status(200).send({isLiked: true, like: 1, pageInfo: {_id : req.body.pageID, media: updateMedia}});
                        })
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                }
            }
          }
        }).catch(e => {
            res.status(404).send(e)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'mediaDislike') {
        model.findById(req.body.pageID).then(doc => {
          if (doc) {
            let media = doc.media.filter(media => JSON.parse(JSON.stringify(media.id)) === req.body.mediaID)[0];
            let mediaIndex = doc.media.findIndex(media => JSON.parse(JSON.stringify(media.id)) === req.body.mediaID);
            if (media) {
                if (media.chat) {
                    mediachat.findOneAndUpdate({_id: media.chat, dislike: {$in: [req.user]}}, {$pull: {dislike: req.user}}).then(result => {
                        if (result) {
                            return res.status(200).send({isDislike: false, dislike: result.dislike.length - 1, like: result.like.length})
                        } else {
                            mediachat.findOneAndUpdate({_id: media.chat, dislike: {$nin: [req.user]}}, {$push: {dislike: req.user}, $pull: {like: req.user}}).then(cnt => {
                                if (cnt) {
                                    return res.status(200).send({isDisliked: true, dislike: cnt.dislike.length + 1, like: cnt.like.length, isLiked: false})
                                }
                            })
                        }
                    })
                } else {
                    let newDoc = new mediachat({
                        dislike: [req.user]
                    });
                    newDoc.save().then(result => {
                        media.chat = result._id;
                        let updateMedia = doc.media;
                        updateMedia[mediaIndex] = media;
                        doc.updateOne({media: updateMedia}).then(() => {
                            return res.status(200).send({isDisliked: true, dislike: 1,pageInfo: {_id : req.body.pageID, media: updateMedia}});
                        })
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                }
            }
          }
        }).catch(e => {
            res.status(404).send(e)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getChat') {
        model.findById(req.body.pageID).then(doc => {
            if (doc) {
                let media = doc.media.filter(media => JSON.parse(JSON.stringify(media.id)) === req.body.cntID)[0];
                let mediaIndex = doc.media.findIndex(media => JSON.parse(JSON.stringify(media.id)) === req.body.cntID);
                if (media) {
                    if (media.chat) {
                        mediachat.findById(media.chat).then(doc => {
                            if (doc) {
                                mediachat.aggregate([{
                                    $match: {_id: objectID(media.chat)}}, 
                                    {$unwind: "$chat"},
                                    {$match: {"chat.replyChat": false}}, 
                                    {$sort: {"chat.created": -1}},
                                    {$skip: req.body.start},
                                    {$limit: req.body.limit},
                                    {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                                        return res.status(200).send({chat: chat[0] ? chat[0].chat.reverse() : [], username: req.username, userImage: req.userImage, userID: req.user,
                                            chatID: media.chat, loadPrevious: (doc.chat.length - (req.body.start + req.body.limit)) > 0 })
                                })
                            }
                        })
                    } else {
                        let newDoc = new mediachat({
                            chat: []
                        });
                        newDoc.save().then(result => {
                            media.chat = result._id;
                            let updateMedia = doc.media;
                            updateMedia[mediaIndex] = media;
                            doc.updateOne({media: updateMedia}).then(() => {
                                return res.status(200).send({chat: [], pageInfo: {_id : req.body.pageID, media: updateMedia},
                                    username: req.username, userImage: req.userImage, userID: req.user, chatID: result._id,
                                    loadPrevious: false});
                            })
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }
                } 
            } else {
               return Promise.reject('Not found');
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    };

    if (req.header !== null && req.header('data-categ') === 'getReply') {
        mediachat.findById(req.body.cntID).then(doc => {
            if (doc) {
                let chatItem = doc.chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.chatID)[0];
                mediachat.aggregate([{
                    $match: {_id: objectID(req.body.cntID)}}, 
                    {$unwind: "$chat"}, 
                    {$match: {'chat.replyChatID': req.body.chatID, 'chat.replyChat': true}},
                    {$sort: {"chat.created": -1}},
                    {$skip: req.body.start},
                    {$limit: req.body.limit},
                    {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                        return res.status(200).send({chat: chat[0] ? chat[0].chat.reverse() : [], username: req.username, userImage: req.userImage, userID: req.user,
                            chatID:req.body.chatID, loadPrevious: ((chatItem ? chatItem.reply.length : 0) - (req.body.start + req.body.limit)) > 0  })
                    })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
    };

    if (req.header !== null && req.header('data-categ') === 'sendChat') {
        formInit(req, formidable).then(form => {
            let mediaList = form.files && form.files.media ? form.files.media : [];
            let fields = form.fields
            savetemp(mediaList, 'mediachat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, _id, created
                    }
                    Promise.all([ mediachat.findByIdAndUpdate(fields.cntID, {$push: {chat: cnt}}),
                        tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}})]).then(cnt => {
                        res.status(200).send({_id, created, media, mediaInfo: {
                            chat: cnt[0]._id, like: cnt[0].like.length, chatTotal: cnt[0].chat.length + 1, dislike: cnt[0].dislike.length
                        }})
                        mediachat.findById(fields.cntID).then(doc => {
                            if (doc) {
                                let chat = doc.chat
                                let chatItem = chat.filter(chat => chat._id === _id)[0];
                                if (chatItem && chatItem.tempFile) {
                                    chatItem.tempFile = null;
                                    let chatIndex = chat.findIndex(chat => chat._id === _id);
                                    chat[chatIndex] = chatItem;
                                    doc.updateOne({chat});
                                }
                            }
                        })
                    })
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header !== null && req.header('data-categ') === 'replyChat') {
        formInit(req, formidable).then(form => {
            let mediaList = form.files && form.files.media ? form.files.media : [];
            let fields = form.fields
            savetemp(mediaList, 'mediachat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, _id, created, replyChat: true,
                        replyChatID: fields.chatID
                    }
                    mediachat.findById(fields.cntID).then(doc => {
                        if (doc ){
                            let chat = doc.chat;
                            chat.push(cnt);
                            let chatItem = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === fields.chatID)[0];
                            if (chatItem) {
                                chatItem.reply.push(cnt._id);
                                let chatItemIndex = chat.findIndex(cnt => JSON.parse(JSON.stringify(cnt._id)) === fields.chatID);
                                chat[chatItemIndex] = chatItem;
                                Promise.all([doc.updateOne({chat}),
                                    tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}})]).then(cnt => {
                                    res.status(200).send({_id, created, media,  mediaInfo: {
                                        chat: doc._id, like: doc.like.length, chatTotal: chat.length, dislike: doc.dislike.length
                                    }})
                                    mediachat.findById(fields.cntID).then(doc => {
                                        if (doc) {
                                            let chat = doc.chat
                                            let replyChat = chat.filter(chat => chat._id === _id)[0];
                                            if (replyChat && replyChat.tempFile) {
                                                replyChat.tempFile = null;
                                                let replyChatIndex = chat.findIndex(chat => chat._id === _id);
                                                chat[replyChatIndex] = replyChat;
                                                doc.updateOne({chat});
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    })
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header !== null && req.header('data-categ') === 'deleteChat') {
        Promise.all([deleteMedia(JSON.parse(req.body.media)),
            mediachat.findByIdAndUpdate(req.body.chatID, {$pull: {chat: {'_id': req.body.cntID}}})]).then(cnt => {
            return res.status(200).send({
                chat: cnt[1]._id, like: cnt[1].like.length, chatTotal: cnt[1].chat.length - 1, dislike: cnt[1].dislike.length});
        }).catch(err => {
            res.status(500).send(err);
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'deleteReply') {
        deleteMedia(JSON.parse(req.body.media)).then(() => {
            mediachat.findOne({_id: req.body.chatID}).then(doc => {
                if (doc) {
                    let chat = doc.chat;
                    let removeChatItem = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID)[0];
                    let removeChat = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== req.body.cntID);
                    if (removeChatItem) {
                        let chatItem = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === removeChatItem.replyChatID)[0];
                        if (chatItem) {
                            let reply = chatItem.reply.filter(id => JSON.parse(JSON.stringify(id)) !== req.body.cntID);
                            chatItem.reply = reply;
                            let chatItemIndex = chat.findIndex(cnt => JSON.parse(JSON.stringify(cnt._id)) === removeChatItem.replyChatID);
                            removeChat[chatItemIndex] = chatItem;
                            doc.updateOne({chat: removeChat}).then(() => {
                                return res.status(200).send({
                                    chat: doc._id, like: doc.like.length, chatTotal: removeChat.length, dislike: doc.dislike.length});
                            })
                        }
                    }
                }
            })
        }).catch(err => {
            res.status(500).send(err);
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'editChat') {
        formInit(req, formidable).then(form => {
            let mediaList = form.files && form.files.media ? form.files.media : [];
            let fields = form.fields
            savetemp(mediaList, 'mediachat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID
                    }
                    mediachat.findOneAndUpdate({_id: fields.cntID, 'chat._id' : fields.chatID}, {$set: {chat: cnt}}).then(result => {
                        res.status(200).send({_id, created})
                    })
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }
});

module.exports = router

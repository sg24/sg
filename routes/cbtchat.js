let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');

let formidable = require('formidable');
let savetemp = require('./utility/savetemp');
let authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let uploadToBucket = require('./utility/upload');
let deleteMedia = require('./utility/deletemedia');
const {qchat, cbtchat, tempFile, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getChat') {
        qchat.findById(req.body.pageID).then(doc => {
            if (doc) {
                if (doc && doc.chat && doc.chat._id) {
                    cbtchat.findOne({_id: objectID(doc.chat._id)}).then(result => {
                        let total = 0;
                        if (result) {
                            let chat = result.chat.filter(cnt => cnt.replyChat === false);
                            total = chat.length;
                        }
                        cbtchat.aggregate([{
                            $match: {_id: objectID(doc.chat._id)}}, 
                            {$unwind: "$chat"},
                            {$match: {"chat.replyChat": false}}, 
                            {$sort: {"chat.created": -1}},
                            {$skip: req.body.start},
                            {$limit: req.body.limit},
                            {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                                return res.status(200).send({chat: chat[0] ? chat[0].chat.reverse() : [], username: req.username, userImage: req.userImage, userID: req.user,
                                    chatID: doc.chat._id, loadPrevious: (total - (req.body.start + req.body.limit)) > 0 })
                        })
                    })
                } else {
                    let newDoc = new cbtchat({
                        chat: []
                    });
                    newDoc.save().then(result => {
                        let chat = {total: 0, _id: result._id, user: []};
                        doc.updateOne({chat}).then(() => {
                            return res.status(200).send({chat: [], pageInfo: {_id: req.body.pageID, chat},
                                username: req.username, userImage: req.userImage, userID: req.user, chatID: result._id, loadPrevious: false});
                        });
                    })
                }
            } else  {
                return Promise.reject('Not found');
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getReply') {
        cbtchat.findById(req.body.cntID).then(doc => {
            if (doc) {
                let chatItem = doc.chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.chatID)[0];
                cbtchat.aggregate([{
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
            savetemp(mediaList, 'cbtchat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, _id, created
                    }
                    Promise.all([cbtchat.findByIdAndUpdate(fields.cntID, {$push: {chat: cnt}}),
                        tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}})]).then(cnt => {
                        let total = cnt[0].chat.length + 1;
                        qchat.findByIdAndUpdate(fields.pageID, {'chat.total': total}).then(result => {
                            res.status(200).send({_id, created, media, pageInfo: {_id: fields.pageID, chat: {total, user: result.chat.user, _id: result.chat._id}}})
                        })
                        
                        cbtchat.findById(fields.cntID).then(doc => {
                            if (doc) {
                                let chat = doc.chat
                                let chatItem = chat.filter(chat => JSON.parse(JSON.stringify(chat._id)) === JSON.parse(JSON.stringify(_id)))[0];
                                if (chatItem && chatItem.tempFileID) {
                                    chatItem.tempFileID = null;
                                    let chatIndex = chat.findIndex(chat => JSON.parse(JSON.stringify(chat._id)) === JSON.parse(JSON.stringify(_id)));
                                    chat[chatIndex] = chatItem;
                                    doc.updateOne({chat}).catch();
                                }
                            }
                        })
                    })
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
        return;
    }

    if (req.header !== null && req.header('data-categ') === 'replyChat') {
        formInit(req, formidable).then(form => {
            let mediaList = form.files && form.files.media ? form.files.media : [];
            let fields = form.fields
            savetemp(mediaList, 'cbtchat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, _id, created, replyChat: true,
                        replyChatID: fields.chatID
                    }
                    cbtchat.findById(fields.cntID).then(doc => {
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
                                    let total = chat.length;
                                    qchat.findByIdAndUpdate(fields.pageID, {'chat.total': total}).then(result => {
                                        res.status(200).send({_id, created, media, pageInfo: {_id: fields.pageID, chat: {total, user: result.chat.user, _id: result.chat._id}}})
                                    })
                                    cbtchat.findById(fields.cntID).then(doc => {
                                        if (doc) {
                                            let chat = doc.chat
                                            let chatItem = chat.filter(chat => JSON.parse(JSON.stringify(chat._id)) === JSON.parse(JSON.stringify(_id)))[0];
                                            if (chatItem && chatItem.tempFileID) {
                                                chatItem.tempFileID = null;
                                                let chatIndex = chat.findIndex(chat => JSON.parse(JSON.stringify(chat._id)) === JSON.parse(JSON.stringify(_id)));
                                                chat[chatIndex] = chatItem;
                                                doc.updateOne({chat}).catch();
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
            cbtchat.findByIdAndUpdate(req.body.chatID, {$pull: {chat: {'_id': req.body.cntID}}})]).then(cnt => {
            qchat.findByIdAndUpdate({_id: req.body.pageID}, {'chat.total': cnt[1].chat.length - 1}).then(result => {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, chat: {total: cnt[1].chat.length - 1, user: result.chat.user, _id: result.chat._id}}});  
            })
        }).catch(err => {
            res.status(500).send(err);
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'deleteReply') {
        deleteMedia(JSON.parse(req.body.media)).then(() => {
            cbtchat.findOne({_id: req.body.chatID}).then(doc => {
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
                                qchat.findByIdAndUpdate({_id: req.body.pageID}, {'chat.total': removeChat.length}).then(result => {
                                    return res.status(200).send({pageInfo: {_id: req.body.pageID, chat: {total: removeChat.length, user: result.chat.user, _id: result.chat._id}}});  
                                })
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
});

module.exports = router

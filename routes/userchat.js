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
let notifications = require('./utility/notifications');
let sequence = require('./utility/sequence');
const {user, userchat, notifications : userNotification, tempFile, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getChat') {
        user.findById(req.body.pageID).then(doc => {
            if (doc) {
                let sentchat = doc.chat.length > 0 ? doc.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === JSON.parse(JSON.stringify(req.user)))[0] : null;
                let recieveChat = null;
                if (!sentchat) {
                    recieveChat = req.chat.length > 0 ? req.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === JSON.parse(JSON.stringify(doc._id)))[0] : null
                }
                let chatInfo = sentchat || recieveChat;
                if (chatInfo) {
                    userNotification.findOneAndUpdate({userID: req.user}, {$pull: {'userChat': {userID: req.body.pageID}}}).then(() => {
                        userchat.findById(chatInfo._id).then(result => {
                            userchat.aggregate([{
                                $match: {_id: chatInfo._id}}, 
                                {$unwind: "$chat"}, 
                                {$sort: {"chat.created": -1}},
                                {$skip: req.body.start},
                                {$limit: req.body.limit},
                                {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                                    return res.status(200).send({chat: chat[0] ? chat[0].chat.reverse() : [], username: req.username, userImage: req.userImage, userID: req.user,
                                        chatID: chatInfo._id, loadPrevious: (result.chat.length - (req.body.start + req.body.limit)) > 0,
                                        pageInfo: {_id: req.body.pageID, notification: 0}})
                            })
                        });
                    })
                }  else {
                    return res.status(200).send({chat: [],
                        username: req.username, userImage: req.userImage, userID: req.user, chatID: req.body.pageID, loadPrevious: false});
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
        userchat.findById(req.body.cntID).then(doc => {
            if (doc) {
                let chatItem = doc.chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.chatID)[0];
                userchat.aggregate([{
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

    if (req.header && req.header('data-categ') === 'sendChat') {
        formInit(req, formidable).then(form => {
            let mediaList = form.files && form.files.media ? form.files.media : [];
            let fields = form.fields;
            let replyChatInfo = JSON.parse(fields.replyChatInfo);
            savetemp(mediaList, 'userchat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let isReplyChat = replyChatInfo.length > 0 ? { replyChatID: replyChatInfo[0]._id, replyChat: true} : {};
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, created, _id, replyChatInfo, ...isReplyChat
                    }
                    user.findById(fields.cntID).then(doc => {
                        if (doc) {
                            let sentchat = doc.chat.length > 0 ? doc.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === JSON.parse(JSON.stringify(req.user)))[0] : null;
                            let recieveChat = null;
                            if (!sentchat) {
                                recieveChat = req.chat.length > 0 ? req.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === JSON.parse(JSON.stringify(doc._id)))[0] : null
                            }
                            let chatInfo = sentchat || recieveChat;
                            if (!chatInfo) {
                                let newDoc = new userchat({
                                    chat: [cnt]
                                });
                                newDoc.save().then(userChatDoc => {
                                    return sequence([user.findByIdAndUpdate(fields.pageID, {$pull: {chat: {'authorID': req.user}}}), user.findByIdAndUpdate(fields.pageID, {$push: {chat: {...cnt, _id: userChatDoc._id}}}),
                                        tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
                                        user.findByIdAndUpdate(req.user, {$pull: {chat: {'authorID': fields.pageID}}}), user.findByIdAndUpdate(req.user, {$push: {chat: { ...cnt, 
                                            _id: userChatDoc._id, authorID: fields.pageID, username: doc.username, userImage: doc.userImage}}})]).then(result => {
                                        if (result[1]) {
                                            let isOnline = (new Date().getTime() - new Date(result[1].visited).getTime()) < 60000;
                                            if (!isOnline) {
                                                notifications('userChat', fields.pageID, {userID: req.user, ID: userChatDoc._id, enableCounter: true})
                                            }
                                        }
                                        res.status(200).send({_id, created, media, chatID: userChatDoc._id, pageInfo: {_id: fields.pageID, chat: [{...cnt, _id: result._id}]}});
                                        if (userChatDoc) {
                                            if (cnt && cnt.tempFileID) {
                                                cnt.tempFileID = null;
                                                userChatDoc.updateOne({chat: [cnt]}).catch();
                                            }
                                        }
                                        return;
                                    })
                                })
                            }
                        } else {
                            return sequence([cnt.replyChatID ? 
                                userchat.findById(fields.cntID).then(userChatDoc => {
                                    if (userChatDoc) {
                                        let chat = userChatDoc.chat;
                                        let chatItem = chat.filter(chat => JSON.parse(JSON.stringify(chat._id)) === cnt.replyChatID)[0];
                                        if (chatItem) {
                                            chatItem.reply.push(cnt._id);
                                            let chatItemIndex = chat.findIndex(chat => JSON.parse(JSON.stringify(chat._id)) === cnt.replyChatID);
                                            chat[chatItemIndex] = chatItem;
                                        }
                                        return userChatDoc.updateOne({chat});
                                    }
                                    return Promise.reject()
                                }) : Promise.resolve(), userchat.findByIdAndUpdate(fields.cntID, {$push: {chat: cnt}}),
                                user.findByIdAndUpdate(fields.pageID, {$pull: {chat: {'authorID': req.user}}}), user.findByIdAndUpdate(fields.pageID, {$push: {chat: {...cnt, _id: fields.cntID}}})]).then(friendChatDoc=> {
                                return sequence([
                                    tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
                                    user.findByIdAndUpdate(req.user, {$pull: {chat: {'authorID': fields.pageID}}}), user.findByIdAndUpdate(req.user, {$push: {chat: { ...cnt, 
                                        _id: fields.cntID, authorID: fields.pageID, username: friendChatDoc[3].username, userImage: friendChatDoc[2].userImage}}})]).then(() => {
                                    if (friendChatDoc[3]) {
                                        let isOnline = (new Date().getTime() - new Date(friendChatDoc[3].visited).getTime()) < 60000;
                                        if (!isOnline) {
                                            notifications('userChat', fields.pageID, {userID: req.user, ID: fields.cntID, enableCounter: true})
                                        }
                                    }
                                    let message = cnt.content ? cnt.content : 
                                        cnt.media && cnt.media.length > 0 ? cnt.media[cnt.media.length -1].filename.split('.')[0] + '.' + cnt.media[cnt.media.length -1].ext.split('/')[1] : null;
                                    res.status(200).send({_id, created, media, pageInfo: {_id: fields.pageID, notification: 0, chat: [{...cnt, _id: fields.cntID, message}]}});
                                    userchat.findById(fields.cntID).then(userChatDoc => {
                                        if (userChatDoc) {
                                            let chat = userChatDoc.chat;
                                            let replyChat = chat.filter(chat => JSON.parse(JSON.stringify(chat._id)) === JSON.parse(JSON.stringify(_id)))[0];
                                            if (replyChat && replyChat.tempFileID) {
                                                replyChat.tempFileID = null;
                                                let replyChatIndex = chat.findIndex(chat => JSON.parse(JSON.stringify(chat._id)) === JSON.parse(JSON.stringify(_id)));
                                                chat[replyChatIndex] = replyChat;
                                                userChatDoc.updateOne({chat}).catch();
                                            }
                                        }
                                    });
                                    return;
                                })
                            })
                        }
                    });
                });
            });
        });
    }

    if (req.header && req.header('data-categ') === 'shareChat') {
        let cnt = JSON.parse(req.body.cnt);
        let reciepent = JSON.parse(req.body.reciepent);
        const send = (cnt, reciever, info) => {
            let _id = objectID();
            let chat = {
                authorID: req.user, username: req.username, userImage: req.userImage,
                content: cnt.content, media: cnt.media, tempFileID: cnt.tempFileID,
                shared: cnt.authorID
            }
            return sequence([userchat.findByIdAndUpdate(info._id, {$push: {chat: {...chat,  _id}}}),
                user.findByIdAndUpdate(reciever, {$pull: {chat: {'authorID': req.user}}}), user.findByIdAndUpdate(reciever, {$push: {chat: {...chat, _id: info._id}}}),
                user.findByIdAndUpdate(req.user, {$pull: {chat: {'authorID': reciever}}}), user.findByIdAndUpdate(req.user, {$push: {chat: { ...chat, 
                    _id: info._id, authorID: reciever, username: info.username, userImage: info.userImage}}})]).then(result => {
                if (result[2]) {
                    let isOnline = (new Date().getTime() - new Date(result[2].visited).getTime()) < 60000;
                    if (!isOnline) {
                        notifications('userChat', reciever, {userID: req.user, ID: info._id, enableCounter: true})
                    }
                }
                return Promise.resolve({...chat,  _id});
            })
        }
        let sent = 0;
        for (let reciever of reciepent) {
            let info = req.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === reciever)[0];
            if (info) {
                send(cnt, reciever, info).then((chat) => {
                    ++sent;
                    if (sent === reciepent.length) {
                        res.status(200).send(chat);
                    }
                }).catch(err => {
                    ++sent;
                    if (sent === reciepent.length) {
                        res.status(500).send(err)
                    }
                })
            } else {
                user.findById(reciever).then(result => {
                    let info = result.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0];
                    if (info) {
                        send(cnt, reciever, {_id: info._id, authorID: result._id, username: result.username, userImage: result.image}).then(chat => {
                            ++sent;
                            if (sent === reciepent.length) {
                                res.status(200).send(chat);
                            }
                        }).catch(err => {
                            ++sent;
                            if (sent === reciepent.length) {
                                res.status(500).send(err)
                            }
                        })
                    } else {
                        let _id = objectID();
                        let chat  = {
                            authorID: req.user, username: req.username, userImage: req.userImage,
                            content: cnt.content, media: cnt.media, tempFileID: cnt.tempFileID,
                            shared: cnt.authorID
                        }
                        let newDoc = new userchat({chat: {...chat, _id}});
                        newDoc.save().then(result => {
                            sequence([user.findByIdAndUpdate(reciever, {$push: {chat: {...chat, _id: result._id}}})]).then((info) => {
                                sequence([user.findByIdAndUpdate(req.user, { $push: {chat: { ...chat, _id: result._id, authorID: reciever, username: info[0].username, userImage: info[0].image}}})]).then(() => {
                                    if (info[0]) {
                                        let isOnline = (new Date().getTime() - new Date(info[0].visited).getTime()) < 60000;
                                        if (!isOnline) {
                                            notifications('userChat', reciever, {userID: req.user, ID: result._id, enableCounter: true})
                                        } 
                                        ++sent;
                                        if (sent === reciepent.length) {
                                            res.status(200).send({...chat, _id});
                                        }
                                    }
                                })
                            }).catch(err => {
                                ++sent;
                                if (sent === reciepent.length) {
                                    res.status(500).send(err)
                                }
                            })
                        })
                    }
                }).catch(err => {
                    res.status(500).send(err);
                })
            }
        }
    }


    if (req.header !== null && req.header('data-categ') === 'deleteChat') {
        Promise.all([deleteMedia(JSON.parse(req.body.media)),
            userchat.findById(req.body.chatID)]).then(doc => {
            let chat = doc[1].chat.length > 1 ? doc[1].chat[doc[1].chat.length -2] : null;
            let removeChatItem = doc[1].chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID)[0];
            let removeChat = doc[1].chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== req.body.cntID);
            if (removeChatItem && removeChatItem.replyChat) {
                let chatItem = removeChat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === removeChatItem.replyChatID)[0];
                if (chatItem) {
                    let chatItemIndex = removeChat.findIndex(cnt => JSON.parse(JSON.stringify(cnt._id)) === removeChatItem.replyChatID);
                    let chatItemReply = chatItem.reply.filter(chatID => JSON.parse(JSON.stringify(chatID)) !== req.body.cntID);
                    chatItem.reply = chatItemReply
                    removeChat[chatItemIndex] = chatItem;
                }
            }
            doc[1].updateOne({chat: removeChat}).then(() => {
                if (chat) {
                    chat = JSON.parse(JSON.stringify(chat));
                   sequence([user.findByIdAndUpdate(req.body.pageID, {$pull: {chat: {'authorID': req.user}}}), user.findByIdAndUpdate(req.body.pageID, {$push: {chat: {...chat, 
                        authorID: req.user, username: req.username, userImage: req.userImage, _id: req.body.chatID}}})]).then(doc => {
                        sequence([user.findByIdAndUpdate(req.user, {$pull: {chat: {'authorID': req.body.pageID}}}), user.findByIdAndUpdate(req.user, {$push: {chat: { ...chat, 
                            authorID: doc[1]._id, username: doc[1].username, userImage: doc[1].userImage,  _id: req.body.chatID}}})]).then(() => {
                                return res.sendStatus(200);
                        })
                    });     
                } else {
                    return res.sendStatus(200);
                }
            });
        }).catch(err => {
            res.status(500).send(err);
        })
        return
    }
});

module.exports = router

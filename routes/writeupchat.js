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
const {writeup, writeupchat, tempFile, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getChat') {
        writeup.findById(req.body.pageID).then(doc => {
            if (doc) {
                if (doc && doc.chat && doc.chat._id) {
                    writeupchat.findOne({_id: objectID(doc.chat._id)}).then(result => {
                        let total = 0;
                        if (result) {
                            let chat = result.chat.filter(cnt => cnt.replyChat === false);
                            total = chat.length;
                        }
                        writeupchat.aggregate([{
                            $match: {_id: objectID(doc.chat._id)}}, 
                            {$unwind: "$chat"},
                            {$match: {"chat.replyChat": false}}, 
                            {$sort: {"chat.created": -1}},
                            {$skip: req.body.start},
                            {$limit: req.body.limit},
                            {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                                let updateChat = [];
                                if (chat[0]) {
                                    for (let cnt of chat[0].chat) {
                                        let updateCnt = JSON.parse(JSON.stringify(cnt));
                                        updateChat.push({...updateCnt, correct:  cnt.correct.length , wrong: cnt.wrong.length,
                                            isCorrect: cnt.correct.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0] ? true : false,
                                            isWrong: cnt.wrong.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0] ? true : false})
                                    }
                                }
                                return res.status(200).send({chat: chat[0] ? updateChat.reverse() : [], username: req.username, userImage: req.userImage, userID: req.user,
                                    chatID: doc.chat._id, loadPrevious: (total - (req.body.start + req.body.limit)) > 0 })
                        })
                    })
                } else {
                    let newDoc = new writeupchat({
                        chat: []
                    });
                    newDoc.save().then(result => {
                        let chat = {total: 0, _id: result._id, user: []};
                        doc.updateOne({chat}).then(() => {
                            return res.status(200).send({chat: [], pageInfo: {_id: req.body.pageID, chat},
                                username: req.username, userImage: req.userImage, userID: req.user, chatID: result._id, loadPrevious: false,
                                correct: 0, wrong: 0});
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
        writeupchat.findById(req.body.cntID).then(doc => {
            if (doc) {
                let chatItem = doc.chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.chatID)[0];
                writeupchat.aggregate([{
                    $match: {_id: objectID(req.body.cntID)}}, 
                    {$unwind: "$chat"}, 
                    {$match: {'chat.replyChatID': req.body.chatID, 'chat.replyChat': true}},
                    {$sort: {"chat.created": -1}},
                    {$skip: req.body.start},
                    {$limit: req.body.limit},
                    {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                        let updateChat = [];
                        if (chat[0]) {
                            for (let cnt of chat[0].chat) {
                                let updateCnt = JSON.parse(JSON.stringify(cnt));
                                updateChat.push({...updateCnt, correct:  cnt.correct.length , wrong: cnt.wrong.length,
                                    isCorrect: cnt.correct.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0] ? true : false,
                                    isWrong: cnt.wrong.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0] ? true : false})
                            }
                        }
                        return res.status(200).send({chat: chat[0] ? updateChat.reverse() : [], username: req.username, userImage: req.userImage, userID: req.user,
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
            savetemp(mediaList, 'writeupchat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, _id, created
                    }
                    Promise.all([writeupchat.findByIdAndUpdate(fields.cntID, {$push: {chat: cnt}}),
                        tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
                        writeup.findOneAndUpdate({_id: fields.pageID, 'chat.user.authorID': {$ne: req.user}}, {$push: {'chat.user': {authorID: req.user, username: req.username, userImage: req.userImage}}})]).then(cnt => {
                        let total = cnt[0].chat.length + 1;
                        writeup.findByIdAndUpdate(fields.pageID, {'chat.total': total}).then(result => {
                            res.status(200).send({_id, created, media, pageInfo: {_id: fields.pageID, chat: {...result.chat, total, user: result.chat.user, _id: result.chat._id}}})
                        })
                        
                        writeupchat.findById(fields.cntID).then(doc => {
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
            savetemp(mediaList, 'writeupchat', req.user).then(tempFileID => {
                uploadToBucket(mediaList, fields.description).then(media => {
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, media, tempFileID, _id, created, replyChat: true,
                        replyChatID: fields.chatID
                    }
                    writeupchat.findById(fields.cntID).then(doc => {
                        if (doc ){
                            let chat = doc.chat;
                            chat.push(cnt);
                            let chatItem = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === fields.chatID)[0];
                            if (chatItem) {
                                chatItem.reply.push(cnt._id);
                                let chatItemIndex = chat.findIndex(cnt => JSON.parse(JSON.stringify(cnt._id)) === fields.chatID);
                                chat[chatItemIndex] = chatItem;
                                Promise.all([doc.updateOne({chat}),
                                    tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
                                    writeup.findOneAndUpdate({_id: fields.pageID, 'chat.user.authorID': {$ne: req.user}}, {$push: {'chat.user': {authorID: req.user, username: req.username, userImage: req.userImage}}})]).then(() => {
                                    res.status(200).send({_id, created, media});
                                    writeupchat.findById(fields.cntID).then(doc => {
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
            writeupchat.findByIdAndUpdate(req.body.chatID, {$pull: {chat: {'_id': req.body.cntID}}})]).then(result => {
            writeup.findById(req.body.pageID).then(doc => {
                if (doc && doc.chat.total > 0 && result[1]) {
                    let chat = doc.chat;
                    chat.total = chat.total - 1;
                    let chatItem = result[1].chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID)[0];
                    if (chatItem && (chat.correctTotal >= chatItem.correct.length)) {
                        chat.correctTotal = chat.correctTotal - chatItem.correct.length;
                    }
                    if (chatItem && (chat.wrongTotal >= chatItem.wrong.length)) {
                        chat.wrongTotal = chat.wrongTotal - chatItem.wrong.length;
                    }
                    doc.updateOne({chat}).then(() => {
                        return res.status(200).send({pageInfo: {_id: req.body.pageID, chat}});  
                    });
                }
            })
        }).catch(err => {
            res.status(500).send(err);
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'deleteReply') {
        deleteMedia(JSON.parse(req.body.media)).then(() => {
            writeupchat.findOne({_id: req.body.chatID}).then(doc => {
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
                                res.sendStatus(200);
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

    if (req.header !== null && req.header('data-categ') === 'setCorrect') {
        writeupchat.findOne({_id: req.body.chatID}).then(doc => {
            if (doc && doc.chat) {
                let chat = doc.chat;
                let chatItem = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID)[0];
                let isCorrect = false;
                let updateIsWrong = false;
                let correct = 0;
                let wrong = 0;
                if (chatItem) {
                    let checkCorrect = chatItem.correct.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0];
                    if (checkCorrect) {
                        chatItem.correct = chatItem.correct.filter(id => JSON.parse(JSON.stringify(id)) !== req.user);
                    } else {
                        chatItem.correct.push(req.user);
                        isCorrect = true;
                    }
                    let checkWrong = chatItem.wrong.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0];
                    if (checkWrong) {
                        chatItem.wrong = chatItem.wrong.filter(id => JSON.parse(JSON.stringify(id)) !== req.user);
                        updateIsWrong = true;
                    }
                    correct = chatItem.correct.length;
                    wrong = chatItem.wrong.length;
                    let chatItemIndex = chat.findIndex(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID);
                    chat[chatItemIndex] = chatItem;
                }
                let total = isCorrect ? 1 : -1;
                doc.updateOne({chat}).then(() => {
                    writeup.findById(req.body.pageID).then(writeupDoc => {
                        if (writeupDoc && (writeupDoc.chat.correctTotal >= (isCorrect ? 0 : 1))) {
                            let updateChat = writeupDoc.chat;
                            if (updateIsWrong && (writeupDoc.chat.wrongTotal >= 1)) {
                                updateChat.wrongTotal = writeupDoc.chat.wrongTotal -1;
                            }
                            updateChat.correctTotal = writeupDoc.chat.correctTotal + total;
                            writeupDoc.updateOne({chat: updateChat}).then(result => {
                                if (result) {
                                    let updateWrong = updateIsWrong ? {wrong, isWrong: false} : {};
                                    return res.status(200).send({pageInfo: {_id: req.body.pageID, isCorrect, 
                                        chat: updateChat},
                                        chatInfo: {correct, isCorrect, ...updateWrong}});
                                }
                            })
                        }
                    });
                });
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setWrong') {
        writeupchat.findOne({_id: req.body.chatID}).then(doc => {
            if (doc && doc.chat) {
                let chat = doc.chat;
                let chatItem = chat.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID)[0];
                let isWrong = false;
                let updateIsCorrect = false;
                let correct = 0;
                let wrong = 0;
                if (chatItem) {
                    let checkWrong = chatItem.wrong.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0];
                    if (checkWrong) {
                        chatItem.wrong = chatItem.wrong.filter(id => JSON.parse(JSON.stringify(id)) !== req.user);
                    } else {
                        chatItem.wrong.push(req.user);
                        isWrong = true;
                    }
                    let checkCorrect = chatItem.correct.filter(id => JSON.parse(JSON.stringify(id)) === req.user)[0];
                    if (checkCorrect) {
                        chatItem.correct = chatItem.correct.filter(id => JSON.parse(JSON.stringify(id)) !== req.user);
                        updateIsCorrect = true;
                    }
                    correct = chatItem.correct.length;
                    wrong = chatItem.wrong.length;
                    let chatItemIndex = chat.findIndex(cnt => JSON.parse(JSON.stringify(cnt._id)) === req.body.cntID);
                    chat[chatItemIndex] = chatItem;
                }
                let total = isWrong ? 1 : -1;
                doc.updateOne({chat}).then(() => {
                    writeup.findById(req.body.pageID).then(writeupDoc => {
                        if (writeupDoc && (writeupDoc.chat.wrongTotal >= (isWrong ? 0 : 1))) {
                            let updateChat = writeupDoc.chat;
                            if (updateIsCorrect && (writeupDoc.chat.correctTotal >= 1)) {
                                updateChat.correctTotal = writeupDoc.chat.correctTotal -1;
                            }
                            updateChat.wrongTotal = writeupDoc.chat.wrongTotal + total;
                            writeupDoc.updateOne({chat: updateChat}).then(result => {
                                if (result) {
                                    let updateCorrect = updateIsCorrect ? {correct, isCorrect: false} : {};
                                    return res.status(200).send({pageInfo: {_id: req.body.pageID, isWrong, 
                                        chat: updateChat},
                                        chatInfo: {wrong, isWrong, ...updateCorrect}});
                                }
                            })
                        }
                    });
                });
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }
});

module.exports = router

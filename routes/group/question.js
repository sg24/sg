let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');

let formidable = require('formidable');
let savetemp = require('../utility/savetemp');
let sequence = require('../utility/sequence');
let deleteMedia = require('../utility/deletemedia');
let authenticate = require('../../serverDB/middleware/authenticate');
let formInit = require('../utility/forminit');
let uploadToBucket = require('../utility/upload');
let notifications = require('../utility/notifications');
const {question, group, question:groupquestion, qchat, connectStatus} = require('../../serverDB/serverDB');


router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonegroupquestion') {
        groupquestion.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            if (result) {
                let cnt = JSON.parse(JSON.stringify(result));
                delete cnt.block;
                let updateResult = {...cnt,
                share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0}
                res.status(200).send(updateResult);
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getQuestion') {
        let groupID = req.body.searchCnt;
        group.findOne({member: {$in: [req.user]}, _id: groupID}).then(doc => {
            if (doc) {
                groupquestion.find({$or: [{groupID}, {'share.reciever': groupID}], _isCompleted: true, block: {$nin: [req.user]}})
                    .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                    let updateResult = [];
                    if (result) {
                        for (let cnt of result) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateResult.push({...updateCnt,
                            share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                            shareInfo: cnt.groupID !== groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === groupID)[0] : null,
                            isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0})
                        }
                    }
                    let cbt = Math.round(Math.random());
                    if (cbt === 0) {
                        qchat.find({_isCompleted: true, block: {$nin: [req.user]}, authorID: {$ne: req.user}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                            let lastItem = updateResult[updateResult.length - 1];
                            if (lastItem && doc) {
                                let updateDoc = [];
                                for (let cnt of doc) {
                                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                                    delete updateCnt.block;
                                    updateDoc.push({...updateCnt,
                                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                                    takeExam: cnt.participant === 'Public' ? true :
                                    cnt.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0] ? true : false,
                                    isPending: cnt.request.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                                    request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length})
                                }
                                lastItem.cbt= updateDoc
                                updateResult[updateResult.length - 1] = lastItem
                            }
                            res.status(200).send({page: updateResult, loadMore: result.length > 0});
                        })
                    } else {
                        res.status(200).send({page: updateResult, loadMore: result.length > 0});
                    }
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getByAuthor') {
        groupquestion.find({authorID: { $in: [req.user, ...req.friend] }, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0})
                }
            }
            let showAdvert = Math.round(Math.random());
            if (showAdvert === 0) {
                qchat.find({_isCompleted: true, block: {$nin: [req.user]}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem && doc) {
                        let updateDoc = [];
                        for (let cnt of doc) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateDoc.push({...updateCnt,
                            share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                            isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                            takeExam: cnt.participant === 'Public' ? true :
                            cnt.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0] ? true : false,
                            isPending: cnt.request.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                            request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length})
                        }
                        lastItem.cbt= updateDoc
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                })
            } else {
                res.status(200).send({page: updateResult, loadMore: result.length > 0});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setFavorite') {
        groupquestion.findById(req.body.pageID).then(groupquestionDoc => {
            if (groupquestionDoc) {
                // group.findOne({member: {$in: [req.user]}, _id: groupquestionDoc.groupID}).then(groupDoc => {
                //     if (groupDoc) {
                        groupquestion.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
                            if (doc) {
                                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
                            }
                            groupquestion.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
                            })
                        })
                    // }
            //     })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShare') {
        let reciepent = JSON.parse(req.body.reciepent);
        groupquestion.findById(req.body.pageID).then(questionDoc => {
            if (questionDoc) {
                Promise.all([questionDoc.groupID ? group.findById(questionDoc.groupID) : Promise.resolve()]).then(groupDoc => {
                    let updateReciepent = reciepent.map(reciever => ({authorID: req.user, username: req.username, userImage: req.userImage,
                        cntID: req.body.pageID, pageID: groupDoc[0] ? groupDoc[0]._id : null, pageTitle: groupDoc[0] ? groupDoc[0].title: null, reciever}));
                    groupquestion.findOneAndUpdate({_id: req.body.pageID}, {$push: {'share': updateReciepent}}).then(() => {
                        groupquestion.findById(req.body.pageID).then(doc => {
                            if (doc) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                                for (let userID of reciepent) {
                                    notifications('groupQuestionShare', userID, {userID: req.user, ID: req.body.pageID}, false);
                                }
                                return
                            }
                            return res.sendStatus(200);
                        })
                    });
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShareGroup') {
        let reciepent = JSON.parse(req.body.cnt);
        let checkGroup = [];
        let checked = 0;
        for (let groupID of reciepent) {
            group.findOne({_id: groupID, member: {$in: [req.user]}}).then(checkGroupDoc => {
                if (checkGroupDoc) {
                    ++checked;
                    checkGroup.push(checkGroupDoc._id);
                    if (checked === reciepent.length) {
                        groupquestion.findById(req.body.pageID).then(questionDoc => {
                            if (questionDoc) {
                                Promise.all([questionDoc.groupID ? group.findById(questionDoc.groupID) : Promise.resolve()]).then(groupDoc => {
                                    let updateReciepent = reciepent.map(reciever => ({authorID: req.user, username: req.username, userImage: req.userImage,
                                        cntID: req.body.pageID, pageID: groupDoc[0] ? groupDoc[0]._id : null, pageTitle: groupDoc[0] ? groupDoc[0].title: null, reciever}));
                                        questionDoc.updateOne({$push: {'share': updateReciepent}}).then(() => {
                                        groupquestion.findById(req.body.pageID).then(doc => {
                                            res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                                        });
                                    })
                                })
                            }
                        })
                    }
                }
            }).catch(err => {
                res.status(500).send(err)
            })
        }
        return
    }

    if (req.header && req.header('data-categ') === 'searchQuestion') {
        let groupInfo = JSON.parse(req.body.searchCnt);
        let groupID =  groupInfo.groupID;
        group.findOne({member: {$in: [req.user]}, _id:  groupID}).then(doc => {
            if (doc) {
                groupquestion.find({$or: [{groupID}, {'share.reciever': groupID}], _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: groupInfo.search}})
                .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                    let updateResult = [];
                    if (result) {
                        for (let cnt of result) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateResult.push({...updateCnt,
                            share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                            shareInfo: cnt.groupID !== groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === groupID)[0] : null,
                            isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0});
                        }
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getOneAndDelete') {
        groupquestion.findOne({_id: req.body.pageID}).then(doc => {
            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.share.length < 1 &&
                (JSON.parse(JSON.stringify(doc.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([deleteMedia(doc.media), doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }

            if (doc && (JSON.parse(JSON.stringify(doc.authorID)) !== JSON.parse(JSON.stringify(req.user)))) {
                groupquestion.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This group question could not be deleted');
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }
});

module.exports = router
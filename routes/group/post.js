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
let sharecontent = require('../utility/sharecontent');
const {group, grouppost, post, advert, user, connectStatus} = require('../../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonegrouppost') {
        grouppost.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
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

    if (req.header !== null && req.header('data-categ') === 'getPost') {
        let groupID = req.body.searchCnt;
        group.findOne({'member.authorID': {$eq: req.user}, _id: groupID}).then(doc => {
            if (doc) {
                grouppost.find({groupID, _isCompleted: true, block: {$nin: [req.user]}})
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
                        advert.find().skip(req.body.start).limit(req.body.limit).then(doc => {
                            let lastItem = updateResult[updateResult.length - 1];
                            if (lastItem) {
                                lastItem.advert = doc
                                updateResult[updateResult.length - 1] = lastItem
                            }
                            res.status(200).send({page: updateResult, loadMore: result.length > 0});
                        })
                    } else if (showAdvert === 1) {
                        user.find({_id: {$in: req.request}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                            let updateFriend = [];
                            for (let cnt of doc) {
                                let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                                updateFriend.push({_id: cnt._id, username: cnt.username, userImage: cnt.image, status: isOnline})
                            }
                            let lastItem = updateResult[updateResult.length - 1];
                            if (lastItem) {
                                lastItem.friendRequest = updateFriend;
                                updateResult[updateResult.length - 1] = lastItem
                            }
                            res.status(200).send({page: updateResult, loadMore: result.length > 0 });
                        });
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
        grouppost.find({$or: [{authorID: { $in: [req.user, ...req.friend] }, _isCompleted: true, block: {$nin: [req.user]}}, {share: { $in: [req.user]}, _isCompleted: true, block: {$nin: [req.user]}}]})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0})
                }
            }
            let showAdvert = Math.round(Math.random());
            if (showAdvert === 0) {
                advert.find().skip(req.body.start).limit(req.body.limit).then(doc => {
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        lastItem.advert = doc
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                })
            } else if (showAdvert === 1) {
                user.find({_id: {$in: req.request}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                    let updateFriend = [];
                    for (let cnt of doc) {
                        let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                        updateFriend.push({_id: cnt._id, username: cnt.username, userImage: cnt.image, status: isOnline})
                    }
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        lastItem.friendRequest = updateFriend;
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                });
            } else {
                res.status(200).send({page: updateResult, loadMore: result.length > 0});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setFavorite') {
        grouppost.findById(req.body.pageID).then(grouppostDoc => {
            if (grouppostDoc) {
                group.findOne({'member.authorID': {$eq: req.user}, _id: grouppostDoc.groupID}).then(groupDoc => {
                    if (groupDoc) {
                        grouppost.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
                            if (doc) {
                                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
                            }
                            grouppost.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
                            })
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }
                })
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShare') {
        let reciepent = JSON.parse(req.body.reciepent);
        let shareInfo = JSON.parse(req.body.cnt);
        group.findOne({'member.authorID': {$eq: req.user}, _id: shareInfo.groupID}).then(groupDoc => {
            if (groupDoc) {
                grouppost.findOneAndUpdate({_id: req.body.pageID}, {$addToSet: {'share': reciepent}}).then(() => {
                    grouppost.findById(req.body.pageID).then(doc => {
                        if (doc) {
                            res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                            sharecontent(grouppost, post, req.body.pageID, reciepent, req.user, req.username, req.userImage, shareInfo.groupID, groupDoc.title).then(shareInfo => {
                                for (let cnt of shareInfo) {
                                    notifications('groupPostShare', cnt.userID, {userID: req.user, ID: cnt.pageID}, false);
                                }
                            });
                            return
                        }
                        return res.sendStatus(200);
                    })
                });
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
        grouppost.findOneAndUpdate({_id: req.body.pageID}, {$addToSet: {'share': reciepent}}).then(() => {
            grouppost.findById(req.body.pageID).then(doc => {
                for (let groupID of reciepent) {
                    group.findOne({_id: groupID, 'member.authorID': req.user}).then(groupDoc => {
                        if (groupDoc) {
                            ++checked;
                            checkGroup.push(doc._id);
                            if (checked === reciepent.length) {
                                sharecontent(grouppost, grouppost, req.body.pageID, reciepent, req.user, req.username, req.userImage,
                                    doc.shareInfo ? doc.shareInfo.pageID : null, doc.shareInfo ? doc.shareInfo.pageTitle : null).then(() => {
                                    res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                                })
                            }
                        }
                    });
                }
            });
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header && req.header('data-categ') === 'searchPost') {
        let groupInfo = JSON.parse(req.body.searchCnt);
        let groupID =  groupInfo.groupID;
        group.findOne({'member.authorID': {$eq: req.user}, _id:  groupID}).then(doc => {
            if (doc) {
                grouppost.find({groupID, _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: groupInfo.search}})
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
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getOneAndDelete') {
        grouppost.findOne({_id: req.body.pageID}).then(doc => {
            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.share.length < 1 && !doc.shareInfo.authorID && 
                (JSON.parse(JSON.stringify(doc.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([deleteMedia(doc.media), doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }

            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.shareInfo.authorID && 
                (JSON.parse(JSON.stringify(doc.shareInfo.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }

            if (doc && (JSON.parse(JSON.stringify(doc.authorID)) !== JSON.parse(JSON.stringify(req.user)))) {
                grouppost.findOneAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This group post could not be deleted');
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }
});

module.exports = router

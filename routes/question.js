let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');

let formidable = require('formidable');
let savetemp = require('./utility/savetemp');
let sequence = require('./utility/sequence');
let deleteMedia = require('./utility/deletemedia');
let authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let uploadToBucket = require('./utility/upload');
let notifications = require('./utility/notifications');
const {user, question, group, qchat, connectStatus} = require('../serverDB/serverDB');


router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonequestion') {
        question.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
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
        question.find({$or: [{groupID: null}, {'share.reciever': req.user}], _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    shareInfo: cnt.groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === req.user)[0] : null,
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
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getQuestionFavorite') {
        question.find({$or: [{groupID: null}, {'share.reciever': req.user}], favorite: {$in: [req.user]}, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    shareInfo: cnt.groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === req.user)[0] : null,
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
                    res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
                })
            } else {
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getByAuthor') {
        Promise.all([req.body.start === 0 ?  user.findById(req.body.searchCnt) : Promise.resolve()]).then(doc => {
            question.find({groupID: null, authorID: req.body.searchCnt, _isCompleted: true, block: {$nin: [req.user]}})
                .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                let updateResult = [];
                if (result) {
                    for (let cnt of result) {
                        let updateCnt = JSON.parse(JSON.stringify(cnt));
                        delete updateCnt.block;
                        updateResult.push({...updateCnt,
                        userImage: doc[0] ? doc[0].image : cnt.userImage, username: doc[0] ? doc[0].username : cnt.username,
                        share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                        shareInfo: cnt.groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === req.user)[0] : null,
                        isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0})
                    }
                }
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setFavorite') {
        question.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
            if (doc) {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
            }
            question.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShare') {
        let reciepent = JSON.parse(req.body.reciepent);
        question.findById(req.body.pageID).then(questionDoc => {
            if (questionDoc) {
                Promise.all([questionDoc.groupID ? group.findById(questionDoc.groupID) : Promise.resolve()]).then(groupDoc => {
                    let updateReciepent = reciepent.map(reciever => ({authorID: req.user, username: req.username, userImage: req.userImage,
                        cntID: req.body.pageID, pageID: groupDoc[0] ? groupDoc[0]._id : null, pageTitle: groupDoc[0] ? groupDoc[0].title: null, reciever}));
                    question.findOneAndUpdate({_id: req.body.pageID}, {$push: {'share': updateReciepent}}).then(() => {
                        question.findById(req.body.pageID).then(doc => {
                            if (doc) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                                for (let userID of reciepent) {
                                    notifications('questionShare', userID, {userID: req.user, ID: req.body.pageID}, false);
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
                        question.findById(req.body.pageID).then(questionDoc => {
                            if (questionDoc) {
                                Promise.all([questionDoc.groupID ? group.findById(questionDoc.groupID) : Promise.resolve()]).then(groupDoc => {
                                    let updateReciepent = reciepent.map(reciever => ({authorID: req.user, username: req.username, userImage: req.userImage,
                                        cntID: req.body.pageID, pageID: groupDoc[0] ? groupDoc[0]._id : null, pageTitle: groupDoc[0] ? groupDoc[0].title: null, reciever}));
                                        questionDoc.updateOne({$push: {'share': updateReciepent}}).then(() => {
                                        question.findById(req.body.pageID).then(doc => {
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

    if (req.header && (req.header('data-categ') === 'searchQuestion' || req.header('data-categ') === 'searchQuestionTab')) {
        question.find({$or: [{groupID: null}, {'share.reciever': req.user}], _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: req.body.searchCnt}})
        .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    shareInfo: cnt.groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === req.user)[0] : null,
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0});
                }
            }
            res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: req.header('data-categ') === 'searchQuestionTab'});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getOneAndDelete') {
        question.findOne({_id: req.body.pageID}).then(doc => {
            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.share.length < 1 && 
                (JSON.parse(JSON.stringify(doc.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([deleteMedia(doc.media), doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (doc && (JSON.parse(JSON.stringify(doc.authorID)) !== JSON.parse(JSON.stringify(req.user)))) {
                question.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This question could not be deleted');
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    // if (req.header !== null && req.header('data-categ') === 'question') {
    //     return fetchQue({mode: 'publish'});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
    //     return fetchQue({mode: 'publish', shareMe: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'myquestion') {
    //     return fetchQue({authorID: req.user});
    // }

    // function fetchQue(conditions, meta) {
    //     let condition = {_isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {queCreated: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         questions.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             questions.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
    //                 let cntArray = [];
    //                 let send = 0;
    //                 if (result.length < 1) {
    //                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                 }
    //                 for (let cnt of result) {
    //                     fetch(cnt.username, cnt.userImage, cnt, cntArray).then(cnt => {
    //                         cntArray = cnt;
    //                         ++send;
    //                         if (send === result.length) {
    //                             res.send({cnt: cntArray, cntTotal}).status(200)
    //                         }
    //                     })
    //                 }

    //                 function fetch(username, image, cnt, cntArray) {
    //                     return new Promise((resolve, reject) => {
    //                         let title = cnt.title;
    //                         cnt.title = String(title.substr(0, 1500000));
    //                         let isLiked = req.user ? cnt.liked.filter(userID => userID === req.user) : [];
    //                        let update ={};
    //                         if (isLiked.length > 0) {
    //                             update['liked'] = true
    //                         } else {
    //                             update['liked'] = false
    //                         }
    //                         update['username'] = username;
    //                         update['userImage'] = image;
    //                         update['userOpt'] = cnt.authorID === req.user;
    //                         update['authorID'] = cnt.authorID;
    //                         update['category'] = cnt.category;
    //                         update['helpFull'] = cnt.helpFull;
    //                         update['notHelpFull'] = cnt.notHelpFull;
    //                         update['comment'] = cnt.comment;
    //                         update['favorite'] = cnt.favorite;
    //                         update['image'] = cnt.image;
    //                         update['mode'] = cnt.mode;
    //                         update['queCreated'] = cnt.queCreated;
    //                         update['snapshot'] = cnt.snapshot;
    //                         update['title'] = cnt.title;
    //                         update['video'] = cnt.video;
    //                         update['_id'] = cnt._id;
    //                         cntArray.push({...update});
    //                         resolve(cntArray)
    //                     })
    //                 }
    //             }).catch(err => {
    //                 res.status(500).send(err);
    //             })
    //         }).catch(err => {
    //             res.status(500).send(err);
    //         }) 
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
    //         return fetchQue({$text: { $search: filter.searchCnt },mode: 'publish', ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
    //      }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //      return
    // }

    // if (req.header !== null && req.header('data-categ')) {  
    //     return fetchQue({category: req.header('data-categ'), mode: 'publish'});
    // }
});

module.exports = router
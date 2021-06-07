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
const {qchat, qcontent, group, qchat:groupcbt, question, connectStatus} = require('../../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonegroupcbt') {
        groupcbt.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            if (result && result.question) {
                qcontent.findById(result.question).then(qcontentDoc => {
                    let cnt = {...JSON.parse(JSON.stringify(result))}
                    cnt['cbt'] = qcontentDoc ? {question: qcontentDoc.question, totalOption: qcontentDoc.totalOption} : {};
                    delete cnt.block;
                    let updateResult = {...cnt,
                        share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                        isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                        request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length}
                    res.status(200).send(updateResult);
                });
            } else {
                res.status(200).send(result);
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getCBT') {
        let groupID = req.body.searchCnt;
        group.findOne({member: {$in: [req.user]}, _id: groupID}).then(doc => {
            if (doc) {
                groupcbt.find({$or: [{groupID}, {'share.reciever': groupID}], _isCompleted: true, block: {$nin: [req.user]}})
                    .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                    let updateResult = [];
                    if (result) {
                        for (let cnt of result) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateResult.push({...updateCnt,
                            share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                            isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                            takeExam: cnt.participant === 'Public' ? true :
                            cnt.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0] ? true : false,
                            isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                            shareInfo: cnt.groupID !== groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === groupID)[0] : null,
                            request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length})
                        }
                    }
                    let showQuestion = Math.round(Math.random());
                    if (showQuestion === 0) {
                        res.status(200).send({page: updateResult, loadMore: result.length > 0});
                        // question.find({_isCompleted: true, block: {$nin: [req.user]}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                        //     let lastItem = updateResult[updateResult.length - 1];
                        //     if (lastItem) {
                        //         let updateDoc =  []
                        //         for (let cnt of doc) {
                        //             let updateCnt = JSON.parse(JSON.stringify(cnt));
                        //             updateDoc.push({...updateCnt,
                        //                 share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                        //                 isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0})
                        //         }
                        //         lastItem.question = updateDoc
                        //         updateResult[updateResult.length - 1] = lastItem
                        //     }
                        //     res.status(200).send({page: updateResult, loadMore: result.length > 0});
                        // })
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
        groupcbt.find({authorID: { $in: [req.user, ...req.friend] }, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    takeExam: cnt.participant === 'Public' ? true :
                        cnt.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0] ? true : false,
                    isPending: cnt.request.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length})
                }
            }
            let question = Math.round(Math.random());
            if (question === 0) {
                question.find().skip(req.body.start).limit(req.body.limit).then(doc => {
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        let updateDoc =  []
                        for (let cnt of doc) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            updateDoc.push({...updateCnt,
                                share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                                isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0})
                        }
                        lastItem.question = updateDoc
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
        groupcbt.findById(req.body.pageID).then(groupcbtDoc => {
            if (groupcbtDoc) {
                // group.findOne({member: {$in: [req.user]}, _id: groupcbtDoc.groupID}).then(groupDoc => {
                //     if (groupDoc) {
                        groupcbt.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
                            if (doc) {
                                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
                            }
                            groupcbt.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
                            })
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                //     }
                // })
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShare') {
        let reciepent = JSON.parse(req.body.reciepent);
        groupcbt.findById(req.body.pageID).then(cbtDoc => {
            if (cbtDoc) {
                Promise.all([cbtDoc.groupID ? group.findById(cbtDoc.groupID) : Promise.resolve()]).then(groupDoc => {
                    let updateReciepent = reciepent.map(reciever => ({authorID: req.user, username: req.username, userImage: req.userImage,
                        cntID: req.body.pageID, pageID: groupDoc[0] ? groupDoc[0]._id : null, pageTitle: groupDoc[0] ? groupDoc[0].title: null, reciever}));
                    groupcbt.findOneAndUpdate({_id: req.body.pageID}, {$push: {'share': updateReciepent}}).then(() => {
                        groupcbt.findById(req.body.pageID).then(doc => {
                            if (doc) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                                for (let userID of reciepent) {
                                    notifications('groupCbtShare', userID, {userID: req.user, ID: req.body.pageID}, false);
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
                        groupcbt.findById(req.body.pageID).then(cbtDoc => {
                            if (cbtDoc) {
                                Promise.all([cbtDoc.groupID ? group.findById(cbtDoc.groupID) : Promise.resolve()]).then(groupDoc => {
                                    let updateReciepent = reciepent.map(reciever => ({authorID: req.user, username: req.username, userImage: req.userImage,
                                        cntID: req.body.pageID, pageID: groupDoc[0] ? groupDoc[0]._id : null, pageTitle: groupDoc[0] ? groupDoc[0].title: null, reciever}));
                                        cbtDoc.updateOne({$push: {'share': updateReciepent}}).then(() => {
                                        groupcbt.findById(req.body.pageID).then(doc => {
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

    if (req.header !== null && req.header('data-categ') === 'setRequest') {
        groupcbt.findOneAndUpdate({_id: req.body.pageID, 'request.authorID': {$ne: req.user}}, {$push: {'request': {authorID: req.user, username: req.username, userImage: req.userImage}}}).then(doc => {
            if (doc) {
                res.status(200).send({pageInfo: {_id: req.body.pageID, isPending: true}});
                notifications('groupCbtRequest', doc.authorID, {userID: req.user, ID: req.body.pageID}, false);
            } 
            return
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getRequest') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                groupcbt.aggregate([{
                    $match: {_id: objectID(req.body.pageID)}}, 
                    {$unwind: "$request"},
                    {$skip: req.body.start},
                    {$limit: req.body.limit},
                    {"$group": {"_id": "$_id", "request": {"$push": "$request"}}}]).then(result => {
                        return res.status(200).send({select: result[0] ? result[0].request : [], loadMore: (doc.request.length - (req.body.start + req.body.limit)) > 0 })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getAlloweduser') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                groupcbt.aggregate([{
                    $match: {_id: objectID(req.body.pageID)}}, 
                    {$unwind: "$allowedUser"},
                    {$skip: req.body.start},
                    {$limit: req.body.limit},
                    {"$group": {"_id": "$_id", "allowedUser": {"$push": "$allowedUser"}}}]).then(result => {
                        return res.status(200).send({select: result[0] ? result[0].allowedUser : [], loadMore: (doc.allowedUser.length - (req.body.start + req.body.limit)) > 0 })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'searchRequest') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let request = doc.request.filter(cnt =>  cnt.username.toLowerCase().indexOf(req.body.searchCnt.toLowerCase()) > -1);
                let updateRequest = request.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateRequest ? updateRequest : [], loadMore: (doc.request.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'searchAlloweduser') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let allowedUser = doc.allowedUser.filter(cnt =>  cnt.username.toLowerCase().indexOf(req.body.searchCnt.toLowerCase()) > -1);
                let updateAlloweduser = allowedUser.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateAlloweduser ? updateAlloweduser : [], loadMore: (doc.allowedUser.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setAllowuser') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let requestCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of requestCnt) {
                    let request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (request) {
                        let allowedUser = doc.allowedUser;
                        let isAllowed = allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === request.authorID)[0];
                        if (!isAllowed) {
                            allowedUser.push({authorID: request.authorID, username: request.username, userImage: request.userImage});
                        }
                        doc.request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({request: doc.request, allowedUser}).then(() => {
                            sequence([notifications('groupCbtReject', request.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupCbtAccept', request.authorID, {userID: req.user, ID: req.body.pageID}, false)
                            ])
                            ++reaction;
                            if (reaction === requestCnt.length) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, request: doc.request.length, allowedUser: allowedUser.length}});
                            }
                        }).catch(err => {
                            res.status(500).send(err);
                        })
                    }
                }
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getPendingmark') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                groupcbt.aggregate([{
                    $match: {_id: objectID(req.body.pageID)}}, 
                    {$unwind: "$mark"},
                    {$skip: req.body.start},
                    {$limit: req.body.limit},
                    {"$group": {"_id": "$_id", "mark": {"$push": "$mark"}}}]).then(result => {
                        return res.status(200).send({select: result[0] ?  result[0].mark : [], loadMore: (doc.request.length - (req.body.start + req.body.limit)) > 0 })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'searchPendingmark') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let mark = doc.mark.filter(cnt =>  cnt.username.toLowerCase().indexOf(req.body.searchCnt.toLowerCase()) > -1);
                let updateMark = mark.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateMark ? updateMark : [], loadMore: (doc.mark.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setRejectuser') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let requestCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of requestCnt) {
                    let request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (request) {
                        doc.request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({request: doc.request}).then(() => {
                            sequence([notifications('groupCbtAccept', request.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupCbtReject', request.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
                                ++reaction;
                                if (reaction === requestCnt.length) {
                                    res.status(200).send({pageInfo: {_id: req.body.pageID, request: doc.request.length}});
                                }
                        }).catch(err => {
                            res.status(500).send(err);
                        })
                    }
                }
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'removeAcceptuser') {
        groupcbt.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let allowedUserCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of allowedUserCnt) {
                    let allowedUser = doc.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (allowedUser) {
                        doc.allowedUser = doc.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({allowedUser: doc.allowedUser}).then(() => {
                            sequence([notifications('groupCbtAccept', allowedUser.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupCbtReject', allowedUser.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
                                ++reaction;
                                if (reaction === allowedUserCnt.length) {
                                    res.status(200).send({pageInfo: {_id: req.body.pageID, allowedUser: doc.allowedUser.length}});
                                }
                        }).catch(err => {
                            res.status(500).send(err);
                        })
                    }
                }
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'cancelRequest') {
        groupcbt.findOne({_id: req.body.pageID, 'request.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let request = doc.request;
                let updateRequest = request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({request: updateRequest}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPending: false}});
                    notifications('groupCbtRequest', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
                });
            } else {
                res.sendStatus(200);
            }
            return
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header && req.header('data-categ') === 'searchCBT') {
        let groupInfo = JSON.parse(req.body.searchCnt);
        let groupID =  groupInfo.groupID;
        group.findOne({member: {$in: [req.user]}, _id:  groupID}).then(doc => {
            if (doc) {
                groupcbt.find({$or: [{groupID}, {'share.reciever': groupID}], _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: groupInfo.search}})
                .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                    let updateResult = [];
                    if (result) {
                        for (let cnt of result) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateResult.push({...updateCnt,
                            share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                            isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                            takeExam: cnt.participant === 'Public' ? true :
                                cnt.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0] ? true : false,
                            isPending: cnt.request.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                            shareInfo: cnt.groupID !== groupID ? cnt.share.filter(shareCnt => shareCnt.reciever === groupID)[0] : null,
                            request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length})
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
        groupcbt.findOne({_id: req.body.pageID}).then(doc => {
            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.share.length < 1 && !doc.shareInfo && 
                (JSON.parse(JSON.stringify(doc.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([deleteMedia(doc.media), qcontent.deleteOne({_id: doc.question}), doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (doc) {
                groupcbt.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This group CBT could not be deleted');
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
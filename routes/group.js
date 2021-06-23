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
let search = require('./utility/search');
let notifications = require('./utility/notifications');
let sharecontent = require('./utility/sharecontent');
const {group, grouppost, qchat, question, groupfeed, qcontent, chatroom, advert, user, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonegroup') {
        group.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            if (result && result.question) {
                qcontent.findById(result.question).then(qcontentDoc => {
                    let cnt = {...JSON.parse(JSON.stringify(result))}
                    cnt['cbt'] = qcontentDoc ? {question: qcontentDoc.question, totalOption: qcontentDoc.totalOption} : {};
                    delete cnt.block;
                    let updateResult = {...cnt,
                        share: cnt.share.length, favorite: cnt.favorite.length,
                        isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                        request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length}
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

    if (req.header !== null && req.header('data-categ') === 'getGroup') {
        group.find({_isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length,
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isMember: cnt.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                    isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPublic: cnt.roomType === 'Public', chat: {user: cnt.member.slice(0, 4)},
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
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

    if (req.header !== null && req.header('data-categ') === 'getGroupFavorite') {
        group.find({_isCompleted: true, block: {$nin: [req.user]}, favorite: {$in: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length,
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isMember: cnt.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                    isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPublic: cnt.roomType === 'Public', chat: {user: cnt.member.slice(0, 4)},
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
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
                    res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
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
                    res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
                });
            } else {
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getByAuthor') {
        Promise.all([user.findById(req.body.searchCnt)]).then(doc => {
            group.find({_isCompleted: true, block: {$nin: [req.user]}, authorID: req.body.searchCnt})
                .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
                let updateResult = [];
                if (result) {
                    for (let cnt of result) {
                        let updateCnt = JSON.parse(JSON.stringify(cnt));
                        delete updateCnt.block;
                        updateResult.push({...updateCnt,
                        share: cnt.share.length, favorite: cnt.favorite.length, 
                        userImage: doc[0] ? doc[0].image : cnt.userImage, username: doc[0] ? doc[0].username : cnt.username,
                        isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                        isMember: cnt.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                        isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                        isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                        isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                        isPublic: cnt.roomType === 'Public', chat: {user: cnt.member.slice(0, 4)},
                        request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
                    }
                }
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'hashSearch') {
        group.find({_isCompleted: true, block: {$nin: [req.user]}, hashTag: {$in: [req.body.searchCnt]}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length,
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isMember: cnt.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                    isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPublic: cnt.roomType === 'Public', chat: {user: cnt.member.slice(0, 4)},
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
                }
            }
            res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getMembergroup') {
        group.find({'member.authorID': {$eq: req.user}, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length,
                    image: cnt.media.filter(media => media.bucket == 'image')[0] ?  cnt.media.filter(media => media.bucket == 'image')[0].id : '',
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length, chat: {user: cnt.member.slice(0, 4)}})
                }
            }
            res.status(200).send({select: updateResult, loadMore: result.length > 0});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'searchMemberGroup') {
        group.find({'member.authorID': {$eq: req.user}, _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: req.body.searchCnt}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length,
                    image: cnt.media.filter(media => media.bucket == 'image')[0] ?  cnt.media.filter(media => media.bucket == 'image')[0].id : '',
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length, chat: {user: cnt.member.slice(0, 4)}})
                }
            }
            res.status(200).send({select: updateResult, loadMore: result.length > 0});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setFavorite') {
        group.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
            if (doc) {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
            }
            group.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShare') {
        let reciepent = JSON.parse(req.body.reciepent);
        // group.findOneAndUpdate({'member.authorID': {$eq: req.user}, _id: req.body.pageID}, {$addToSet: {'share': reciepent}}).then(() => {
        //     group.findById(req.body.pageID).then(doc => {
        //         if (doc) {
        //             res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
        //             sharecontent(group, group, req.body.pageID, reciepent, req.user, req.username, req.userImage, req.body.pageID, doc.title).then(() => {
        //                 for (let userID of reciepent) {
        //                     notifications('groupShare', userID, {userID: req.user, ID: req.body.pageID}, false);
        //                 }
        //             });
        //             return
        //         }
        //         return res.sendStatus(200);
        //     });
        // }).catch(err => {
        //     res.status(500).send(err)
        // })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setJoin') {
        group.findOneAndUpdate({_id: req.body.pageID, 'member.authorID': {$ne: req.user}, roomType: {$eq: 'Public'}}, {$push: {'member': {authorID: req.user, username: req.username, userImage: req.userImage}}}).then(doc => {
            if (doc) {
                doc.member.push({authorID: req.user, username: req.username, userImage: req.userImage});
                res.status(200).send({pageInfo: {_id: req.body.pageID, isMember: true, member: doc.member.length, chat: {user: doc.member.slice(0, 4)}}});
                return notifications('groupJoin', doc.authorID, {userID: req.user, ID: req.body.pageID}, false);
            }
            return res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setRequest') {
        group.findOneAndUpdate({_id: req.body.pageID, 'request.authorID': {$ne: req.user}}, {$push: {'request': {authorID: req.user, username: req.username, userImage: req.userImage}}}).then(doc => {
            if (doc) {
                res.status(200).send({pageInfo: {_id: req.body.pageID, isPending: true}});
                return notifications('groupRequest', doc.authorID, {userID: req.user, ID: req.body.pageID}, false);
            }
            return res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'cancelRequest') {
        group.findOne({_id: req.body.pageID, 'request.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let request = doc.request;
                let updateRequest = request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({request: updateRequest}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPending: false}});
                    notifications('groupRequest', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
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

    if (req.header !== null && req.header('data-categ') === 'getPendingapprove') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                group.aggregate([{
                    $match: {_id: objectID(req.body.pageID)}}, 
                    {$unwind: "$pendingApprove"},
                    {$skip: req.body.start},
                    {$limit: req.body.limit},
                    {"$group": {"_id": "$_id", "pendingApprove": {"$push": "$pendingApprove"}}}]).then(result => {
                        return res.status(200).send({select: result[0] ? result[0].pendingApprove : [], loadMore: (doc.pendingApprove.length - (req.body.start + req.body.limit)) > 0 })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'searchPendingapprove') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApprove = search(doc.pendingApprove, 'username', req.body.searchCnt);
                let updateApprove = pendingApprove.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateApprove ? updateApprove : [], loadMore: (doc.pendingApprove.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setPendingacceptuser') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApproveCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of pendingApproveCnt) {
                    let pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (pendingApprove) {
                        let member = doc.member;
                        let isAllowed = member.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === pendingApprove.authorID)[0];
                        if (!isAllowed) {
                            member.push(pendingApprove);
                        }
                        doc.pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({pendingApprove: doc.pendingApprove, member}).then(() => {
                            sequence([notifications('groupPending', req.user, {userID: pendingApprove.authorID, ID: req.body.pageID}, true),
                                notifications('groupReject', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupAccept', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, false)
                            ])
                            ++reaction;
                            if (reaction === pendingApproveCnt.length) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, pendingApprove: doc.pendingApprove.length, member: member.length, passed: true, chat: {user: member.slice(0, 4)}}});
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

    if (req.header !== null && req.header('data-categ') === 'setPendingrejectuser') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApproveCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of pendingApproveCnt) {
                    let pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (pendingApprove) {
                        doc.pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({pendingApprove: doc.pendingApprove}).then(() => {
                            sequence([notifications('groupPending', req.user, {userID: pendingApprove.authorID, ID: req.body.pageID}, true),
                                notifications('groupAccept', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupReject', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
                                ++reaction;
                                if (reaction === pendingApproveCnt.length) {
                                    res.status(200).send({pageInfo: {_id: req.body.pageID, pendingApprove: doc.pendingApprove.length}});
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

    if (req.header !== null && req.header('data-categ') === 'getRequest') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                group.aggregate([{
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

    if (req.header !== null && req.header('data-categ') === 'searchRequest') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let request = search(doc.request, 'username', req.body.searchCnt);
                let updateRequest = request.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateRequest ? updateRequest : [], loadMore: (doc.request.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setAcceptuser') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let requestCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of requestCnt) {
                    let request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (request) {
                        let member = doc.member;
                        let isAllowed = member.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === request.authorID)[0];
                        if (!isAllowed) {
                            member.push(request);
                        }
                        doc.request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({request: doc.request, member}).then(() => {
                            sequence([notifications('groupRequest', req.user, {userID: request.authorID, ID: req.body.pageID}, true),
                                notifications('groupReject', request.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupAccept', request.authorID, {userID: req.user, ID: req.body.pageID}, false)
                            ])
                            ++reaction;
                            if (reaction === requestCnt.length) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, request: doc.request.length, member: member.length, chat: {user: member.slice(0, 4)}}});
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

    if (req.header !== null && req.header('data-categ') === 'setRejectuser') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let requestCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of requestCnt) {
                    let request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (request) {
                        doc.request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({request: doc.request}).then(() => {
                            sequence([notifications('groupRequest', req.user, {userID: request.authorID, ID: req.body.pageID}, true),
                                notifications('groupAccept', request.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupReject', request.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
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

    if (req.header !== null && req.header('data-categ') === 'setRemoveuser') {
        let removeCnt = JSON.parse(req.body.cnt);
        group.findOne({_id: req.body.pageID, authorID: req.user, 'member._id': {$in: removeCnt}}).then(doc => {
            if (doc) {
                for (let cnt of removeCnt) {
                    let member = doc.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem._id)) !== cnt._id);
                    doc.updateOne({member}).then(() => {
                        res.status(200).send({pageInfo: {_id: req.body.pageID, member: member.length, chat: {user: member.slice(0, 4)}}});
                        sequence([notifications('groupAccept', cnt.authorID, {userID: req.user, ID: req.body.pageID}, true),
                        notifications('groupUserRemove', cnt.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
                    })
                }
            }
        }).catch(err => {
            res.status(500).send(err);
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getPendingmark') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                group.aggregate([{
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
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let mark = search(doc.mark, 'username', req.body.searchCnt);
                let updateMark = mark.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateMark ? updateMark : [], loadMore: (doc.mark.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'cancelApprove') {
        group.findOne({_id: req.body.pageID, 'pendingApprove.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let pendingApprove = doc.pendingApprove;
                let updatePending = pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({pendingApprove: updatePending}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPendingApprove: false}});
                    notifications('groupPending', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
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

    if (req.header !== null && req.header('data-categ') === 'cancelMark') {
        group.findOne({_id: req.body.pageID, 'mark.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let mark = doc.mark;
                let updateMark = mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({mark: updateMark}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPendingMark: false}});
                    notifications('groupMark', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
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

    if (req.header !== null && req.header('data-categ') === 'getGroupDet') {
        group.findOne({_id: req.body.searchCnt,_isCompleted: true, block: {$nin: [req.user]}}).then(result => {
            let updateResult = [];
            if (result) {
                let updateCnt = JSON.parse(JSON.stringify(result));
                delete updateCnt.block;
                updateResult.push({...updateCnt,
                share:result.share.length, favorite:result.favorite.length,
                isFavored:result.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                isMember:result.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                isPending:result.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                isPendingApprove:result.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                isPendingMark:result.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                isPublic:result.roomType === 'Public', chat: {user:result.member.slice(0, 4)},
                request:result.request.length, mark:result.mark.length, pendingApprove:result.pendingApprove.length, member:result.member.length, groupInfo: true})
                res.status(200).send({page: updateResult, loadMore: false});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getGroupinfo') {
        group.findOne({_id: req.body.pageID,_isCompleted: true, block: {$nin: [req.user]}}).then(result => {
            let member = 0;
            let updateResult = [];
            if (result) {
                let members = result.member.slice(req.body.start, (req.body.limit + req.body.start));
                for (let cnt of members) {
                    user.findById(cnt.authorID).then(doc => {
                        if (doc) {
                            ++member;
                            updateResult.push({_id: cnt, authorID: doc._id, username: doc.username, userImage: doc.image, 
                                isAdmin: JSON.parse(JSON.stringify(cnt.authorID)) === result.authorID, status: (new Date().getTime() - new Date(doc.visited).getTime()) < 60000});
                            if (member === members.length) {
                                res.status(200).send({select: updateResult, loadMore:  result.member.length > (req.body.limit + req.body.start)});
                            }
                        }
                    })
                }
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }


    if (req.header && (req.header('data-categ') === 'searchGroup' || req.header('data-categ') === 'searchGroupTab')) {
        group.find({_isCompleted: true, block: {$nin: [req.user]}, $text: {$search: req.body.searchCnt} })
        .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    share: cnt.share.length, favorite: cnt.favorite.length,
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isMember: cnt.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                    isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                    isPublic: cnt.roomType === 'Public', chat: {user: cnt.member.slice(0, 4)},
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
                }
            }
            res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: req.header('data-categ') === 'searchGroupTab'});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getOneAndDelete') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc && doc.favorite.length < 1) {
                sequence([groupfeed.findOne({groupID: req.body.pageID}), question.findOne({groupID: req.body.pageID}),
                    grouppost.findOne({groupID: req.body.pageID}), chatroom.findOne({groupID: req.body.pageID}),
                    qchat.findOne({groupID: req.body.pageID})]).then(result => {
                    let checkDelete = 0;
                    for (let cnt of result) {
                        if (!cnt) {
                            ++checkDelete;
                            if  (checkDelete === result.length) {
                                return sequence([deleteMedia(doc.media), doc.question ? qcontent.findByIdAndDelete(doc.question) : Promise.resolve(),
                                    doc.deleteOne()]).then(() => {
                                    return res.sendStatus(200);
                                })
                            }
                        } else {
                            return res.status(500).send('This group could not be deleted');
                        }
                    }
                })
            }
            if (!doc) {
                group.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    // if (req.header !== null && req.header('data-categ') === 'group') {
    //     return fetchGroup({});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
    //     return fetchGroup({shareMe: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'mygroup') {
    //     return fetchGroup({authorID: req.user});
    // }
    

    // if (req.header !== null && req.header('data-categ') === 'onlygroup') {
    //     group.find({_isCompleted: true, 
    //         $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
    //             let cntArray = [];
    //             for (let cnt of grp) {
    //                 cntArray.push({id: cnt._id, title: cnt.title, image: cnt.image})
    //             }
    //             res.status(200).send(cntArray)
    //         })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'requestTotal') {
    //     return group.find({authorID: req.user}).then(result => {
    //         let requestTotal = 0;
    //         for (let det of result) {
    //             requestTotal = det.request.length + requestTotal;
    //         }
    //         res.status(200).send(String(requestTotal));
    //     })
        
    // }

    // if (req.header !== null && req.header('data-categ') === 'request') {
    //     return fetchGroup({authorID: req.user, 'request.0': {$exists: true}})
    // }

    // if (req.header !== null && req.header('data-categ') === 'joined') {
    //     return fetchGroup({member: {$in: req.user}});
    // }

    // if (req.header !== null && req.header('data-categ') === 'join') {
    //     if (!req.authType) {
    //         let id = req.body.id;
    //         group.findByIdAndUpdate(id, {$addToSet: { request: req.user }}).then(grp => {
    //             grpnotifies.findOne({userID: grp.authorID}).then(result => {
    //                 let grpsNotify = [];
    //                 let request = 0;
    //                 if (result) {
    //                     let grpNotify = result.group.filter(grpDet => grpDet.ID === id)
    //                     if (grpNotify.length > 0) {
    //                         grpNotify[0].edit = false;
    //                         grpNotify[0].view = false;
    //                         grpNotify[0].isMember = true;
    //                         grpNotify[0].request = ++grpNotify[0].request;
    //                         grpsNotify = result.group.filter(grpDet => grpDet.ID !== id)
    //                         grpsNotify.push(grpNotify[0]);
    //                         request = grpNotify[0].request;
    //                     } else {
    //                         request = 1;
    //                         grpsNotify.push(...result.group, {ID: id, view: false, request: 1, isMember: true})
    //                     }
    //                     grpnotifies.findOneAndUpdate({userID: grp.authorID}, {group: grpsNotify }).then(() =>{
    //                         pushNotify(grp.authorID,`You have ${request} scholars request`, 
    //                         `From ${grp.title} Group`, `/group/request`).then(() => {
    //                             res.sendStatus(200)
    //                         })
    //                     }).catch(err =>{
    //                         res.status(500).send(err)
    //                     })
    //                 }else {
    //                     let newNotify = new grpnotifies({
    //                         userID: grp.authorID,
    //                         notifications: 1,
    //                         group:  [{ID: id, view: false, request: 1, isMember: true}] 
    //                     });
    //                     newNotify.save().then(() => {
    //                         pushNotify(grp.authorID,`You have 1 scholar's request`, 
    //                         `From ${grp.title} Group`, `/group/request`).then(() => {
    //                             res.sendStatus(200)
    //                         })
    //                     }).catch(err =>{
    //                         res.status(500).send(err)
    //                     })
    //                 }
    //             })
    //         })
    //     } else {
    //         res.cookie('redirect', '/group');
    //         res.redirect('/login')
    //     }
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'reject') {
    //     let id = req.body.id;
    //     let reqUser = req.body.user;
    //     group.findByIdAndUpdate(id, { $pull: {request: reqUser }}).then(grp =>{
    //        res.sendStatus(200)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'cancel') {
    //     group.findByIdAndUpdate(req.body.id, { $pull: {request: req.user }}).then(grp =>{
    //        res.sendStatus(200)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'grpreq') {
    //     let request = [];
    //     let requestTotal = 0;
    //     let id = req.body.id;
    //     return group.findById(id).then(grp => {  
    //         if (!grp) {
    //             return res.sendStatus(404);
    //         }   

    //         if (grp && grp.request.length < 1 ) {
    //             return res.status(200).send(request)
    //         }

    //         for (let id of grp.request) {
    //             user.findById(id).then(userDet =>{
    //                 if (!userDet) {
    //                     authUser.findById(id).then(authDet => {
    //                         if (authDet) {
    //                             grpInfo(authDet, request).then(info => {
    //                                 ++requestTotal;
    //                                 request = info;
    //                                 if (requestTotal === grp.request.length) {
    //                                     res.status(200).send(request)
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 } else {
    //                     grpInfo(userDet, request).then(info => {
    //                         ++requestTotal;
    //                         request = info;
    //                         if (requestTotal === grp.request.length) {
    //                             res.status(200).send(request)
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //         function grpInfo(userDet, request) {
    //             return new Promise((resolve, reject) =>{
    //                 request.push({
    //                     _id: userDet._id,
    //                     username: userDet.username, 
    //                     image: userDet.image,
    //                     studenttotal: userDet.student.length + userDet.teacher.length,
    //                     status: userDet.status
    //                 })
    //                 resolve(request)
    //             })
    //         }
    //     })
    // }
    
    // if (req.header !== null && req.header('data-categ') === 'grpinfo') {
    //     let id = req.body.id;
    //     let status = req.body.status === 'online';
    //     return group.findById(id).then(result =>{
    //         if (result) {
    //             grpDet(result, status).then(info => {
    //                 res.status(200).send(info);
    //             })

    //             function grpDet(grp, status) {
    //                 return new Promise((resolve, reject) => {
    //                     let member = [];
    //                     let memberTotal = 0;

    //                     if (grp.member.length < 1 ) {
    //                         return resolve(member)
    //                     }

    //                     for (let id of grp.member) {
    //                         grpInfo(id, status, member).then(info => {
    //                             member = info;
    //                             ++memberTotal;
    //                             if (memberTotal === grp.member.length)  {
    //                                  return resolve(member)
    //                             }
    //                         })
    //                     }
    //                 })
    //             }

    //             function grpInfo(id, status, member) {
    //                 return new Promise((resolve, reject) => {
    //                     user.findById(id).then(det => {
    //                         if (!det) {
    //                             authUser.findById(id).then(authDet => {
    //                                 if (authDet && (authDet.status === status)) {
    //                                     member.push({
    //                                         _id: authDet._id,
    //                                         username: authDet.username, 
    //                                         image: authDet.image,
    //                                         studenttotal: authDet.student.length + authDet.teacher.length,
    //                                         status: authDet.status
    //                                     })
    //                                 }
    //                                 resolve(member)
    //                             })
    //                         } else {
    //                             if (det && (det.status === status)) {
    //                                 member.push({
    //                                     _id: det._id,
    //                                     username: det.username, 
    //                                     image: det.image,
    //                                     studenttotal: det.student.length + det.teacher.length,
    //                                     status: det.status
    //                                 })
    //                             }
    //                             resolve(member)
    //                         }
    //                     })
    //                 })
    //             }
    //         } else {
    //             res.sendStatus(404);
    //         }
    //     })
    // }

    // if (req.header !== null && req.header('data-categ') === 'accept') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     let rawID = req.body.id;
    //     let reqUser = req.body.user;
    //     group.findOneAndUpdate({authorID: req.user, _id: id}, { $addToSet: {member: reqUser }, 
    //         $pull: {request: reqUser }, $inc: {'memberTotal': 1}}).then(grp =>{
    //         grpnotifies.findOne({userID: reqUser}).then(result => {
    //             let grpsNotify = [];
    //             if (result) {
    //                 let grpNotify = result.group.filter(grpDet => grpDet.ID === rawID)
    //                 if (grpNotify.length > 0) {
    //                     grpNotify[0].edit = false;
    //                     grpNotify[0].view = false;
    //                     grpNotify[0].isMember = true;
    //                     grpsNotify = result.group.filter(grpDet => grpDet.ID !== rawID)
    //                     grpsNotify.push(grpNotify[0]);
    //                     request = grpNotify[0].request;
    //                 } else {
    //                     grpsNotify.push(...result.group, {ID: rawID, view: false, isMember: true})
    //                 }
    //                 grpnotifies.findOneAndUpdate({userID: reqUser}, {group: grpsNotify }).then(() =>{
    //                     pushNotify(reqUser,`Welcome to ${grp.title} group`, 
    //                         `From Group Admin`, `/chat/group/${grp._id}`).then(() => {
    //                         res.sendStatus(200)
    //                     })
    //                 }).catch(err =>{
    //                     res.status(500).send(err)
    //                 })
    //             }else {
    //                 let newNotify = new grpnotifies({
    //                     userID: reqUser,
    //                     notifications: 1,
    //                     group:  [{ID: rawID, view: false, isMember: true}] 
    //                 });
    //                 newNotify.save().then(() => {
    //                     pushNotify(reqUser,`Welcome to ${grp.title} group`, 
    //                         `From Group Admin`, `/chat/group/${grp._id}`).then(() => {
    //                         res.sendStatus(200)
    //                     })
    //                 }).catch(err =>{
    //                     res.status(500).send(err)
    //                 })
    //             }
    //         })
    //     })
    //     return
    // }
    
    // if (req.header !== null && req.header('data-categ') === 'exitgroup') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     group.findOne({_id: id}).then(fnd => {
    //         if(fnd) {
    //             let member = fnd.member.filter(userID => userID !== req.user);
    //             group.findOneAndUpdate({_id: id}, {member}).then(()=> {
    //                 res.sendStatus(200)
    //             })
    //         } else {
    //             res.sendStatus(404)
    //         }
    //     }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'deletegroup') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     group.findOneAndDelete({_id: id, authorID: req.user}).then(fnd => {
    //         if(fnd) {
    //             if (fnd.image.length > 0) {
    //                 deleteMedia([{id: fnd.image[0].id.toHexString() }], 'image').then(() => {
    //                     res.sendStatus(200)
    //                 })
    //                 return
    //             }
    //             res.sendStatus(200)
    //         } else {
    //             res.sendStatus(401)
    //         }
    //     }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'remove') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     let rawID = req.body.id;
    //     let userID = req.body.user;
    //     group.findOneAndUpdate({authorID: req.user, _id: id}, { 
    //         $pull: {member: userID },
    //         $inc: {'memberTotal': -1}}).then(grp =>{
    //         grpnotifies.findOne({userID}).then(result => {
    //             let grpsNotify = [];
    //             if (result) {
    //                 let grpNotify = result.group.filter(grpDet => grpDet.ID === rawID)
    //                 if (grpNotify.length > 0 &&  grpNotify[0].isMember) {
    //                     grpNotify[0].edit = false;
    //                     grpNotify[0].view = false;
    //                     grpNotify[0].isMember = false;
    //                     grpsNotify = result.group.filter(grpDet => grpDet.ID !== rawID)
    //                     grpsNotify.push(grpNotify[0]);
    //                     grpnotifies.findOneAndUpdate({userID}, {group: grpsNotify }).then(() =>{
    //                         res.sendStatus(200)
    //                     }).catch(err =>{
    //                         res.status(500).send(err)
    //                     })
    //                     return
    //                 } 
    //             }
    //             res.sendStatus(200)
    //         })
    //     })
    //     return
    // }

    // function pushNotify(userID, title, content, url) {
    //     return new Promise((resolve, reject) => {
    //         user.findById(userID).then(userFnd => {
    //             if (userFnd) {
    //                 return sendNotify(userFnd)
    //             } else {
    //                 authUser.findById(userID).then(authFnd => {
    //                     if (authFnd) {
    //                       return  sendNotify(authFnd);
    //                     }
    //                     return resolve()
    //                 })
    //             }
    //         })
            
    //         function sendNotify(result) {
    //             if (result && result.enableNotification) {
    //                 var pushConfig = {
    //                     endpoint: result.subscription[0].endpoint,
    //                     keys: {
    //                       auth: result.subscription[0].keys.auth,
    //                       p256dh: result.subscription[0].keys.p256dh
    //                     }
    //                   };
    //                   var pushOptions = {
    //                     vapidDetails: {
    //                         subject: "https://www.slodge24.com",
    //                         privateKey: result.pushMsg[0].privatekey,
    //                         publicKey: result.pushMsg[0].publickey
    //                     },
    //                     headers: {}
    //                 };
    //                 let isImage = content.image && content.image.length > 0 ? {image:  content.image[0]} : {}; 
    //                   webpush.sendNotification(pushConfig, JSON.stringify({
    //                     title,
    //                     content,
    //                     openUrl: url
    //                   }), pushOptions).then(() => {
    //                     resolve()
    //                   })
    //                 .catch((err) => {
    //                     resolve()
    //                 })
    //             } else {
    //                 resolve()
    //             }
    //         }
    //     })
    // }

    // function fetchGroup(conditions, meta) {
    //     let condition = { _isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {groupCreated: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         group.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             group.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
    //                 let cntArray= [];
    //                 let send = 0;
    //                 if (result.length < 1) {
    //                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                 }
    //                 for (let cnt of result) {
    //                     user.findById(cnt.authorID).then(userFnd => {
    //                         if (!userFnd) {
    //                             res.sendStatus(200)
    //                         } else {
    //                             let userFriend = userFnd.friend.length
    //                             fetch(userFnd.username, userFriend, userFnd.image, userFnd.status, cnt, cntArray).then(cnt => {
    //                                 cntArray = cnt;
    //                                 ++send 
    //                                 if (send === result.length) {
    //                                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                                 }
    //                             })
    //                         }
    //                     })   
    //                 }
                    
    //                 function fetch(username, friendtotal, image, status , cnt, cntArray) {
    //                     return new Promise((resolve, reject) => {
    //                         let update = {};
    //                         let isMember = req.user ? cnt.member.filter(userID => userID === req.user) : [];
    //                         if (isMember.length > 0 || cnt.groupMode === 'general') {
    //                             update['member'] = true
    //                         } else {
    //                             update['member'] = false
    //                         }
    //                         let isRequest = req.user ? cnt.request.filter(userID => userID === req.user) : [];
    //                         if (isRequest.length > 0) {
    //                             update['request'] = true
    //                         } else {
    //                             update['request'] = false
    //                         }
    //                         update['username'] = username;
    //                         update['friendtotal'] = friendtotal;
    //                         update['userImage'] = image;
    //                         update['status'] = status;
    //                         update['userOpt'] = cnt.authorID === req.user;
    //                         update['authorID'] = cnt.authorID;
    //                         update['category'] = cnt.category;
    //                         update['desc'] = cnt.desc;
    //                         update['image'] = cnt.image;
    //                         update['members'] = cnt.member.length + 1;
    //                         update['groupCreated'] = cnt.groupCreated;
    //                         update['title'] = cnt.title;
    //                         update['requestTotal'] = cnt.request.length;
    //                         update['online'] = cnt.online.length,
    //                         update['groupMode'] = cnt.groupMode ? cnt.groupMode : 'private'
    //                         update['_id'] = cnt._id;
    //                         update['id'] = cnt._id;
    //                         cntArray.push({...update});
    //                         resolve(cntArray)
    //                     })
    //                 }
    //             })
    //         }) 
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })
    // }

    // if (req.header !== null && req.header('data-categ') === 'groupCateg') {
    //     category.findOne({}).then(result => {
    //         let checkRes =  result ? result.group : []
    //         res.send(checkRes).status(200);
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     });
    //     return;
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
    //         return fetchGroup({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
    //      });
    //      return
    // }

    // if(req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('postSearch')) {
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //        let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
    //        group.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, _isCompleted: true}).then(result => {
    //             let resultCount = new String(result.length);
    //             res.send(resultCount).status(200);
    //         }).catch(err => {
    //             res.status(500).send(err);
    //         })
    //     })
    //     return ;
    // }
    
    // if (req.header !== null && req.header('data-categ')) {  
    //     return fetchGroup({category: req.header('data-categ')});
    // }
});

module.exports = router

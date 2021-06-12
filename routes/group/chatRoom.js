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
let search = require('../utility/search');
let notifications = require('../utility/notifications');
const {chatroom, advert, group, user, qcontent, connectStatus} = require('../../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonechatroom') {
        chatroom.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            if (result && result.question) {
                qcontent.findById(result.question).then(qcontentDoc => {
                    let cnt = {...JSON.parse(JSON.stringify(result))}
                    cnt['cbt'] = qcontentDoc ? {question: qcontentDoc.question, totalOption: qcontentDoc.totalOption} : {};
                    delete cnt.block;
                    let updateResult = {...cnt, favorite: cnt.favorite.length,
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

    if (req.header !== null && req.header('data-categ') === 'getChatroom') {
        let groupID = req.body.searchCnt;
        group.findOne({'member.authorID': {$eq: req.user}, _id: groupID}).then(doc => {
            if (doc) {
                chatroom.find({groupID, _isCompleted: true, block: {$nin: [req.user]}})
                    .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
                    let updateResult = [];
                    if (result) {
                        for (let cnt of result) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateResult.push({...updateCnt, favorite: cnt.favorite.length,
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
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getMemberchatroom') {
        chatroom.find({'member.authorID': {$eq: req.user}, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt, favorite: cnt.favorite.length,
                    image: cnt.media.filter(media => media.bucket == 'image')[0] ?  cnt.media.filter(media => media.bucket == 'image')[0].id : '',
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
                }
            }
            res.status(200).send({select: updateResult, loadMore: result.length > 0});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'searchMemberChatroom') {
        chatroom.find({'member.authorID': {$eq: req.user}, _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: req.body.searchCnt}})
            .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt, favorite: cnt.favorite.length,
                    image: cnt.media.filter(media => media.bucket == 'image')[0] ?  cnt.media.filter(media => media.bucket == 'image')[0].id : '',
                    request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
                }
            }
            res.status(200).send({select: updateResult, loadMore: result.length > 0});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getChatroominfo') {
        chatroom.findOne({_id: req.body.pageID,_isCompleted: true, block: {$nin: [req.user]}}).then(result => {
            let member = 0;
            let updateResult = [];
            if (result) {
                let members = result.member.slice(req.body.start, (req.body.limit + req.body.start));
                for (let cnt of members) {
                    user.findById(cnt.authorID).then(doc => {
                        if (doc) {
                            ++member;
                            updateResult.push({authorID: doc._id, username: doc.username, userImage: doc.image, 
                                isAdmin: doc.authorID === cnt.authorID, status: (new Date().getTime() - new Date(doc.visited).getTime()) < 60000});
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

    if (req.header !== null && req.header('data-categ') === 'setFavorite') {
        chatroom.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
            if (doc) {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
            }
            chatroom.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setJoin') {
        chatroom.findOneAndUpdate({_id: req.body.pageID, 'member.authorID': {$ne: req.user}, roomType: {$eq: 'Public'}}, {$push: {'member': {authorID: req.user, username: req.username, userImage: req.userImage}}}).then(doc => {
            if (doc) {
                doc.member.push({authorID: req.user, username: req.username, userImage: req.userImage});
                res.status(200).send({pageInfo: {_id: req.body.pageID, isMember: true, member: doc.member.length, chat: {user: doc.member.slice(0, 4)}}});
                return notifications('chatRoomJoin', doc.authorID, {userID: req.user, ID: req.body.pageID}, false);
            }
            return res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setRequest') {
        chatroom.findOneAndUpdate({_id: req.body.pageID, 'request.authorID': {$ne: req.user}}, {$push: {'request': {authorID: req.user, username: req.username, userImage: req.userImage}}}).then(doc => {
            if (doc) {
                res.status(200).send({pageInfo: {_id: req.body.pageID, isPending: true}});
                return notifications('chatRoomRequest', doc.authorID, {userID: req.user, ID: req.body.pageID}, false);
            }
            return res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'cancelRequest') {
        chatroom.findOne({_id: req.body.pageID, 'request.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let request = doc.request;
                let updateRequest = request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({request: updateRequest}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPending: false}});
                    notifications('chatRoomRequest', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                chatroom.aggregate([{
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApprove = search(doc.pendingApprove, 'username', req.body.searchCnt);
                let updateApprove = pendingApprove.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateApprove ? updateApprove : [], loadMore: (doc.pendingApprove.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setPendingacceptuser') {
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
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
                            sequence([notifications('chatRoomPending', req.user, {userID: pendingApprove.authorID, ID: req.body.pageID}, true),
                                notifications('chatRoomReject', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('chatRoomAccept', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, false)
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApproveCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of pendingApproveCnt) {
                    let pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (pendingApprove) {
                        doc.pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({pendingApprove: doc.pendingApprove}).then(() => {
                            sequence([notifications('chatRoomPending', req.user, {userID: pendingApprove.authorID, ID: req.body.pageID}, true),
                                notifications('chatRoomAccept', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('chatRoomReject', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                chatroom.aggregate([{
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let request = search(doc.request, 'username', req.body.searchCnt);
                let updateRequest = request.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateRequest ? updateRequest : [], loadMore: (doc.request.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setAcceptuser') {
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
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
                            sequence([notifications('chatRoomRequest', req.user, {userID: request.authorID, ID: req.body.pageID}, true),
                                notifications('chatRoomReject', request.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('chatRoomAccept', request.authorID, {userID: req.user, ID: req.body.pageID}, false)
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let requestCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of requestCnt) {
                    let request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (request) {
                        doc.request = doc.request.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({request: doc.request}).then(() => {
                            sequence([notifications('chatRoomRequest', req.user, {userID: request.authorID, ID: req.body.pageID}, true),
                                notifications('chatRoomAccept', request.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('chatRoomReject', request.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
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

    if (req.header !== null && req.header('data-categ') === 'getPendingmark') {
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                chatroom.aggregate([{
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let mark = search(doc.mark, 'username', req.body.searchCnt);
                let updateMark = mark.slice(req.body.start, (req.body.limit + req.body.start));
                return res.status(200).send({select: updateMark ? updateMark : [], loadMore: (doc.mark.length - (req.body.start + req.body.limit)) > 0 });
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'cancelApprove') {
        chatroom.findOne({_id: req.body.pageID, 'pendingApprove.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let pendingApprove = doc.pendingApprove;
                let updatePending = pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({pendingApprove: updatePending}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPendingApprove: false}});
                    notifications('chatRoomPending', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
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
        chatroom.findOne({_id: req.body.pageID, 'mark.authorID': {$eq: req.user}}).then(doc => {
            if (doc) {
                let mark = doc.mark;
                let updateMark = mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) !== req.user);
                doc.updateOne({mark: updateMark}).then(() => {
                    res.status(200).send({pageInfo: {_id: req.body.pageID, isPendingMark: false}});
                    notifications('chatRoomMark', doc.authorID, {userID: req.user, ID: req.body.pageID}, true);
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


    if (req.header && req.header('data-categ') === 'searchChatroom') {
        let groupInfo = JSON.parse(req.body.searchCnt);
        let groupID =  groupInfo.groupID;
        group.findOne({'member.authorID': {$eq: req.user}, _id: groupID}).then(doc => {
            if (doc) {
                chatroom.find({_isCompleted: true, block: {$nin: [req.user]}, $text: {$search: groupInfo.search} })
                .skip(req.body.start).limit(req.body.limit).sort({created: -1, _id: -1}).then(result => {
                    let updateResult = [];
                    if (result) {
                        for (let cnt of result) {
                            let updateCnt = JSON.parse(JSON.stringify(cnt));
                            delete updateCnt.block;
                            updateResult.push({...updateCnt, favorite: cnt.favorite.length,
                            isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                            isMember: cnt.member.filter(cntItem => JSON.parse(JSON.stringify(cntItem.authorID)) === req.user)[0] ? true : false,
                            isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                            isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                            isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                            isPublic: cnt.roomType === 'Public', chat: {...cnt.member, user: cnt.member.slice(0, 4)},
                            request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length})
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
        chatroom.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc && doc.chat && !doc.chat._id) {
                return sequence([deleteMedia(doc.media), doc.question ? qcontent.findByIdAndDelete(doc.question) : Promise.resolve(),
                    doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (!doc) {
                chatroom.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This chatroom could not be deleted');
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

   
});

module.exports = router

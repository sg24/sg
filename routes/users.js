let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;

let sequence = require('./utility/sequence');
let authenticate = require('../serverDB/middleware/authenticate');
const bcrypt = require('bcryptjs');
let search = require('./utility/search');
let notifications = require('./utility/notifications');
const {user, notifications: notificationsModel, connectStatus,
    post, question, qchat, writeup, feed, group, grouppost, groupcbt, groupquestion, groupfeed, groupwriteup} = require('../serverDB/serverDB');

router.get('/', authenticate,(req, res, next) => {
    if (!req.authType) {
        res.render('users')
    } else {
        res.cookie('redirect', '/users');
        res.redirect('/login')
    }
})

router.get('/request', authenticate,(req, res, next) => {
    if (!req.authType) {
        res.render('users')
    } else {
        res.cookie('redirect', '/users');
        res.redirect('/login')
    }
})

router.post('/', authenticate,(req, res, next) => {
    if (req.header && req.header('data-categ') === 'getConversation') {
            notificationsModel.findOne({userID: req.user}).then(userNotification => {
            let chat = req.chat;
            let updateChat = [];
            if (chat.length > 0) {
                let chatNotification = userNotification ? userNotification.userChat : [];
                for (let cnt of chat) {
                    let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt.authorID)))[0];
                    cnt['notification'] = notification ? notification.counter : 0;
                    cnt['message'] = cnt.media && cnt.media.length > 0 ? cnt.media.pop().filename + '.' + cnt.media.pop().ext.split('/')[1]: 
                    cnt.content;
                    updateChat.push(cnt);
                }
            }
            res.status(200).send({conversation: updateChat, loadMore: (req.friend.length - chat.length) > 0});
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header && req.header('data-categ') === 'getNotification') {
        Promise.all([notificationsModel.findOne({userID: req.user}), 
            req.body.token && req.body.token.length > 0 ? req.subscription.filter(cnt => cnt.token === req.body.token).length < 1 : false ? user.findByIdAndUpdate(req.user, {$push: {subscription: {token: req.body.token, platform: req.body.platform}}}) : Promise.resolve()]).then(result => {
            let notification = result[0] ? JSON.parse(JSON.stringify(result[0])) : null;
            let stateHistory = req.body.stateHistory ? JSON.parse(req.body.stateHistory) : [];
            let settings = req.body.settings ? JSON.parse(req.body.settings) : {};
            const createNotification = () => {
                return new Promise((resolve, reject) => {
                    let saveNotification = new notificationsModel({userID: req.user});
                    saveNotification.save().then(doc => {
                        notification = JSON.parse(JSON.stringify(doc))
                        resolve();
                    })
                })
            }
            Promise.all([!notification ? createNotification() : Promise.resolve()]).then(() => {
                notification['groupPostShare'] = [];
                notification['groupQuestionShare'] = [];
                notification['groupFeedShare'] = [];
                notification['groupWriteupShare'] = [];
                notification['groupCbtShare'] = [];
                for (let page of stateHistory) {
                    page = page.split('Web')[0].toLowerCase();
                    for (let notificationPage in notification) {
                        page = page === 'home' ? 'post' : page;
                        if (notificationPage.toLowerCase() === page) {
                            notification[notificationPage] = [];
                        }
                    }
                }
                for (let page in settings) {
                    if (page === 'page' || page === 'share') {
                        let pageSettings = settings[page === 'share' ? 'share' : 'page'];
                        for (let cnt in pageSettings) {
                            if (!pageSettings[cnt]) {
                                if (page === 'page') {
                                    notification[cnt === 'cbt' ? 'qchat' : cnt] = [];
                                } else {
                                    notification[cnt === 'cbt' ? 'qchatShare' : `${cnt}Share`] = []
                                }
                            }
                        }
                    }
                    if (page === 'group') {
                        let pageSettings = settings['group'];
                        for (let cnt in pageSettings) {
                            if (!pageSettings[cnt] && cnt === 'chatroom') {
                                notification['chatRoomAccept'] = [];
                                notification['chatRoomReject'] = [];
                            }
                        }
                    }
                }

                delete notification.__v;
                delete notification._id;
                delete notification.userID;
                let removeNotification = {...notification};
                (async () => {
                    for (let page in notification) {
                        let pageCnt = [];
                        if (Array.isArray(notification[page])) {
                            for (let cnt of notification[page]) {
                                if (cnt) {
                                    let userInfo =  await user.findById(cnt.userID);
                                        if (userInfo) {
                                            if (Array.isArray(cnt.cntID)) {
                                                let pageItem = page !== 'userChat' ? cnt.cntID.slice(0, req.body.limit) : cnt.cntID;
                                                let updateCntID =  page !== 'userChat' ? cnt.cntID.slice(req.body.limit) : cnt.cntID;
                                                cnt.cntID = updateCntID;
                                                if (page !== 'userChat') {
                                                    let notificationPageIndex = removeNotification[page].findIndex(cntItem => JSON.parse(JSON.stringify(cntItem._id)) === JSON.parse(JSON.stringify(cnt._id)));
                                                    removeNotification[page][notificationPageIndex] = cnt;
                                                    removeNotification[page] = removeNotification[page].filter(cntItem => cntItem.cntID.length > 0);
                                                }
                                                for (let id of pageItem) {
                                                    let model = (page === 'post') || (page === 'postShare' ) ? post :
                                                    (page === 'question') || (page === 'questionShare' ) ? question :
                                                    (page === 'writeup') || (page === 'writeupShare') ? writeup :
                                                    (page === 'feed') || (page === 'feedShare' ) ? feed :
                                                    (page === 'createGroup') || (page === 'groupShare' ) ? group :
                                                    (page === 'qchat') || (page === 'qchatShare' ) ? qchat : null;
                                                    if (model) {
                                                        await model.findById(id).then(doc => {
                                                            if (doc) {
                                                                doc = JSON.parse(JSON.stringify(doc));
                                                                pageCnt.push({...doc, page: page === 'qchat' ? 'CBT' :
                                                                    page === 'qchatShare' ? 'CBTShare' :
                                                                    page === 'createGroup' ? 'Group Creation' : page,
                                                                content: page === 'qchatShare' || page === 'qchat' ? null : doc.content})
                                                            }
                                                        })
                                                    } else {
                                                        let title = page === 'groupJoin' ? `${userInfo.username} has joined your group`:
                                                        page === 'groupRequest' ? `${userInfo.username} has sent you a group request`:
                                                        page === 'groupAccept' ? `Admin has accepted your group request`:
                                                        page === 'groupReject' ? `Admin has rejected your group request`:
                                                        page === 'groupPending' ? `${userInfo.username} has sent you a group request`:
                                                        page === 'groupMark' ? `${userInfo.username} has sent you a group exam for marking`:
                                                        page === 'groupUserRemove' ? `Admin has removed you from a group`:
                                                        page === 'groupCbtRequest' ? `${userInfo.username} has sent you a group CBT request`:
                                                        page === 'groupCbtAccept' ? `${userInfo.username} has accepted you request to take exam`:
                                                        page === 'groupCbtReject' ? `${userInfo.username} has remove you request to take exam`:
                                                        page === 'groupCbtMark' ? `${userInfo.username} has sent you an exam for marking`:
                                                        page === 'groupCbtResult' ? `Your exam has being marked, check result`:
                                                        page === 'chatRoomJoin' ? `${userInfo.username} has joined your Chat Room`:
                                                        page === 'chatRoomRequest' ? `${userInfo.username} has sent you a Chat Room request`:
                                                        page === 'chatRoomAccept' ? `Admin has accepted your Chat Room request`:
                                                        page === 'chatRoomReject' ? `Admin has rejected your Chat Room request`:
                                                        page === 'chatRoomPending' ? `${userInfo.username} has sent you a Chat Room request`:
                                                        page === 'chatRoomMark' ? `${userInfo.username} has sent you a Chat Room entry exam for marking`:
                                                        page === 'userChat' ? `${cnt.counter} unread message from  ${userInfo.username}`:
                                                        page === 'chatRoomRequest' ? `${userInfo.username} has sent you a Chat Room request`:
                                                        page === 'advert' ? `${userInfo.username} Added new product`:
                                                        page === 'qchatRequest' ? `${userInfo.username} has sent you a CBT request`:
                                                        page === 'qchatAccept' ? `${userInfo.username} has accepted you request to take exam`:
                                                        page === 'qchatReject' ? `${userInfo.username} has remove you request to take exam`:
                                                        page === 'qchatMark' ? `${userInfo.username} has sent you an exam for marking`: `Your exam has being marked, check result`
                                                        pageCnt.push({userID: cnt.userID, username: userInfo.username, userImage: userInfo.image, status: (new Date().getTime() - new Date(userInfo.visited).getTime()) < 60000,
                                                            title, isPageID: true, _id: id, page, counter: cnt.counter});
                                                    }
                                                }

                                            } else {
                                                let title = page === 'userRequest' ? `${userInfo.username} sent you a friend request`:
                                                page === 'userAccept' ? `${userInfo.username} accepted your friend request`:
                                                page === 'userReject' ? `${userInfo.username} rejected your friend request`:
                                                page === 'userUnfriend' ? `${userInfo.username} unfriend you`:
                                                page === 'profileImage' ? `${userInfo.username} change is profile picture`:
                                                `${userInfo.username} change is profile name`;
                                                pageCnt.push({userID: cnt.userID, username: userInfo.username, userImage: userInfo.image, status: (new Date().getTime() - new Date(userInfo.visited).getTime()) < 60000,
                                                title, isUserImage: true, page});
                                                let updateRemove = removeNotification[page].filter(cntItem => JSON.parse(JSON.stringify(cntItem._id)) !== JSON.parse(JSON.stringify(cnt._id)));
                                                removeNotification[page] = updateRemove;
                                            }
                                        }
                                }
                            }
                            notification[page] = pageCnt;
                        }
                    }
                    Promise.all([notificationsModel.findOneAndUpdate({userID: req.user}, removeNotification)]).then(() => {
                        return res.status(200).send({notification});
                    });
                })()     
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header && req.header('data-categ') === 'getFriend') {
        let chat = req.chat;
        sequence([user.find({_id: {$in: [...req.friend]}}).skip(req.body.start).limit(req.body.limit).sort({created: 1, _id: 1}),
            notificationsModel.findOne({userID: req.user})]).then(result => {
            let updateFriend= [];
            for (let cnt of result[0]) {
                let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                let chatInfo = chat.filter(info => JSON.parse(JSON.stringify(info.authorID)) === JSON.parse(JSON.stringify(cnt._id)))[0];
                let message = chatInfo ? chatInfo.content ? chatInfo.content : 
                    chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media[chatInfo.media.length -1].filename.split('.')[0] + '.' + chatInfo.media[chatInfo.media.length -1].ext.split('/')[1] : null : null;
                let chatNotification = result[1] ? result[1].userChat : [];
                let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt._id)))[0];
                let updateNotification = notification ? notification.counter : 0;
                updateFriend.push({_id: cnt._id, chatID: chatInfo ? chatInfo._id : null, username: cnt.username,
                    userImage: cnt.image, status: isOnline, message, notification: updateNotification})
            }
            res.status(200).send({page: updateFriend, loadMore: (req.friend.length - (req.body.start + req.body.limit)) > 0, friendTotal: req.friend.length});
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header && req.header('data-categ') === 'getFriendById') {
        user.findById(req.body.searchCnt).then(doc => {
            if (doc) {
                let chat = doc.chat;
                sequence([user.find({_id: {$in: [...doc.friend]}}).skip(req.body.start).limit(req.body.limit).sort({created: 1, _id: 1}),
                    notificationsModel.findOne({userID: doc._id})]).then(result => {
                    let updateFriend= [];
                    for (let cnt of result[0]) {
                        let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                        let chatInfo = chat.filter(info => JSON.parse(JSON.stringify(info.authorID)) === JSON.parse(JSON.stringify(cnt._id)))[0];
                        let message = chatInfo ? chatInfo.content ? chatInfo.content : 
                            chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media[chatInfo.media.length -1].filename.split('.')[0] + '.' + chatInfo.media[chatInfo.media.length -1].ext.split('/')[1] : null : null;
                        let chatNotification = result[1] ? result[1].userChat : [];
                        let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt._id)))[0];
                        let updateNotification = notification ? notification.counter : 0;
                        updateFriend.push({_id: cnt._id, chatID: chatInfo ? chatInfo._id : null, username: cnt.username,
                            userImage: cnt.image, status: isOnline, message, notification: updateNotification})
                    }
                    res.status(200).send({page: updateFriend, loadMore: (doc.friend.length - (req.body.start + req.body.limit)) > 0});
                }).catch(err => {
                    res.status(500).send(err);
                })
            }
        });
    }
    
    if (req.header && req.header('data-categ') === 'searchFriend') {
        let chat = req.chat;
        sequence([user.find({_id: {$in: [...req.friend]}, $text: {$search: req.body.searchCnt}}).skip(req.body.start).limit(req.body.limit),
            notificationsModel.findOne({userID: req.user})]).then(result => {
            let updateFriend= [];
            for (let cnt of result[0]) {
                let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                let chatInfo = chat.filter(info => JSON.parse(JSON.stringify(info.authorID)) === JSON.parse(JSON.stringify(cnt._id)))[0];
                let message = chatInfo ? chatInfo.content ? chatInfo.content : 
                    chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media[chatInfo.media.length -1].filename.split('.')[0] + '.' + chatInfo.media[chatInfo.media.length -1].ext.split('/')[1] : null : null;
                let chatNotification = result[1] ? result[1].userChat : [];
                let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt._id)))[0];
                let updateNotification = notification ? notification.counter : 0;
                updateFriend.push({_id: cnt._id, chatID: chatInfo ? chatInfo._id : null, username: cnt.username,
                    userImage: cnt.image, status: isOnline, message, notification: updateNotification})
            }
            res.status(200).send({page: updateFriend, loadMore: (req.friend.length - (req.body.start + req.body.limit)) > 0});
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header && req.header('data-categ') === 'getUser') {
        let chat = req.chat;
        sequence([user.find({_id: {$ne: req.user}}).skip(req.body.start).limit(req.body.limit).sort({visited: -1}),
            notificationsModel.findOne({userID: req.user})]).then(result => {
            let updateFriend= [];
            for (let cnt of result[0]) {
                let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                let chatInfo = chat.filter(info => JSON.parse(JSON.stringify(info.authorID)) === JSON.parse(JSON.stringify(cnt._id)))[0];
                let message = chatInfo ? chatInfo.content ? chatInfo.content : 
                chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media[chatInfo.media.length -1].filename.split('.')[0] + '.' + chatInfo.media[chatInfo.media.length -1].ext.split('/')[1] : null : null;
                let isFriend = req.friend.filter(id => id === JSON.parse(JSON.stringify(cnt._id)))[0] ? true : false;
                let created = chatInfo ? chatInfo.created : null;
                let chatNotification = result[1] ? result[1].userChat : [];
                let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt._id)))[0];
                let updateNotification = notification ? notification.counter : 0;
                let pending = req.pendingRequest.filter(id => id === JSON.parse(JSON.stringify(cnt._id)))[0] ? true : false;
                let request = req.request.filter(id => id === JSON.parse(JSON.stringify(cnt._id)))[0] ? true : false
                updateFriend.push({_id: cnt._id, chatID: chatInfo ? chatInfo._id : null, username: cnt.username,
                    userImage: cnt.image, status: isOnline, message, notification: updateNotification, created,chat: isFriend, pending, request
                });
            }
            res.status(200).send({page: updateFriend, loadMore: result[0].length > 0});
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header && req.header('data-categ') === 'searchUser') {
        let chat = req.chat;
        sequence([user.find({_id: {$ne: req.user}, $text: {$search: req.body.searchCnt}}).skip(req.body.start).limit(req.body.limit).sort({created: 1, _id: 1}),
            notificationsModel.findOne({userID: req.user})]).then(result => {
            let updateFriend= [];
            for (let cnt of result[0]) {
                let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                let chatInfo = chat.filter(info => JSON.parse(JSON.stringify(info.authorID)) === JSON.parse(JSON.stringify(cnt._id)))[0];
                let message = chatInfo ? chatInfo.content ? chatInfo.content : 
                chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media[chatInfo.media.length -1].filename.split('.')[0] + '.' + chatInfo.media[chatInfo.media.length -1].ext.split('/')[1] : null : null;
                let isFriend = req.friend.filter(id => id === JSON.parse(JSON.stringify(cnt._id)))[0] ? true : false;
                let created = chatInfo ? chatInfo.created : null;
                let chatNotification = result[1] ? result[1].userChat : [];
                let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt._id)))[0];
                let updateNotification = notification ? notification.counter : 0;
                let pending = req.pendingRequest.filter(id => id === JSON.parse(JSON.stringify(cnt._id)))[0] ? true : false;
                let request = req.request.filter(id => id === JSON.parse(JSON.stringify(cnt._id)))[0] ? true : false
                updateFriend.push({_id: cnt._id, chatID: chatInfo ? chatInfo._id : null, username: cnt.username,
                    userImage: cnt.image, status: isOnline, message, notification: updateNotification, created,chat: isFriend, pending, request
                });
            }
            res.status(200).send({page: updateFriend, loadMore: result[0].length > 0});
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header !== null && req.header('data-categ') === 'getUserRequest') {
        let userRequest = req.request;
        console.log(userRequest)
        console.log(req.friend)
        let updateUserRequest = userRequest.slice(req.body.start, (req.body.limit + req.body.start));
        let userInfo = []
        Promise.resolve().then(() => {
            (async() => {
                for (let userID of updateUserRequest) {
                    try {
                        await user.findById(userID).then(doc => {
                            if (doc) {
                                console.log(doc.email)
                                console.log('user', doc.pendingRequest, doc.friend)
                                userInfo.push({username: doc.username, userImage: doc.image, authorID: doc._id, _id: doc._id})
                            }
                        })
                    } catch(err) {
                        return res.status(500).send(err);
                    }
                }
                return res.status(200).send({select: userInfo, loadMore: (req.request.length - (req.body.start + req.body.limit)) > 0 })
            })();
        })
    }

    if (req.header !== null && req.header('data-categ') === 'searchUserRequest') {
        let userInfo = []
        Promise.resolve().then(() => {
            (async() => {
                for (let userID of req.request) {
                    try {
                        await user.findById(userID).then(doc => {
                            if (doc) {
                                userInfo.push({username: doc.username, userImage: doc.image, authorID: doc._id, _id: doc._id})
                            }
                        })
                    } catch(err) {
                        return res.status(500).send(err);
                    }
                }
                let userRequest = search(userInfo, 'username', req.body.searchCnt);
                let updateUserRequest = userRequest.slice(req.body.start, (req.body.limit + req.body.start));
                res.status(200).send({select: updateUserRequest, loadMore: (userRequest.length - (req.body.start + req.body.limit)) > 0 })
            })();
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setAcceptuser') {
        let pendingAcceptCnt = JSON.parse(req.body.cnt);
        Promise.resolve().then(() => {
            (async() => {
                for (let userID of pendingAcceptCnt) {
                    try {
                        await sequence([
                            user.findOneAndUpdate({_id: req.user, friend: { $ne : userID }}, {$addToSet: { friend: userID }, $pull: {request: userID}}),
                            notifications('userRequest', req.user, {userID}, true),
                            notifications('userAccept', userID, {userID: req.user}, false),
                            user.findByIdAndUpdate(userID, {$addToSet: { friend: req.user }, $pull: {'pendingRequest': req.user}})
                        ])
                    } catch(err) {
                        return res.status(500).send(err);
                    }
                }
            })();
            res.sendStatus(200);
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setRejectuser') {
        let pendingRejectCnt = JSON.parse(req.body.cnt);
        Promise.resolve().then(() => {
            (async() => {
                for (let userID of pendingRejectCnt) {
                    try {
                        await sequence([user.findByIdAndUpdate(req.user, {$pull: {request: userID}}),
                            notifications('userRequest', req.user, {userID}, true),
                            notifications('userReject', userID, {userID: req.user}, false),
                            user.findByIdAndUpdate(userID, {$pull: {'pendingRequest': req.user}})
                        ])
                    } catch(err) {
                        return res.status(500).send(err);
                    }
                }
            })();
            res.sendStatus(200);
        });
        return
    }

    // if (req.header && req.header('data-categ') && req.header('data-categ').startsWith('request')) {
    //     let isActive = req.header('data-categ').split('-')[1];
    //     let model = req.userType === 'authUser' ? authUser : user;
    //     model.findById(req.user).then(result => {
    //         fetchReq(user, result.request,  {cnt: [],cntTotal: 0}).then(userFnd => {
    //             fetchReq(authUser, result.request, userFnd).then(totalFnd => {
    //                 let sendReq = isActive === 'activeOnly' ? String(totalFnd.cntTotal) : totalFnd;
    //                 res.status(200).send(sendReq);
    //             })
    //         })
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })

    //     function fetchReq(model, friend, modelCnt) {
    //         return new Promise((resolve,reject) => {
    //             model.find({_id: { $in : friend }}).limit(parseInt(req.header('limit'))).skip(parseInt(req.header('skip'))).then(result => {
    //                 for (let cnt of result) {
    //                     let id = cnt._id.toHexString();
    //                     let userDet = {id, username: cnt.username,studenttotal: cnt.student.length+cnt.teacher.length,status: cnt.status, image: cnt.image || ''}
    //                     userDet['request'] = true;
    //                     modelCnt.cnt.push(userDet)
    //                     modelCnt.cntTotal = modelCnt.cntTotal + 1;
    //                 }
    //                 resolve(modelCnt);
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //         })
    //     }
    //     return
    // }

    // if (req.header && req.header('data-categ') === 'friendtotal') {
    //     let model = req.userType === 'authUser' ? authUser : user;
    //     model.findById(req.user).then(result => {
    //         res.status(200).send(String(result.student.length + result.teacher.length))
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })
    //     return;
    // }

    // if (req.header && req.header('data-categ') &&  req.header('data-categ').startsWith('friend')) {
    //     let status = req.header('data-categ').split('-')[1] === 'online' ? {status: true} : 
    //     req.header('data-categ').split('-')[1] === 'offline' ? {status: false} : {}
    //     user.findById(req.user).then(result => {
    //         let fnd = result.friend;
    //         fetchFriend(user, fnd,  {cnt: [],cntTotal: 0}).then(userFnd => {
    //             res.status(200).send(userFnd);
    //         })
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })

    //     function fetchFriend(model, friend, modelCnt) {
    //         return new Promise((resolve,reject) => {
    //             model.find({_id: { $in : friend }, ...status}).limit(parseInt(req.header('limit'))).skip(parseInt(req.header('skip'))).then(result => {
    //                 for (let cnt of result) {
    //                     let id = cnt._id.toHexString();
    //                     let userDet = {id, username: cnt.username,friendtotal: cnt.friend.length , status: cnt.status, image: cnt.image || ''}
    //                     userDet['accept'] = true;
    //                     modelCnt.cnt.push(userDet)
    //                     modelCnt.cntTotal = modelCnt.cntTotal + 1;
    //                 }
    //                 resolve(modelCnt);
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //         })
    //     }
    //     return
    // }

    // if (req.header && req.header('data-categ') &&  req.header('data-categ').startsWith('subscribe')) {
    //     if (req.header('data-categ').split('==')[1]) {
    //         let subscription = JSON.parse(req.header('data-categ').split('==')[1]);
    //         user.findByIdAndUpdate(req.user, { $push: {subscription: {$each: [subscription],$slice: -1 }}, enableNotification: true}).then(() => {
    //             res.sendStatus(200)
    //         }).catch(err => {
    //             res.status(500).send(err)
    //         })
    //     } else {
    //         res.sendStatus(200)
    //     }
        
    //     return;
    // }

    // if (req.header && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     return filterCnt((JSON.parse(req.header('data-categ').split('==')[1]))).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
    //         return fetchUsers(
    //             connectStatus,
    //             {$text: { $search: filter.searchCnt },
    //             block: {$ne: req.user},
    //             _id: {$ne: mongoose.mongo.ObjectId(req.user)},
    //             ...category},
    //             { score: { $meta: "textScore" } },
    //             parseInt(req.header('limit')), parseInt(req.header('skip')), { score: { $meta: "textScore" }}, user, {
    //                 cnt: [],
    //                 cntTotal: 0
    //             }
    //         ).then(userCnt => {
    //             fetchUsers(
    //                 connectStatus,
    //                 {$text: { $search: filter.searchCnt },
    //                 block: {$ne: req.user},
    //                 _id: {$ne: mongoose.mongo.ObjectId(req.user)},
    //                 ...category},
    //                 { score: { $meta: "textScore" } },
    //                 parseInt(req.header('limit')), parseInt(req.header('skip')), { score: { $meta: "textScore" }}, authUser, userCnt
    //             ).then(result =>{
    //                 res.status(200).send(result)
    //             }).catch(err => {
    //                 res.status(500).send(err)
    //             })
    //         }).catch(err => {
    //             res.status(500).send(err)
    //         })
    //     }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //     return
    // }

    // function fetchUsers(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt) {
    //     return new Promise((resolve, reject) => {
    //         fetchCnt(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt).then(result => {
    //             for (let cnt of result.cnt) {
    //                 let userRequest = cnt.pendingRequest || [];
    //                 let filterReq = userRequest.filter(id => id === req.user)
    //                 let pendingRequest = cnt.request || [];
    //                 let filterPendingReq = pendingRequest.filter(id => id ===  req.user);
    //                 let userBlock = cnt.block || [];
    //                 let filterBlock = userBlock.filter(id => id === req.user)
    //                 let userTeacher = cnt.student || [];
    //                 let userTeacherFilter = userTeacher.filter(id => id === req.user);
    //                 let teacher = cnt.teacher || [];
    //                 let teacherFilter = teacher.filter(id => id === req.user);

    //                 let id = req.user;
    //                 let userDet = {id, username: cnt.username,studenttotal: cnt.student.length+cnt.teacher.length, student: cnt.student.length,status: cnt.status, image: cnt.image || ''}
                    
    //                 if (filterReq.length > 0) {
    //                     userDet['request'] = true
    //                 }
    //                 if (filterPendingReq.length > 0) {
    //                     userDet['pending'] = true
    //                 }
                    
    //                 if (userTeacherFilter.length > 0 || teacherFilter.length > 0) {
    //                     userDet['accept'] = true;
    //                 }
                
    //                 if (filterBlock.length < 1) {
    //                     modelCnt.cnt.push(userDet)
    //                 } 
    //             }
    //             modelCnt.cntTotal =  result.cntTotal;
    //             resolve(modelCnt)
    //         })  
    //     })
    // }
});

router.patch('/', authenticate,(req, res, next) => {
    let id = req.body.id;
    if (req.header && req.header('data-categ') === 'addUser') {
        if (!req.authType) {
            let condition = {
                $addToSet: { 'request': req.user }
            }
            sequence([
                user.findByIdAndUpdate(id, condition), 
                notifications('userRequest', id, {userID: req.user}, false),
                user.findByIdAndUpdate(req.user, {$addToSet: {'pendingRequest': [id]}})]).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.cookie('redirect', '/users');
            res.redirect('/login')
        }
        return 
    }

    if (req.header && req.header('data-categ') === 'blockUser') {
        let model = req.userType === 'authUser' ? authUser : user;
        let id = req.body.id;
        model.findByIdAndUpdate(req.user, {
            $pull: {student: id, teacher: id},
            multi: true
        }).then(() => {
            let condition = {
                $pull: {student: req.user, teacher: req.user, request: req.user},
                $addToSet: { block: req.user },
                multi: true
            }
            user.findByIdAndUpdate(id, condition).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(400).send(err)
            })
        }).catch(err =>{
            res.status(500).send(err);
        });
        return
    }

    if (req.header && req.header('data-categ') === 'acceptUser') {
        sequence([
            user.findOneAndUpdate({_id: req.user, friend: { $ne : id }}, {$addToSet: { friend: id }, $pull: {request: id}}),
            notifications('userRequest', req.user, {userID: id}, true),
            notifications('userAccept', id, {userID: req.user}, false),
            user.findByIdAndUpdate(id, {$addToSet: { friend: req.user }, $pull: {'pendingRequest': req.user}}),
            user.findOneAndUpdate({_id: req.user, request: { $in : id }}, {$pull: {request: id}})
        ]).then(() => {
            res.sendStatus(200)
        }).catch(err =>{
            res.status(500).send(err);
        });
        return
    }

    if (req.header && req.header('data-categ') === 'rejUser') {
        sequence([user.findByIdAndUpdate(req.user, {$pull: {request: id}}),
            notifications('userRequest', req.user, {userID: id}, true),
            notifications('userReject', id, {userID: req.user}, false),
            user.findByIdAndUpdate(id, {$pull: {'pendingRequest': req.user}})]).then(() => {
            res.sendStatus(200);
        }).catch(err =>{
            res.status(500).send(err);
        });
        return
    }

    if (req.header && req.header('data-categ') === 'cancelReq') {
        let condition = {
            $pull: { request: req.user }
        }
        sequence([user.findByIdAndUpdate(id, condition),
            notifications('userRequest', id, {userID: req.user}, true),
            user.findByIdAndUpdate(req.user, {$pull: {'pendingRequest': id}})]).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header && req.header('data-categ') === 'unfriend') {
        sequence([
            user.findOneAndUpdate({_id: req.user, friend: { $in : [id] }}, {$pull: { friend: id }}),
            user.findOneAndUpdate({_id: id, friend: { $in : [req.user] }}, {$pull: { friend: req.user }}),
            notifications('userUnfriend', id, {userID: req.user}, false)]).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
    }
    
});

module.exports = router;
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
const bcrypt = require('bcryptjs');
let notifications = require('./utility/notifications');
const {user, userchat, notifications: notificationsModel, connectStatus} = require('../serverDB/serverDB');

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

    if (req.header && req.header('data-categ') === 'getFriend') {
        let chat = req.chat;
        Promise.all([user.find({_id: {$in: [...req.friend]}}).skip(req.body.start).limit(req.body.limit).sort({created: 1, _id: 1}),
            notificationsModel.findOne({userID: req.user})]).then(result => {
            let updateFriend= [];
            for (let cnt of result[0]) {
                let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                let chatInfo = chat.filter(info => info.authorID === cnt.authorID)[0];
                let message = chatInfo ? chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media.pop().filename + '.' + chatInfo.media.pop().ext.split('/')[1]: 
                    chatInfo.content : null;
                let chatNotification = result[1] ? resut[1].userChat : [];
                let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(cnt.authorID)))[0];
                let updateNotification = notification ? notification.counter : 0;
                updateFriend.push({_id: cnt._id, chatID: chatInfo ? chatInfo._id : null, username: cnt.username,
                    userImage: cnt.image, authorID: cnt.authorID, status: isOnline, message, notification: updateNotification})
            }
            res.status(200).send({friend: updateFriend, loadMore: (req.friend.length - (req.body.start + req.body.limit)) > 0});
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header && req.header('data-categ') === 'shareChat') {
        let cnt = JSON.parse(req.body.cnt);
        let reciepent = JSON.parse(req.body.reciepent);
        for (let reciever of reciepent) {
            let info = req.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === reciever)[0];
            if (info) {
                send(cnt, reciever, info).then(() => {
                    res.sendStatus(200);
                }).catch(err => {
                    res.status(500).send(err);
                })
            } else {
                user.findById(reciever).then(result => {
                    let info = result.chat.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0];
                    if (info) {
                        send(cnt, reciever, {...info, authorID: result._id, username: result.username, userImage: result.image}).then(() => {
                            res.sendStatus(200);
                        }).catch(err => {
                            res.status(500).send(err);
                        })
                    } else {
                        let chat  = {
                            authorID: req.user, username: req.username, userImage: req.userImage,
                            content: cnt.content, media: cnt.media, tempFileID: cnt.tempFileID,
                            shared: cnt.authorID
                        }
                        let newDoc = new userchat(chat);
                        newDoc.save().then(result => {
                            user.findByIdAndUpdate(reciever, {$pull: {chat: {'authorID': req.user}}, $push: {chat: {...chat, _id: result._id}}}).then((info) => {
                                Promise.all([user.findByIdAndUpdate(req.user, {$pull: {chat: {'authorID': reciever}}, $push: {chat: { ...chat, 
                                    _id: result._id, authorID: reciever, username: info.username, userImage: info.image}}}),
                                notifications('userChat', reciever, {userID: req.user, cntID: result._id, enableCounter: true})])
                            });
                        })
                    }
                })
            }
        }
        const send = (cnt, reciever, info) => {
            let chat = {
                authorID: req.user, username: req.username, userImage: req.userImage,
                content: cnt.content, media: cnt.media, tempFileID: cnt.tempFileID,
                shared: cnt.authorID
            }
            return Promise.all([userchat.findByIdAndUpdate(info._id, {$push: {chat}}), 
                user.findByIdAndUpdate(reciever, {$pull: {chat: {'authorID': req.user}}, $push: {chat: {...chat, _id: info._id}}}),
                user.findByIdAndUpdate(req.user, {$pull: {chat: {'authorID': reciever}}, $push: {chat: { ...chat, 
                    _id: info._id, authorID: reciever, username: info.username, userImage: info.userImage}}}),
                notifications('userChat', reciever, {userID: req.user, cntID: info._id, enableCounter: true})])
        }
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
            Promise.all([
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
        Promise.all([
            user.findOneAndUpdate({_id: req.user, friend: { $ne : id }}, {$addToSet: { friend: id }, $pull: {request: id}}),
            notifications('userRequest', req.user, {userID: id}, true),
            notifications('userAccept', id, {userID: req.user}, false),
            user.findByIdAndUpdate(id, {$addToSet: { friend: req.user }, $pull: {'pendingRequest': req.user}})
        ]).then(() => {
            res.sendStatus(200)
        }).catch(err =>{
            res.status(500).send(err);
        });
        return
    }

    if (req.header && req.header('data-categ') === 'rejUser') {
        Promise.all([user.findByIdAndUpdate(req.user, {$pull: {request: id}}),
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
        Promise.all([user.findByIdAndUpdate(id, condition),
            notifications('userRequest', id, {userID: req.user}, true),
            user.findByIdAndUpdate(req.user, {$pull: {'pendingRequest': id}})]).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header && req.header('data-categ') === 'unfriend') {
        Promise.all([
            user.findOneAndUpdate({_id: req.user, friend: { $in : [id] }}, {$pull: { friend: id }}),
            notifications('userUnfriend', id, {userID: req.user}, false)]).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
    }
    
});

module.exports = router;
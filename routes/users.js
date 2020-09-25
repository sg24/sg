let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
const bcrypt = require('bcryptjs');
const fetchCnt = require('./utility/fetchcnt');
let filterCnt = require('./utility/filtercnt');
let notifications = require('./utility/notifications');
const {user, connectStatus} = require('../serverDB/serverDB');

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
    if (req.header && req.header('data-categ') === 'users') {
        if (!req.authType) {
            return fetchUsers(connectStatus, {
                block: {$ne: req.user},
                _id: {$ne: mongoose.mongo.ObjectId(req.user)}
            }, {student: -1}, 
                parseInt(req.header('limit')), parseInt(req.header('skip')), {}, user, {
                    cnt: [],
                    cntTotal: 0
                }).then(userCnt => {
                    res.status(200).send(userCnt);
                })
        } else {
            res.send({cnt:[], cntTotal: 0}).status(200);
        }
    }

    if (req.header && req.header('data-categ') && req.header('data-categ').startsWith('request')) {
        let isActive = req.header('data-categ').split('-')[1];
        let model = req.userType === 'authUser' ? authUser : user;
        model.findById(req.user).then(result => {
            fetchReq(user, result.request,  {cnt: [],cntTotal: 0}).then(userFnd => {
                fetchReq(authUser, result.request, userFnd).then(totalFnd => {
                    let sendReq = isActive === 'activeOnly' ? String(totalFnd.cntTotal) : totalFnd;
                    res.status(200).send(sendReq);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })

        function fetchReq(model, friend, modelCnt) {
            return new Promise((resolve,reject) => {
                model.find({_id: { $in : friend }}).limit(parseInt(req.header('limit'))).skip(parseInt(req.header('skip'))).then(result => {
                    for (let cnt of result) {
                        let id = cnt._id.toHexString();
                        let userDet = {id, username: cnt.username,studenttotal: cnt.student.length+cnt.teacher.length,status: cnt.status, image: cnt.image || ''}
                        userDet['request'] = true;
                        modelCnt.cnt.push(userDet)
                        modelCnt.cntTotal = modelCnt.cntTotal + 1;
                    }
                    resolve(modelCnt);
                }).catch(err => {
                    reject(err);
                })
            })
        }
        return
    }

    if (req.header && req.header('data-categ') === 'friendtotal') {
        let model = req.userType === 'authUser' ? authUser : user;
        model.findById(req.user).then(result => {
            res.status(200).send(String(result.student.length + result.teacher.length))
        }).catch(err => {
            res.status(500).send(err);
        })
        return;
    }

    if (req.header && req.header('data-categ') &&  req.header('data-categ').startsWith('friend')) {
        let status = req.header('data-categ').split('-')[1] === 'online' ? {status: true} : 
        req.header('data-categ').split('-')[1] === 'offline' ? {status: false} : {}
        user.findById(req.user).then(result => {
            let fnd = result.friend;
            fetchFriend(user, fnd,  {cnt: [],cntTotal: 0}).then(userFnd => {
                res.status(200).send(userFnd);
            })
        }).catch(err => {
            res.status(500).send(err);
        })

        function fetchFriend(model, friend, modelCnt) {
            return new Promise((resolve,reject) => {
                model.find({_id: { $in : friend }, ...status}).limit(parseInt(req.header('limit'))).skip(parseInt(req.header('skip'))).then(result => {
                    for (let cnt of result) {
                        let id = cnt._id.toHexString();
                        let userDet = {id, username: cnt.username,friendtotal: cnt.friend.length , status: cnt.status, image: cnt.image || ''}
                        userDet['accept'] = true;
                        modelCnt.cnt.push(userDet)
                        modelCnt.cntTotal = modelCnt.cntTotal + 1;
                    }
                    resolve(modelCnt);
                }).catch(err => {
                    reject(err);
                })
            })
        }
        return
    }

    if (req.header && req.header('data-categ') &&  req.header('data-categ').startsWith('subscribe')) {
        if (req.header('data-categ').split('==')[1]) {
            let subscription = JSON.parse(req.header('data-categ').split('==')[1]);
            user.findByIdAndUpdate(req.user, { $push: {subscription: {$each: [subscription],$slice: -1 }}, enableNotification: true}).then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send(err)
            })
        } else {
            res.sendStatus(200)
        }
        
        return;
    }

    if (req.header && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
        return filterCnt((JSON.parse(req.header('data-categ').split('==')[1]))).then(filter => {
            let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
            return fetchUsers(
                connectStatus,
                {$text: { $search: filter.searchCnt },
                block: {$ne: req.user},
                _id: {$ne: mongoose.mongo.ObjectId(req.user)},
                ...category},
                { score: { $meta: "textScore" } },
                parseInt(req.header('limit')), parseInt(req.header('skip')), { score: { $meta: "textScore" }}, user, {
                    cnt: [],
                    cntTotal: 0
                }
            ).then(userCnt => {
                fetchUsers(
                    connectStatus,
                    {$text: { $search: filter.searchCnt },
                    block: {$ne: req.user},
                    _id: {$ne: mongoose.mongo.ObjectId(req.user)},
                    ...category},
                    { score: { $meta: "textScore" } },
                    parseInt(req.header('limit')), parseInt(req.header('skip')), { score: { $meta: "textScore" }}, authUser, userCnt
                ).then(result =>{
                    res.status(200).send(result)
                }).catch(err => {
                    res.status(500).send(err)
                })
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    function fetchUsers(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt) {
        return new Promise((resolve, reject) => {
            fetchCnt(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt).then(result => {
                for (let cnt of result.cnt) {
                    let userRequest = cnt.pendingRequest || [];
                    let filterReq = userRequest.filter(id => id === req.user)
                    let pendingRequest = cnt.request || [];
                    let filterPendingReq = pendingRequest.filter(id => id ===  req.user);
                    let userBlock = cnt.block || [];
                    let filterBlock = userBlock.filter(id => id === req.user)
                    let userTeacher = cnt.student || [];
                    let userTeacherFilter = userTeacher.filter(id => id === req.user);
                    let teacher = cnt.teacher || [];
                    let teacherFilter = teacher.filter(id => id === req.user);

                    let id = req.user;
                    let userDet = {id, username: cnt.username,studenttotal: cnt.student.length+cnt.teacher.length, student: cnt.student.length,status: cnt.status, image: cnt.image || ''}
                    
                    if (filterReq.length > 0) {
                        userDet['request'] = true
                    }
                    if (filterPendingReq.length > 0) {
                        userDet['pending'] = true
                    }
                    
                    if (userTeacherFilter.length > 0 || teacherFilter.length > 0) {
                        userDet['accept'] = true;
                    }
                
                    if (filterBlock.length < 1) {
                        modelCnt.cnt.push(userDet)
                    } 
                }
                modelCnt.cntTotal =  result.cntTotal;
                resolve(modelCnt)
            })  
        })
    }
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
                notifications('userReject', id, {userID: req.user}, true),
                notifications('userUnfriend', id, {userID: req.user}, true),
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
            authUser.findByIdAndUpdate(id, condition).then(result => {
                if (!result) {
                    user.findByIdAndUpdate(id, condition).then(() => {
                        res.sendStatus(200);
                    })
                } else {
                    res.sendStatus(200);
                }
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
            user.findByIdAndUpdate(id, {$pull: {'pendingRequest': req.user}})
        ]).then(() => {
            res.sendStatus(200)
        }).catch(err =>{
            res.status(500).send(err);
        });
        return
    }

    if (req.header && req.header('data-categ') === 'rejUser') {
        Promise.all([user.findByIdAndUpdate(req.user, {$pull: {request: id}}),
            notifications('userRequest', req.user, {userID: id}, false),
            notifications('userReject', id, {userID: req.user}, true),
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
            notifications('userReject', id, {userID: req.user}, false),
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
            notifications('userUnfriend', id, {userID: req.user}, false),
            notifications('userAccept', id, {userID: req.user}, false)]).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
    }
    
});

module.exports = router;
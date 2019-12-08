let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let authenticate = require('../serverDB/middleware/authenticate');
const bcrypt = require('bcryptjs');
const fetchCnt = require('./utility/fetchCnt');
let filterCnt = require('./utility/filtercnt');
let userFilter = require('./utility/userfilter');
const {category, user, 
     authUser,connectStatus} = require('../serverDB/serverDB');


router.get('/', authenticate,(req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
        return
    }

    if (req.header && req.header('data-categ') === 'users') {
        return fetchUsers(connectStatus, {
            block: {$ne: req.user},
            _id: {$ne: mongoose.mongo.ObjectId(req.user)}
        }, {student: -1}, 
            parseInt(req.header('limit')), parseInt(req.header('skip')), {}, user, {
                cnt: [],
                cntTotal: 0
            }).then(userCnt => {
                fetchUsers(connectStatus, {
                    block: {$ne: req.user},
                    _id: {$ne: mongoose.mongo.ObjectId(req.user)}
                }, {student: -1}, 
                    parseInt(req.header('limit')), parseInt(req.header('skip')), {}, authUser, userCnt).then(result => {
                        res.status(200).send(result);
                    })
            })
    }

    if (req.header && req.header('data-categ') === 'request') {
        return fetchReq(connectStatus, {
            block: {$ne: req.user},
            _id: {$ne: mongoose.mongo.ObjectId(req.user)}
        }, {student: -1}, 
            parseInt(req.header('limit')), parseInt(req.header('skip')), {}, user, {
                cnt: [],
                cntTotal: 0
            }).then(userCnt => {
                fetchReq(connectStatus, {
                    block: {$ne: req.user},
                    _id: {$ne: mongoose.mongo.ObjectId(req.user)}
                }, {student: -1}, 
                    parseInt(req.header('limit')), parseInt(req.header('skip')), {}, authUser, userCnt).then(result => {
                        res.status(200).send(result);
                    })
            })
    }

    if (req.header && req.header('data-categ') === 'student') {
        return fetchTeacher(connectStatus, {
            block: {$ne: req.user},
            _id: {$ne: mongoose.mongo.ObjectId(req.user)}
        }, {student: -1}, 
            parseInt(req.header('limit')), parseInt(req.header('skip')), {}, user, {
                cnt: [],
                cntTotal: 0
            }).then(userCnt => {
                fetchTeacher(connectStatus, {
                    block: {$ne: req.user},
                    _id: {$ne: mongoose.mongo.ObjectId(req.user)}
                }, {student: -1}, 
                    parseInt(req.header('limit')), parseInt(req.header('skip')), {}, authUser, userCnt).then(result => {
                        res.status(200).send(result);
                    })
            })
    }

    if (req.header && req.header('data-categ') === 'studenttotal') {
        let model = req.userType === 'authUser' ? authUser : user;
        model.findById(req.user).then(result => {
            res.status(200).send(String(result.studenttotal))
        }).catch(err => {
            res.status(500).send(err);
        })
        return;
    }

    if (req.header && req.header('data-categ') &&  req.header('data-categ').startsWith('subscribe')) {
        let subscription = JSON.parse(req.header('data-categ').split('==')[1]);
        let model = req.userType === 'authUser' ? authUser : user;
        model.findByIdAndUpdate(req.user, { $push: {subscription: {$each: [subscription],$slice: -1 }}, enableNotification: true}).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.status(500).send(err)
        })
        return;
    }
    
    if (req.header && req.header('data-categ') &&  req.header('data-categ').startsWith('allteacher')) {
        let model = req.userType === 'authUser' ? authUser : user;
        let status = req.header('data-categ').split('-')[1] === 'online';
        model.findById(req.user).then(result => {
            let student = [...result.student, ...result.teacher];
            fetchAllTeacher(user, student, status, []).then(userTeacher => {
                fetchAllTeacher(authUser, student, status, userTeacher).then(totalTeacher => {
                    res.status(200).send(totalTeacher)
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })

        function fetchAllTeacher(model, allTeacher, status, fndTeacher) {
            return new Promise((resolve,reject) =>{
                model.find({_id: { $in : allTeacher }, status}).then(result => {
                    let users = [];
                    for (let cnt of result) {
                        let userDet = {id: cnt.id, username: cnt.username,student: cnt.student.length,status: cnt.status, image: cnt.image || ''}
                        users.push(userDet)
                    }
                    let newFndTeacher = [...fndTeacher, ...users]
                    resolve(newFndTeacher);
                }).catch(err => {
                    reject(err);
                })
            })
        }
        return 
    }

    if (req.header && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
        return userFilter((JSON.parse(req.header('data-categ').split('==')[1]))).then(filter => {
            let filterCnt = filter.filterCnt.length > 0 ? filter.filterCnt : [];
            return fetchUsers(
                connectStatus,
                {$text: { $search: `\"${filter.searchCnt}\"`},
                block: {$ne: req.user},
                _id: {$ne: mongoose.mongo.ObjectId(req.user)},
                ...filterCnt},
                { score: { $meta: "textScore" } },
                parseInt(req.header('limit')), parseInt(req.header('skip')), { score: { $meta: "textScore" }}, user, {
                    cnt: [],
                    cntTotal: 0
                }
            ).then(userCnt => {
                fetchUsers(
                    connectStatus,
                    {$text: { $search: `\"${filter.searchCnt}\"`},
                    block: {$ne: req.user},
                    _id: {$ne: mongoose.mongo.ObjectId(req.user)},
                    ...filterCnt},
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
                let model = req.userType === 'authUser' ? authUser : user;
                model.findById(req.user).then(resultFilter =>{
                    for (let cnt of result.cnt) {
                        let userRequest = resultFilter.request || [];
                        let filterReq = userRequest.filter(id => id === cnt._id.toHexString())
                        let mainRequest = cnt.request || [];
                        let filterMainReq = mainRequest.filter(id => id ===  req.user);
                        let userBlock = resultFilter.block || [];
                        let filterBlock = userBlock.filter(id => id === cnt._id.toHexString())
                        let userTeacher = resultFilter.teacher || [];
                        let userTeacherFilter = userTeacher.filter(id => id === cnt._id.toHexString());
                        let teacher = cnt.teacher || [];
                        let teacherFilter = teacher.filter(id => id === req.user);

                        let id = jwt.sign(cnt._id.toHexString(), process.env.JWT_SECRET).toString();
                        let userDet = {id, username: cnt.username,student: cnt.student.length,status: cnt.status, image: cnt.image || ''}
                        
                        if (filterReq.length > 0) {
                            userDet['request'] = true
                        }
                        if (filterMainReq.length > 0) {
                            userDet['pending'] = true
                        }
                        if (userTeacherFilter.length > 0 || teacherFilter.length > 0) {
                            userDet['accept'] = true;
                        }
                       
                        if (filterBlock.length < 1) {
                            modelCnt.cnt.push(userDet)
                            modelCnt.cntTotal = modelCnt.cntTotal + 1;
                        } 
                    }
                    resolve(modelCnt)
                })
            })  
        })
    }

    function fetchReq(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt) {
        return new Promise((resolve, reject) => {
            fetchCnt(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt).then(result => {
                let model = req.userType === 'authUser' ? authUser : user;
                model.findById(req.user).then(resultFilter =>{
                    for (let cnt of result.cnt) {
                        let userRequest = resultFilter.request || [];
                        let filterReq = userRequest.filter(id => id === cnt._id.toHexString())
                        let userBlock = resultFilter.block || [];
                        let filterBlock = userBlock.filter(id => id === cnt._id.toHexString())

                        let id = jwt.sign(cnt._id.toHexString(), process.env.JWT_SECRET).toString();
                        let userDet = {id, username: cnt.username,student: cnt.student.length,status: cnt.status, image: cnt.image || ''}
                       
                        if (filterReq.length > 0 && filterBlock.length < 1) {
                            userDet['request'] = true;
                            modelCnt.cnt.push(userDet)
                            modelCnt.cntTotal = modelCnt.cntTotal + 1;
                        } 
                    }
                    resolve(modelCnt)
                })
            })  
        })
    }

    function fetchTeacher(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt) {
        return new Promise((resolve, reject) => {
            fetchCnt(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt).then(result => {
                let model = req.userType === 'authUser' ? authUser : user;
                model.findById(req.user).then(resultFilter =>{
                    for (let cnt of result.cnt) {
                        let student = resultFilter.student || [];
                        let filterStudent = student.filter(id => id === cnt._id.toHexString())
                        let userBlock = resultFilter.block || [];
                        let filterBlock = userBlock.filter(id => id === cnt._id.toHexString())

                        let id = jwt.sign(cnt._id.toHexString(), process.env.JWT_SECRET).toString();
                        let userDet = {id, username: cnt.username,student: cnt.student.length,status: cnt.status, image: cnt.image || ''}
                       
                        if (filterStudent.length > 0 && filterBlock.length < 1) {
                            userDet['accept'] = true;
                            modelCnt.cnt.push(userDet)
                            modelCnt.cntTotal = modelCnt.cntTotal + 1;
                        } 
                    }
                    resolve(modelCnt)
                })
            })  
        })
    }
    res.render('users')
});

router.patch('/', authenticate,(req, res, next) => {
    if (req.header && req.header('data-categ') === 'addUser') {
        return update(jwt.verify(req.body.id, process.env.JWT_SECRET), authUser, user, 'request')
    }

    if (req.header && req.header('data-categ') === 'blockUser') {
        let model = req.userType === 'authUser' ? authUser : user;
        let id = jwt.verify(req.body.id, process.env.JWT_SECRET);
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
        let model = req.userType === 'authUser' ? authUser : user;
        let id = jwt.verify(req.body.id, process.env.JWT_SECRET);
        model.findByIdAndUpdate(req.user, {
            $addToSet: { student: id },
            $inc: {studenttotal: 1},
            $pull: {request: id}
        }).then(() => {
            return update(id, authUser, user, 'teacher')
        }).catch(err =>{
            res.status(500).send(err);
        });
        return
    }

    if (req.header && req.header('data-categ') === 'rejUser') {
        let model = req.userType === 'authUser' ? authUser : user;
        let id = jwt.verify(req.body.id, process.env.JWT_SECRET);
        model.findByIdAndUpdate(req.user, {
            $pull: {request: id}
        }).then(() => {
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
        let id = jwt.verify(req.body.id, process.env.JWT_SECRET);
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
        return
    }

    if (req.header && req.header('data-categ') === 'unfriend') {
        let model = req.userType === 'authUser' ? authUser : user;
        let id = jwt.verify(req.body.id, process.env.JWT_SECRET);
        model.findById(req.user).then((result) => {
            let filterStudent = result.student ? result.student.filter(studentID => studentID === id) : [];
            if (filterStudent.length < 1) {
                remove(false, true, model, id);
            } else {
                remove(true, false, model, id);
            }
        })
       
    }

    function remove(isStudent, isTeacher,model, id) {
        let studenttotal = isStudent ? {$inc: {studenttotal: -1}} : {};
        let teacher = isTeacher ? {$inc: {studenttotal: -1}} : {};
        model.findByIdAndUpdate(req.user, {
            $pull: {student: id, teacher: id},
            ...studenttotal,
            multi: true
        }).then(() => {
            let condition = {
                $pull: {student: req.user, teacher: req.user},
                ...teacher,
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

    function update(id, authModel, userModel, field) {
        let condition = {
            $addToSet: { [field]: req.user }
        }
        authModel.findByIdAndUpdate(id, condition).then(result => {
            if (!result) {
                userModel.findByIdAndUpdate(id, condition).then(() => {
                    res.sendStatus(200);
                })
            } else {
                res.sendStatus(200);
            }
        }).catch(err => {
            res.status(400).send(err)
        })
    }
    
});

module.exports = router;
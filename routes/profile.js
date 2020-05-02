const express = require('express');
const router = express.Router();
const {posts, questions, poets, connectStatus, user, authUser} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');

router.get('/user/profile/:id', authenticate, (req, res, next) => {
    if (!req.params.id) {
        res.redirect('/index/user')
        return
    }
    connectStatus.then((result) => {
        res.render('profile');
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/user/profile/:id',authenticate, (req, res,next) => {
    if (!req.params.id) {
        res.redirect('/index/user')
        return
    }

    if (req.header && req.header('data-categ') === 'userdet') {
        user.findById(req.params.id).then(userRes => {
            if (!userRes) {
                authUser.findById(req.params.id).then(authRes => {
                    if (authRes) {
                        updateUser(authRes).then(authDet => {
                            res.status(200).send(authDet);
                        })
                    } else {
                        res.redirect('/user')
                        return
                    }
                })
            } else {
                updateUser(userRes).then(userDet => {
                    res.status(200).send(userDet);
                })
            }
        })
        function updateUser(cnt) {
            return new Promise((resolve, reject) => {
                let model = req.userType === 'authUser' ? authUser : user;
                model.findById(req.user).then(resultFilter =>{
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

                    let id = cnt._id.toHexString();
                    let userDet = {
                        id, 
                        username: cnt.username,
                        image: cnt.image || '',
                        comment: cnt.comment,
                        subjectpost: cnt.subjectpost,
                        subjectque: cnt.subjectque,
                        subjectpoet: cnt.subjectpoet,
                        student: cnt.student,
                        studenttotal: cnt.studenttotal + teacher.length,
                        status: cnt.status,
                        about: cnt.about,
                        offline: cnt.offline,
                        postpub: cnt.postpub,
                        quepub: cnt.quepub,
                        pwtpub: cnt.pwtpub
                    }

                    if (filterReq.length > 0) {
                        userDet['request'] = true
                    }
                    if (filterMainReq.length > 0) {
                        userDet['pending'] = true
                    }
                    if (userTeacherFilter.length > 0 || teacherFilter.length > 0) {
                        userDet['accept'] = true;
                    }
                    if (id === req.user) {
                        userDet['edit'] = true;
                    }
                
                    if (filterBlock.length < 1) {
                        resolve(userDet)
                    } 
                })
            })
        }
        return;
    }

    if (req.header && req.header('data-categ') === 'about') { 
        let model = req.userType === 'authUser' ? authUser : user;
        model.findByIdAndUpdate(req.user, {about: req.body.det}).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return;
    }

    if (req.header && req.header('data-categ') === 'profileImage') { 
        let model = req.userType === 'authUser' ? authUser : user;
        model.findByIdAndUpdate(req.user, {image: req.body.image}).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return;
    }
});

module.exports = router

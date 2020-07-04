const express = require('express');
const router = express.Router();
const { connectStatus, user, authUser, tempFile} = require('../serverDB/serverDB');
let formidable = require('formidable');

let formInit = require('./utility/forminit');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
const authenticate = require('../serverDB/middleware/authenticate');

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
                    let userTeacher = cnt.student || [];
                    let userTeacherFilter = userTeacher.filter(id => id === req.user);
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
                        studenttotal: cnt.student.length + cnt.teacher.length,
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
        formInit(req, formidable).then(form => {
            let imageFile = form.files && form.files.image ? form.files.image : null; 
            if (imageFile) {
                savetemp([], imageFile, req.user).then(tempFileID => {
                    uploadToBucket(imageFile, tempFileID, 'image', 'image', 'image.files').then(image => {
                        if (image && image.length > 0) {
                            let model = req.userType === 'authUser' ? authUser : user;
                            model.findByIdAndUpdate(req.user, {image: `https://wwww.slodge24.com/media/image/${image[0].id}`}).then(() => {
                                tempFile.findByIdAndRemove(tempFileID).then(() => {
                                    res.sendStatus(200);
                                })
                            }).catch(err => {
                                res.status(500).send(err)
                            })
                        } else {
                            res.sendStatus(500)
                        }
                    })
                }).catch(err => {
                    res.status(500).send(err)
                })
            } else {
                res.sendStatus(442);
            }
        })
        return;
    }
});

module.exports = router

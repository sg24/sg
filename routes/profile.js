const express = require('express');
const router = express.Router();
const { connectStatus, user, tempFile} = require('../serverDB/serverDB');
let formidable = require('formidable');

let formInit = require('./utility/forminit');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
let notifications = require('./utility/notifications');
let deleteMedia = require('./utility/deletemedia');
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
            if (userRes) {
                updateUser(userRes).then(userRes => {
                    res.status(200).send(userRes);
                })
            } else {
                Promise.reject('Not  found');
                return
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        function updateUser(cnt) {
            return new Promise((resolve, reject) => {
                let userRequest = cnt.pendingRequest || [];
                let filterReq = userRequest.filter(id => id === req.user)
                let pendingRequest = cnt.request || [];
                let filterPendingReq = pendingRequest.filter(id => id ===  req.user);
                let userBlock = cnt.block || [];
                let filterBlock = userBlock.filter(id => id === cnt._id.toHexString())
                let id = cnt._id.toHexString();
                let userDet = {
                    id, 
                    username: cnt.username,
                    image: cnt.image || '',
                    friend: cnt.friend,
                    friendtotal: cnt.friend.length,
                    status: cnt.status,
                    about: cnt.about,
                    visited: cnt.visited
                }

                if (filterReq.length > 0) {
                    userDet['request'] = true
                }
                if (filterPendingReq.length > 0) {
                    userDet['pending'] = true
                }
                if (id === req.user) {
                    userDet['edit'] = true;
                }
            
                if (filterBlock.length < 1) {
                    resolve(userDet)
                } 
            })
        }
        return;
    }

    if (req.header && req.header('data-categ') === 'about') { 
        user.findByIdAndUpdate(req.user, {about: req.body.det}).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err)
        })
        return;
    }

    if (req.header && req.header('data-categ') === 'username') { 
        user.findByIdAndUpdate(req.user, {username: req.body.username}).then(userInfo => {
            res.sendStatus(200);
            if (userInfo && userInfo.friend && userInfo.friend.length > 0) {
                for (let recieverID of userInfo.friend) {
                    notifications('profileName', recieverID, {userID: req.user}, false);
                }
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return;
    }

    if (req.header && req.header('data-categ') === 'profileImage') { 
        formInit(req, formidable).then(form => {
            let imageFile = form.files && form.files.image ? form.files.image : null;
            if (imageFile) {
                savetemp(imageFile, 'profileImage', req.user).then(tempFileID => {
                    uploadToBucket(imageFile).then(image => {
                        if (image && image.length > 0) {
                            user.findById(req.user).then(userInfo => {
                                Promise.all([userInfo && userInfo.image ? deleteMedia([{id: userInfo.image}], 'image') : Promise.resolve(),
                                    user.findByIdAndUpdate(req.user, {image: image[0].id}),
                                    tempFile.findOneAndUpdate({userID: req.user, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}})]).then(() => {
                                        res.status(200).send(image[0].id);
                                    if (userInfo && userInfo.friend && userInfo.friend.length > 0) {
                                        for (let recieverID of userInfo.friend) {
                                            notifications('profileImage', recieverID, {userID: req.user}, false);
                                        }
                                    }
                                }).catch(err => {
                                    res.status(500).send(err)
                                })
                            })
                        } else {
                            res.sendStatus(500)
                        }
                    })
                })
            } else {
                res.sendStatus(404)
            }
        })
        return;
    }
});

module.exports = router

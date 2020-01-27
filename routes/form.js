const express = require('express');
const multer = require('multer');
const path = require('path');
const {posts, questions, poets,category, tempFile, postnotifies, quenotifies, viewnotifies, pwtnotifies, connectStatus, user, authUser} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let submit = require('./utility/submit');
let editForm = require('./utility/editform');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../tmp'))
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    }
  })

const upload = multer({storage, limits: {
    fieldSize: 16 * 1024 * 1024 * 1024
}});

router.post('/add/post', authenticate, upload.array('video', 1100), (req, res, next) => {
    savetemp(req.files, req.user).then((curFiles) => {
        uploadToBucket(req.files, req.user, curFiles).then(media => {
            let userModel = req.userType === 'authUser' ? authUser : user;
            const content = req.body;
            connectStatus.then((result) => {
                submit(content, posts, media, postnotifies, viewnotifies, userModel, req.user, 'postID', 'subjectpost', 'post', 'postpub', res, category).then(id =>
                    res.status(201).send(id)
                ).catch(err => {
                    console.log(err)
                    res.status(500).send(err)
                })
            }).catch(err => {
                console.log(err)
                res.status(500).send(err);
            })
        })
    })
})

router.post('/edit/post', authenticate, upload.array('video', 1100),(req, res, next) => {
    let userModel = req.userType === 'authUser' ? authUser : user;
    const content = req.body;
    connectStatus.then((result) => {
        editForm(content, posts, req.files, postnotifies, userModel, req.user, 'postID', 'subjectpost', 'post', res, category).then(id => {
            res.status(201).send(id)
        }).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/add/question', authenticate, upload.array('video', 1100),(req, res, next) => {
    let userModel = req.userType === 'authUser' ? authUser : user;
    const content = req.body;
    connectStatus.then((result) => {
        submit(content, questions,req.files, quenotifies, viewnotifies, userModel, req.user, 'queID', 'subjectque', 'question', 'quepub', res, category).then(id =>
            res.status(201).send(id)
        ).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/edit/question', authenticate, upload.array('video', 1100),(req, res, next) => {
    let userModel = req.userType === 'authUser' ? authUser : user;
    const content = req.body;
    connectStatus.then((result) => {
        editForm(content, questions, req.files, quenotifies, userModel, req.user, 'queID', 'subjectque', 'question', res, category).then(id => {
            res.status(201).send(id)
        }).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/add/poet', authenticate, upload.array('video', 1100),(req, res, next) => {
    let userModel = req.userType === 'authUser' ? authUser : user;
    const content = req.body;
    connectStatus.then((result) => {
        submit(content, poets,req.files, pwtnotifies, viewnotifies, userModel, req.user, 'pwtID', 'subjectpoet', 'poet', 'pwtpub', res, category).then(id =>
            res.status(201).send(id)
        ).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/edit/poet', authenticate, upload.array('video', 1100),(req, res, next) => {
    let userModel = req.userType === 'authUser' ? authUser : user;
    const content = req.body;
    connectStatus.then((result) => {
        editForm(content, poets, req.files, pwtnotifies, userModel, req.user, 'pwtID', 'subjectpoet', 'poet', res, category).then(id => {
            res.status(201).send(id)
        }).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

module.exports = router

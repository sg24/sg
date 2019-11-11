const express = require('express');
const multer = require('multer');
const {posts, questions, poets,category, postnotifies, quenotifies, pwtnotifies, connectStatus, storage} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let submit = require('./utility/submit');
const router = express.Router();
const upload = multer({ storage, limits: {
    fieldSize: 16 * 1024 * 1024 * 1024
}});

router.post('/add/post', authenticate, upload.array('video', 1100),(req, res, next) => {
    const content = req.body;
    connectStatus.then((result) => {
        submit(content, posts,req.files, postnotifies, 'post', res, category).then(id =>
            res.status(201).send(id)
        ).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/add/question', authenticate, upload.array('video', 1100),(req, res, next) => {
    const content = req.body;
    connectStatus.then((result) => {
        submit(content, questions,req.files, quenotifies, 'question', res, category).then(id =>
            res.status(201).send(id)
        ).catch(err => {
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/add/poet', authenticate, upload.array('video', 1100),(req, res, next) => {
    const content = req.body;
    connectStatus.then((result) => {
        submit(content, poets,req.files, pwtnotifies, 'poet', res, category).then(id =>
            res.status(201).send(id)
        ).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

module.exports = router

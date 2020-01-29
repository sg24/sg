const express = require('express');
const path = require('path');
const {posts, questions, poets,category, tempFile, postnotifies, quenotifies, viewnotifies, pwtnotifies, connectStatus, user, authUser} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let formInit = require('./utility/forminit');
let submit = require('./utility/submit');
let editForm = require('./utility/editform');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
const router = express.Router();
let formidable = require('formidable');

router.post('/add/post', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        savetemp(video, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID).then(media => {
                let userModel = req.userType === 'authUser' ? authUser : user;
                const content = form.fields;
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
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/post', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        savetemp(video, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID).then(media => {
                let userModel = req.userType === 'authUser' ? authUser : user;
                const content = form.fields;
                connectStatus.then((result) => {
                    editForm(content, posts, media, postnotifies, userModel, req.user, 'postID', 'subjectpost', 'post', res, category).then(id => {
                        res.status(201).send(id)
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/add/question', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        savetemp(video, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID).then(media => {
                let userModel = req.userType === 'authUser' ? authUser : user;
                const content = form.fields;
                connectStatus.then((result) => {
                    submit(content, questions, media, quenotifies, viewnotifies, userModel, req.user, 'queID', 'subjectque', 'question', 'quepub', res, category).then(id =>
                        res.status(201).send(id)
                    ).catch(err => {
                        res.status(500).send(err)
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/question', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        savetemp(video, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID).then(media => {
                let userModel = req.userType === 'authUser' ? authUser : user;
                const content = form.fields;
                connectStatus.then((result) => {
                    editForm(content, questions, media, quenotifies, userModel, req.user, 'queID', 'subjectque', 'question', res, category).then(id => {
                        res.status(201).send(id)
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/poet', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        savetemp(video, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID).then(media => {
                let userModel = req.userType === 'authUser' ? authUser : user;
                const content = form.fields;
                connectStatus.then((result) => {
                    submit(content, poets,media, pwtnotifies, viewnotifies, userModel, req.user, 'pwtID', 'subjectpoet', 'poet', 'pwtpub', res, category).then(id =>
                        res.status(201).send(id)
                    ).catch(err => {
                        res.status(500).send(err)
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/poet', authenticate,(req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        savetemp(video, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID).then(media => {
                let userModel = req.userType === 'authUser' ? authUser : user;
                const content = form.fields;
                connectStatus.then((result) => {
                    editForm(content, poets, media, pwtnotifies, userModel, req.user, 'pwtID', 'subjectpoet', 'poet', res, category).then(id => {
                        res.status(201).send(id)
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router

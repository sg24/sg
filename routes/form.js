const express = require('express');
const multer = require('multer');
const {posts, questions, category, postnotifies, connectStatus, storage} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
const router = express.Router();
const upload = multer({ storage, limits: {
    fieldSize: 16 * 1024 * 1024 * 1024
}});

router.post('/add/post', authenticate, upload.array('video', 1100),(req, res, next) => {
    const content = req.body;
    connectStatus.then((result) => {
        let postCategRaw = String(content.categ).split(',');
        let postCateg = [...new Set(postCategRaw)];
        let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
        let postID = null;
        let fileID = [];

        for( let file of req.files) {
            fileID.push({id: file.id, type: file.contentType, snapshotID: file.filename});
        }

        let newPost = new posts({
            authorID: Date.now(),
            category: postCateg,
            postVideo: fileID,
            postImage: content.image,
            shareMe,
            title: content.title,
            desc: content.desc,
            mode: content.mode,
            snapshot: content.snapshot !== undefined ? JSON.parse(content.snapshot) : []
        }); 

        newPost.save().then(result => {
            postID = result._id;

            function notification() {
                notifications(shareMe).then(() =>{
                    posts.findByIdAndUpdate(postID, {_isCompleted: true}).then(() => {
                        res.status(201).send(postID);
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }

            category.countDocuments({}).then((result) => {
                if ( result < 1) { 
                    let newCateg = new category({
                        post: postCateg
                    });
                    newCateg.save().then(() => {
                        if (shareMe.length > 0) {
                           notification();
                        } else {
                            res.status(201).send(postID);
                        }
                    }).catch(err => {
                        res.status(500).send(err);
                    });
                    return 
                }
                category.findOneAndUpdate({}, {$addToSet: { post: { $each: postCateg } }}).then(() => {
                    if (shareMe.length > 0) {
                        notification();
                    } else {
                        res.status(201).send(postID);
                    }
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.post('/add/question', authenticate, upload.array('video', 1100),(req, res, next) => {
    const content = req.body;
    connectStatus.then((result) => {
        let categRaw = String(content.categ).split(',');
        let categ = [...new Set(categRaw)];
        let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
        let id = null;
        let fileID = [];

        for( let file of req.files) {
            fileID.push({id: file.id, type: file.contentType, snapshotID: file.filename});
        }

        let newDoc = new questions({
            authorID: Date.now(),
            category: categ,
            video: fileID,
            image: content.image,
            shareMe,
            desc: content.desc,
            mode: content.mode,
            snapshot: content.snapshot !== undefined ? JSON.parse(content.snapshot) : []
        }); 

        newDoc.save().then(result => {
            id = result._id;

            function notification() {
                notifications(shareMe).then(() =>{
                    questions.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                        res.status(201).send(id);
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err)
                })
            }

            category.countDocuments({}).then((result) => {
                if ( result < 1) { 
                    let newCateg = new category({
                        question: categ
                    });
                    newCateg.save().then(() => {
                        if (shareMe.length > 0) {
                           notification();
                        } else {
                            res.status(201).send(id);
                        }
                    }).catch(err => {
                        res.status(500).send(err);
                    });
                    return 
                }
                category.findOneAndUpdate({}, {$addToSet: { question: { $each: categ } }}).then(() => {
                    if (shareMe.length > 0) {
                        notification();
                    } else {
                        res.status(201).send(id);
                    }
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })

})

module.exports = router

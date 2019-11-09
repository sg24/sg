const express = require('express');
const multer = require('multer');
const {posts, category, postnotifies, connectStatus, storage} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
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
                let i = 0;
                for (let userID of shareMe) {
                    postnotifies.findOne({userID}).then(result => {
                        if (result !== null) {
                            postnotifies.findOneAndUpdate({userID}, {$inc: {'notifications': 1}}).then(result =>{
                                if(++i === shareMe.length) {
                                    posts.findByIdAndUpdate(postID, {_isCompleted: true}).then(() => {
                                        res.status(201).send(postID);
                                    }).catch(err => {
                                        res.status(500).send(err);
                                    })
                                }
                            })
                        } else {
                            let newPostnotify = new postnotifies({
                                userID,
                                notifications: 1
                            });
                            newPostnotify.save().then(() => {
                                if(++i === shareMe.length) {
                                    posts.findByIdAndUpdate(postID, {_isCompleted: true}).then(() => {
                                        res.status(201).send(postID);
                                    }).catch(err => {
                                        res.status(500).send(err);
                                    })
                                }
                            })
                        } 
                        
                    })
                }
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

module.exports = router

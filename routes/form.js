const express = require('express');
const multer = require('multer');
const {posts, category, connectStatus, storage} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
const router = express.Router();
const upload = multer({ storage });

router.post('/add/post', authenticate, upload.array('media', 1100),(req, res, next) => {
    const content = req.body;
    connectStatus.then((result) => {
        let postCategRaw = String(content.categ).split(',');
        let postCateg = [...new Set(postCategRaw)];
        let shareMe = String(content.shareMe).split(',');
        let postID = null;
        let fileID = [];
        
        for( let file of req.files) {
            fileID.push(file.id);
        }

        let newPost = new posts({
            authorID: Date.now(),
            category: postCateg,
            mediaID: fileID,
            shareMe: content.shareMe !== '' ? shareMe : [],
            title: content.title,
            desc: content.desc,
            mode: content.mode
        }); 

        newPost.save().then(result => {
            postID = result._id;

            category.countDocuments({}).then((result) => {
                if ( result < 1) { 
                    let newCateg = new category({
                        posts: postCateg
                    });
                    newCateg.save().then(() => {
                        posts.findByIdAndUpdate(postID, {_isCompleted: true}).then(() => {
                            res.status(201).send(postID);
                        }).catch(err => {
                            res.status(500).send(err);
                        })  
                    }).catch(err => {
                        res.status(500).send(err);
                    });
                    return 
                }
                category.findOneAndUpdate({}, {$addToSet: { posts: { $each: postCateg } }}).then(() => {
                    posts.findByIdAndUpdate(postID, {_isCompleted: true}).then(() => {
                        res.status(201).send(postID);
                    }).catch(err => {
                        res.status(500).send(err);
                    })
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

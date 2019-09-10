let express = require('express');
let router = express.Router();
let authenticate = require('../serverDB/middleware/authenticate');

router.post('/add/post', authenticate, (req, res, next) => {
    const {posts, category, media, connectStatus} = require('../serverDB/serverDB');
    const content = req.body;
    
    connectStatus.then(() => {
        if (content.mediaType === 'image' || content.mediaType === 'video') {
            let newMedia = new media({
                media: {
                    mediaType: content.mediaType,
                    mediaID: content.mediaID,
                    data: content.data
                }
            })
            newMedia.save().then(() => {
                res.sendStatus(201)
            }).catch(() => {
                res.sendStatus(500)
            });
            return
        }
    
        let newPost = new posts({
            authorID: Date.now(),
            category: content.categ,
            mediaID: content.mediaID,
            shareMe: content.shareMe,
            title: content.title,
            desc: content.desc,
        }); 
    
        newPost.save().then(result => {
            res.send(result._id)
        }).catch(err => {
            res.sendStatus(500)
        })
    
        category.countDocuments({}).then((result) => {
            if ( result < 1) { 
                let newCateg = new category({
                    posts: content.categ
                });
                newCateg.save();
                return 
            }
            category.findOneAndUpdate({}, {$addToSet: { posts: { $each: content.categ } }})
            .catch(err => {
                res.sendStatus(500)
            })
        })
    }).catch(err => {
        res.sendStatus(500);
    })
    
})

module.exports = router

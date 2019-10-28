let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let authenticate = require('../serverDB/middleware/authenticate');
const {category, posts, connectStatus} = require('../serverDB/serverDB');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/view', (req, res, next) => {
    res.render('view');
});

router.get('/post',(req, res, next) => {
    if (req.header('data-categ') === 'post') {
        connectStatus.then(() => {
            let limit;
            let curLimit = parseInt(req.header('limit'));
            if ( curLimit >= 1200) {
                limit = 6
            } else if( curLimit >= 900) {
                limit = 4;
            } else if( curLimit >= 500) {
                limit = 3
            } else {
                limit = 2;
            }
            posts.find({}).sort({postCreated: -1}).limit(limit).then(result => {
                res.send(result).status(200)
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
        return;
    }
    
    res.render('post');
});

router.get('/media', authenticate, (req, res, next) => {
    connectStatus.then(() => {
        let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'media'
        });
        
        if (req.header('data-categ') === 'media') {
            let mediaID = req.header('mediaID');
            let media = bucket.openDownloadStream(mongoose.mongo.ObjectId(mediaID));
            let base64data = '';
            
            media.on('data', function(media) {
                base64data += Buffer.from(media, 'binary').toString('base64');
            });
            
            media.on('end', function() {
                let mediaDataUrl = 'data:' + 'video/mp4' + ';base64,' +  base64data;
                return res.send(mediaDataUrl).status(200)
            });

            media.on('error', function(err) {
                return res.status(500).send(err)
            });
        }
        return
    }).catch(err => {
        res.sendStatus(500);
    })
})

router.get('/poet&writer', (req, res, next) => {
    res.render('poetwriter');
});

router.get('/group', (req, res, next) => {
    res.render('group');
});


router.get('/question', (req, res, next) => {
    res.render('question');
});

router.get('/onlineexam', (req, res, next) => {
    res.render('onlineexam');
});

router.get('/chat', (req, res, next) => {
    res.render('groupchat');
});

router.get('/community', (req, res, next) => {
    res.render('community');
});

router.get('/conversations', (req, res, next) => {
    res.render('conv');
});

router.get('/add/question', (req, res, next) => {
    res.render('queform');
});

router.get('/add/post', authenticate, (req, res, next) => {
    let isFetchCateg = false;

    if (req.header('data-categ') === 'category') {
        isFetchCateg = true;
        connectStatus.then(() => {
            category.find({}).then(result => {
                res.send(result[0].posts).status(200);
            }).catch(err => {
                let categ = new category();
                categ.save();
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (!isFetchCateg) {
        res.sendStatus(403); 
    }
});

router.get('/add/group', (req, res, next) => {
    res.render('groupform'); 
});

router.get('/add/onlineexam', (req, res, next) => {
    res.render('onlineexamform'); 
});

router.get('/add/poet', (req, res, next) => {
    res.render('poetwriterform'); 
});

router.get('/examtab', (req, res, next) => {
    res.render('examtab');
});

router.get('/users', (req, res, next) => {
    res.render('users');
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});

router.get('/favorite', (req, res, next) => {
    res.render('favorite');
});

router.get('/acc/shared', (req, res, next) => {
    res.render('accshared'); 
});

router.get('/acc/user', (req, res, next) => {
    res.render('accuser'); 
});

router.get('/acc/published', (req, res, next) => {
    res.render('accpub'); 
});

router.get('/acc/draft', (req, res, next) => {
    res.render('accdft'); 
});

router.get('/acc/profile', (req, res, next) => {
    res.render('accprf'); 
});

router.get('/acc/help', (req, res, next) => {
    res.render('acchelp'); 
});

router.get('/acc/set', (req, res, next) => {
    res.render('accset'); 
});

router.get('/login', (req, res, next) => {
    res.render('loginform'); 
});

router.get('/signup', (req, res, next) => {
    res.render('signupform'); 
});

router.get('/signup/profile', (req, res, next) => {
    res.render('signprfform'); 
});

router.get('/forget/password', (req, res, next) => {
    res.render('forgetpwd'); 
});

router.get('/forget/reset', (req, res, next) => {
    res.render('forgetpwd'); 
});

module.exports = router;

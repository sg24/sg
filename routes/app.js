let express = require('express');
let router = express.Router();
let authenticate = require('../serverDB/middleware/authenticate');
const {category, media, posts, connectStatus} = require('../serverDB/serverDB');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/view', (req, res, next) => {
    res.render('view');
});

router.get('/post', authenticate ,(req, res, next) => {
    if (req.header('data-categ') === 'post') {
        connectStatus.then(() => {
            posts.find({}).then(result => {
                res.send(result).status(200)
            }).catch(err => {
                res.send(err).status(500);
            })
        }).catch(err => {
            res.send(err).status(500);
        })
        return;
    }
    
    res.render('post');
});

router.get('/media', authenticate, (req, res, next) => {
    connectStatus.then(() => {
       let mediaID = req.header('data-categ');
       if (mediaID) {
            media.find({mediaID}).then(result => {
                console.log(result.length)
                res.send(result)
            }).catch(err => {
                res.sendStatus(404);
            })
       }
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

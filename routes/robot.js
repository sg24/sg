let express = require('express');
let router = express.Router();
let authenticate = require('../serverDB/middleware/authenticate');
const global = require('../global/global');

router.get('/post', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbpost`, req.params);
});

router.get('/question', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbquestion`, req.params);
});

router.get('/poet', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbpoet`, req.params);
});

router.get('/helpme', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbhelpme`, req.params);
});

router.get('/signup', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbsignup`, req.params);
});

router.get('/login', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rblogin`, req.params);
});

router.get('/user', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbuser`, req.params);
});

router.get('/add/question', authenticate,(req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/robotonly/add/rbquestion', req.params);
    } else {
        res.redirect('/login')
    }
    
});

router.get('/edit/question/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/robotonly/edit/rbquestion', req.params);
    } else {
        res.redirect('/')
    }
});

router.get('/add/post', authenticate, (req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/robotonly/add/rbpost', req.params);
    } else {
        res.redirect('/login')
    }
    
});

router.get('/edit/post/:id', authenticate, (req, res, next) => {
    console.log(req.params)
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/robotonly/edit/rbpost', req.params);
    } else {
        res.redirect('/')
    }
});

// router.get('/add/group', (req, res, next) => {
//     res.render('groupform'); 
// });

// router.get('/add/onlineexam', (req, res, next) => {
//     res.render('onlineexamform'); 
// });

router.get('/add/poet', authenticate, (req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/robotonly/add/rbpoet', req.params);
    } else {
        res.redirect('/login')
    }
});

router.get('/edit/poet/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/robotonly/edit/rbpoet', req.params); 
    } else {
        res.redirect('/')
    }
});

router.get('/view/:categ/:id', authenticate, (req, res, next) => {
    if (req.params && req.params.id && req.params.categ) { 
        global.app.render(req, res, '/robotonly/rbview', req.params); 
    } else {
        res.redirect('/')
    }
});

module.exports = router;
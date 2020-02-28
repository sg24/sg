let express = require('express');
let router = express.Router();
let authenticate = require('../serverDB/middleware/authenticate');
const global = require('../global/global');

router.get('/rbpt', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbpt`, req.params);
});

router.get('/rbquestion', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbquestion`, req.params);
});

router.get('/rbpoet', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbpoet`, req.params);
});

router.get('/rbhelpme', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbhelpme`, req.params);
});

router.get('/rbsignup', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbsignup`, req.params);
});

router.get('/rblogin', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rblogin`, req.params);
});

router.get('/rbuser', authenticate,function (req, res, next) {
    global.app.render(req, res, `/robotonly/rbuser`, req.params);
});

router.get('/add/rbquestion', authenticate,(req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/robotonly/add/rbquestion', req.params);
    } else {
        res.redirect('/login')
    }
    
});

router.get('/edit/rbquestion/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/robotonly/edit/rbquestion', req.params);
    } else {
        res.redirect('/')
    }
});

router.get('/add/rbpost', authenticate, (req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/robotonly/add/rbpost', req.params);
    } else {
        res.redirect('/login')
    }
    
});

router.get('/edit/rbpost/:id', authenticate, (req, res, next) => {
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

router.get('/add/rbpoet', authenticate, (req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/robotonly/add/rbpoet', req.params);
    } else {
        res.redirect('/login')
    }
});

router.get('/edit/rbpoet/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/robotonly/edit/rbpoet', req.params); 
    } else {
        res.redirect('/')
    }
});

router.get('/rbview/:categ/:id', authenticate, (req, res, next) => {
    if (req.params && req.params.id && req.params.categ) { 
        global.app.render(req, res, '/robotonly/rbview', req.params); 
    } else {
        res.redirect('/')
    }
});

module.exports = router;
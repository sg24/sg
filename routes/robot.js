let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let authenticate = require('../serverDB/middleware/authenticate');
const nodemailer = require('nodemailer');
let passport = require('passport');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const fetchCnt = require('./utility/fetchcnt');
let filterCnt = require('./utility/filtercnt');
let deleteMedia = require('./utility/deletemedia');
let userFilter = require('./utility/userfilter');
let notification = require('./utility/notifications');
let push = require('./utility/push');
const global = require('../global/global');
const {category,  posts, questions, poets, user, tempUser, postnotifies, 
    authUser, quenotifies, pwtnotifies, viewnotifies, usernotifies,
    favorite, connectStatus} = require('../serverDB/serverDB');

router.get('/post', authenticate,function (req, res, next) {
    global.app.render(req, res, `/post`, req.params);
});

router.get('/question', authenticate,function (req, res, next) {
    global.app.render(req, res, `/question`, req.params);
});

router.get('/poet', authenticate,function (req, res, next) {
    global.app.render(req, res, `/poet`, req.params);
});

router.get('/helpme', authenticate,function (req, res, next) {
    global.app.render(req, res, `/helpme`, req.params);
});

router.get('/signup', authenticate,function (req, res, next) {
    global.app.render(req, res, `/signup`, req.params);
});

router.get('/login', authenticate,function (req, res, next) {
    global.app.render(req, res, `/login`, req.params);
});

router.get('/user', authenticate,function (req, res, next) {
    global.app.render(req, res, `/user`, req.params);
});

router.get('/add/question', authenticate,(req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/add/question', req.params);
    } else {
        res.redirect('/login')
    }
    
});

router.get('/edit/question/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/edit/question', req.params);
    } else {
        res.redirect('/')
    }
});

router.get('/add/post', authenticate, (req, res, next) => {
    if (!req.authType) {
        global.app.render(req, res, '/add/post', req.params);
    } else {
        res.redirect('/login')
    }
    
});

router.get('/edit/post/:id', authenticate, (req, res, next) => {
    console.log(req.params)
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/edit/post', req.params);
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
        global.app.render(req, res, '/add/poet', req.params);
    } else {
        res.redirect('/login')
    }
});

router.get('/edit/poet/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        global.app.render(req, res, '/edit/poet', req.params); 
    } else {
        res.redirect('/')
    }
});

router.get('/view/:categ/:id', authenticate, (req, res, next) => {
    if (req.params && req.params.id && req.params.categ) { 
        global.app.render(req, res, '/view', req.params); 
    } else {
        res.redirect('/')
    }
});

module.exports = router;
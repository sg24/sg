var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/view', (req, res, next) => {
    res.render('view');
});

router.get('/post', (req, res, next) => {
    res.render('post');
});

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

router.get('/privatechat', (req, res, next) => {
    res.render('privatechat');
});

router.get('/add/question', (req, res, next) => {
    res.render('formQue');
});

router.get('/add/post', (req, res, next) => {
    res.render('formPost'); 
});

router.get('/examtab', (req, res, next) => {
    res.render('examtab');
});
module.exports = router;

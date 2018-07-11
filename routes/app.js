var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/view', (req, res, next) => {
    res.render('view');
});

router.get('/question', (req, res, next) => {
    res.render('question');
});

router.get('/post', (req, res, next) => {
    res.render('post');
});

router.get('/community', (req, res, next) => {
    res.render('community');
});


module.exports = router;

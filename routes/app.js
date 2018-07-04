var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/view', (req, res, next) => {
    res.render('view');
});

module.exports = router;

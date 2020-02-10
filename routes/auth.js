const express = require('express');
const router = express.Router();
const passport = require('passport');
let authenticate = require('../serverDB/middleware/authenticate');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}))

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/login', failureFlash: false, session: false }), (req, res,next) => {
    let decoded = null;
    decoded = jwt.verify(req.user.token, process.env.JWT_SECRET);
    if (decoded) {
        res.cookie('token', req.user.token, { signed: true, httpOnly: true , maxAge: 7257600000});
        res.cookie('expiresIn', decoded.exp, {maxAge: 7257600000});
        res.cookie('pushMsg', req.user.pushMsg, {maxAge: 7257600000});
        res.cookie('id', req.user.id, {maxAge: 7257600000});
        res.redirect('/');
    }
});

router.get('/facebook',
passport.authenticate('facebook'));

router.get('/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login', failureFlash: false, session: false  }),(req, res) => {
    let decoded = null;
    decoded = jwt.verify(req.user.token, process.env.JWT_SECRET);
    if (decoded) {
        res.cookie('token', req.user.token, { signed: true, httpOnly: true , maxAge: 7257600000});
        res.cookie('expiresIn', decoded.exp, {maxAge: 7257600000});
        res.cookie('pushMsg', req.user.pushMsg, {maxAge: 7257600000});
        res.cookie('id', req.user.id, {maxAge: 7257600000});
        res.redirect('/');
    }
});

router.get('/verify', authenticate, (req,res,next) =>{
    res.sendStatus(200)
});

router.get('/logout', (req,res,next) =>{
    res.cookie('token', null);
    res.cookie('expiresIn', null);
    res.cookie('pushMsg', null);
    res.cookie('id', null);
    req.logout()
    res.redirect('/login')
})

module.exports = router

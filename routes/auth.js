const express = require('express');
const router = express.Router();
const passport = require('passport');
let authenticate = require('../serverDB/middleware/authenticate');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}))

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res,next) => {
    let decoded = null;
    decoded = jwt.verify(req.user, process.env.JWT_SECRET);
    if (decoded) {
        res.cookie('token', req.user, { signed: true, httpOnly: true , maxAge: 604800000});
        res.cookie('expiresIn', decoded.exp, {maxAge: 604800000});
        res.redirect('/');
    }
});

router.get('/facebook',
passport.authenticate('facebook'));

router.get('/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login', session: false  }),(req, res) => {
    let decoded = null;
    decoded = jwt.verify(req.user, process.env.JWT_SECRET);
    if (decoded) {
        res.cookie('token', req.user, { signed: true, httpOnly: true , maxAge: 604800000});
        res.cookie('expiresIn', decoded.exp, {maxAge: 604800000});
        res.redirect('/');
    }
});

router.get('/verify', authenticate, (req,res,next) =>{
    res.sendStatus(200)
});

router.get('/logout', (req,res,next) =>{
    req.logout()
    res.redirect('/login')
})

module.exports = router

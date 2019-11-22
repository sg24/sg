const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}))

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res,next) => {
    res.cookie('token', req.user, { signed: true, httpOnly: true });
    res.redirect('/post');
});

router.get('/verify', (req,res,next) =>{
    console.log(req.user)
});

router.get('/logout', (req,res,next) =>{
    req.logout()
    res.redirect('/login')
})

module.exports = router

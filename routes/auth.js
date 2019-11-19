const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}))

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }), (req, res,nex) =>{
    res.redirect('/post');
});

router.get('/verify', (req,res,next) =>{
    console.log(req.user)
});

router.get('/logout', (req,res,next) =>{
    req.logout()
    req.flash('You are logged out')
    res.redirect('/login')
})

module.exports = router

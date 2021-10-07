let express = require('express');
let router = express.Router();

router.get('*', (req, res, next) => {
    let redirectURI = req.query;
    if (!redirectURI || typeof redirectURI !== 'object') {
        res.sendStatus(404);
        return
    }
    let updateURL = Object.entries(redirectURI)[0].join('=');
    res.redirect(302, updateURL);
    return
})

module.exports = router
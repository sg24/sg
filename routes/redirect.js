let express = require('express');
let router = express.Router();

router.get('*/**', (req, res, next) => {
    let redirectURI = req.uri;
    if (!redirectURI) {
        res.sendStatus(404);
        return
    }
    let updateURL = redirectURI.split('/').slice(1).join('');
    console.log(updateURL)
    res.redirect(302, updateURL);
    return
})

module.exports = router
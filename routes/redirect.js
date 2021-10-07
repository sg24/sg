let express = require('express');
let router = express.Router();

router.get('/:uri', (req, res, next) => {
    let redirectURI = req.params.uri;
    if (!redirectURI) {
        res.sendStatus(404);
        return
    }
    console.log(redirectURI)
    res.redirect(302, redirectURI)
    return
})

module.exports = router
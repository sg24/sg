const { authUser , user} = require('../serverDB');

let authenticate = (req, res, next) => {
    if (req.signedCookies.token) {
        user.findByToken(req.signedCookies.token).then((result) => {
            if (!result) {
                authUser.findByToken(req.signedCookies.token).then(result => {
                   if (!result) {
                    return Promise.reject();
                   }
                   next();
                })
                return
            }
            next();
        }).catch((e) => {
            res.status(401).send(e);
        });
        return
    }
    res.status(401).send('Your are not authenticated');
}


module.exports = authenticate;
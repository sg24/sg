const { authUser , user} = require('../serverDB');

let authenticate = (req, res, next) => {
    let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVjMzc4ZDBiOTdhZjJhOTBiOGZmNjkiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3NTg1OTQ2NCwiZXhwIjoxNTc2NDY0MjY0fQ.aok8Ap-MQ6P1k9PWxN8WoL7XMc1ICFhihDe6pwmpQpU';
    if (req.signedCookies.token || tempToken) {
        user.findByToken(req.signedCookies.token || tempToken).then((result) => {
            if (!result) {
                authUser.findByToken(req.signedCookies.token || tempToken).then(result => {
                    if (!result) {
                    res.redirect('/login')
                    return Promise.reject();
                   }
                   req.user = result._id.toHexString();
                   req.userType = 'authUser'
                   next();
                })
                return
            }
            req.user = result._id.toHexString();
            req.userType = 'user'
            next();
        }).catch((e) => {
            if (e.name === 'TokenExpiredError') {
                res.redirect('/login')
            }
   
        });
        return
    }
    // res.status(401).send('Your are not authenticated');
    next()
}


module.exports = authenticate;
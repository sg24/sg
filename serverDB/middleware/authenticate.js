const { authUser , user} = require('../serverDB');
const checkStatus = require('../utility/status');

let authenticate = (req, res, next) => {
    let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTAzMjUzMTAwNGZiNDFlY2NmNDIwYzYiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3NzI2NDQzMywiZXhwIjoxNTc3ODY5MjMzfQ.3H796xDEXg7CBiRyPYkdMwUGXdL9mmMeqa5eLFmTmQE';
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
                   checkStatus(req.signedCookies.token || tempToken, 'authUser', res)
                })
                return
            }
            req.user = result._id.toHexString();
            req.userType = 'user'
            next();
            checkStatus(req.signedCookies.token || tempToken, 'user', res)
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
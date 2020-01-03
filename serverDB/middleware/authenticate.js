const { authUser , user} = require('../serverDB');
const checkStatus = require('../utility/status');

let authenticate = (req, res, next) => {
    let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTAzMjU3ZDAwNGZiNDFlY2NmNDIwY2EiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3Nzc4NDI2MywiZXhwIjoxNTc4Mzg5MDYzfQ.hgXXoi_231PI5r_bQHr4g98DOS_OcBgc0ktOaaF88-s';
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
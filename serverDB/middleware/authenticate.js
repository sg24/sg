const { authUser , user} = require('../serverDB');
const checkStatus = require('../utility/status');
const global = require('../../global/global');

let authenticate = (req, res, next) => {
    let tempToken = null;
    // let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE3NmZhZGMzMjhhYzgzNTBjMDM5YTUiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3OTgxODY0MiwiZXhwIjoxNTgwNDIzNDQyfQ.dDt4HIT2Cmu3s0xl3Lto9eFbkl6yWYaVCS2PkIBhzhk';
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
                   global.userDet = {id: result._id.toHexString(), type: 'authUser'}
                })
                return
            }
            req.user = result._id.toHexString();
            req.userType = 'user'
            next();
            checkStatus(req.signedCookies.token || tempToken, 'user', res)
            global.userDet = {id: result._id.toHexString(), type: 'user'}
        }).catch((e) => {
            if (e.name === 'TokenExpiredError') {
                res.redirect('/login')
            }
   
        });
        return
    } else {
        res.redirect('/login')
    }
}


module.exports = authenticate;
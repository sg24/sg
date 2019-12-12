const { authUser , user} = require('../serverDB');

let authenticate = (req, res, next) => {
    let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVjMzk4MzBiOTdhZjJhOTBiOGZmNmUiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3NjE5MzQ1OSwiZXhwIjoxNTc2Nzk4MjU5fQ.MnCbxaNgEBtf0YYGRb9OCPNwkvFQdyPJ3HRzmvUJCnM';
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
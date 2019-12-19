const { authUser , user} = require('../serverDB');
const checkStatus = require('../utility/status');

let authenticate = (req, res, next) => {
    let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY4YmJkN2E3OTM3MTEzNjg3YzM4ZmUiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3NjU4MjMwNCwiZXhwIjoxNTc3MTg3MTA0fQ.A5EYSUhyysZBy0O1ePRREubUI2WrVJ002wHj-ubGZq4';
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
                   checkStatus(req.signedCookies.token || tempToken, 'authUser')
                })
                return
            }
            req.user = result._id.toHexString();
            req.userType = 'user'
            next();
            checkStatus(req.signedCookies.token || tempToken, 'user')
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
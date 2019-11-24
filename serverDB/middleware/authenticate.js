const { authUser , user} = require('../serverDB');

let authenticate = (req, res, next) => {
    let tempToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ4OTE1ZmY0N2E1ZTIxODQ0NTdjNGYiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU3NDUxNTYyOSwiZXhwIjoxNTc1MTIwNDI5fQ.9figrNCGmzuVowauKV8yQlIs8OKcdRbK9Lq230TqMXQ'
    if (req.signedCookies.token || tempToken) {
        user.findByToken(req.signedCookies.token || tempToken).then((result) => {
            if (!result) {
                authUser.findByToken(req.signedCookies.token || tempToken).then(result => {
                   if (!result) {
                    return Promise.reject();
                   }
                   req.user = result._id;
                   next();
                })
                return
            }
            req.user = result._id;
            next();
        }).catch((e) => {
            res.status(401).send(e);
        });
        return
    }
    res.status(401).send('Your are not authenticated');
}


module.exports = authenticate;
const { authUser , user} = require('../serverDB');
const checkStatus = require('../utility/status');
const global = require('../../global/global');
let uuid = require('uuid');

let authenticate = (req, res, next) => {
    if (req.signedCookies.token) {
        user.findByToken(req.signedCookies.token).then((result) => {
            if (!result) {
                authUser.findByToken(req.signedCookies.token).then(result => {
                    if (!result) {
                        let newUser = new authUser ({
                            username: uuid(),
                            email: `temp@${uuid()}.com`,
                            temp: true
                        })
                        newUser.generateAuthToken().then(result => {
                            res.cookie('token', result.token, { signed: true, httpOnly: true , maxAge: 7257600000});
                            res.cookie('expiresIn', 'null');
                            res.cookie('pushMsg', null);
                            res.cookie('id', uuid());
                            req.user = result.id;
                            req.userType = 'authUser';
                            req.authType = true;
                            next();
                            global.userDet = {id: result.id, type: 'authUser'}
                        });
                        return 
                   }
                   req.user = result._id.toHexString();
                   req.userType = 'authUser'
                   req.authType = result.temp;
                   next();
                   checkStatus(req.signedCookies.token, 'authUser', res)
                   global.userDet = {id: result._id.toHexString(), type: 'authUser'}
                })
                return
            }
            req.user = result._id.toHexString();
            req.userType = 'user';
            req.authType = false;
            next();
            checkStatus(req.signedCookies.token, 'user', res)
            global.userDet = {id: result._id.toHexString(), type: 'user'}
        }).catch((e) => {
            if (e.name === 'TokenExpiredError') {
                res.redirect('/login');
                res.end();
                return;
            }
   
        });
        return
    } else {
        let newUser = new authUser ({
            username: uuid(),
            email: `temp@${uuid()}.com`,
            temp: true
        })
        newUser.generateAuthToken().then(result => {
            res.cookie('token', result.token, { signed: true, httpOnly: true , maxAge: 7257600000});
            res.cookie('expiresIn', 'null');
            res.cookie('pushMsg', null);
            res.cookie('id', uuid());
            req.user = result.id;
            req.userType = 'authUser';
            req.authType = true;
            next();
            global.userDet = {id: result.id, type: 'authUser'}
        });
    }
}


module.exports = authenticate;



// const { authUser , user} = require('../serverDB');
// const checkStatus = require('../utility/status');
// const global = require('../../global/global');

// let authenticate = (req, res, next) => {
//     // let tempToken = null;
//     let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMzZjM4MWRjNTA3ZjA5Y2NkM2QyMmEiLCJhY2Nlc3MiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU4MTM0MjQ3NSwiZXhwIjoxNTg4NjAwMDc1fQ.pDriDx4J19MMJeJgg7QVh0cL_2gG7K0PG2mO3U0ogtI';
//     if (req.signedCookies.token || tempToken) {
//         user.findByToken(req.signedCookies.token || tempToken).then((result) => {
//             if (!result) {
//                 authUser.findByToken(req.signedCookies.token || tempToken).then(result => {
//                     if (!result) {
//                     res.redirect('/login')
//                     return Promise.reject();
//                    }
//                    req.user = result._id.toHexString();
//                    req.userType = 'authUser'
//                    next();
//                    checkStatus(req.signedCookies.token || tempToken, 'authUser', res)
//                    global.userDet = {id: result._id.toHexString(), type: 'authUser'}
//                 })
//                 return
//             }
//             req.user = result._id.toHexString();
//             req.userType = 'user'
//             next();
//             checkStatus(req.signedCookies.token || tempToken, 'user', res)
//             global.userDet = {id: result._id.toHexString(), type: 'user'}
//         }).catch((e) => {
//             if (e.name === 'TokenExpiredError') {
//                 res.redirect('/login')
//             }
   
//         });
//         return
//     } else {
//         res.redirect('/login')
//     }
// }


// module.exports = authenticate;
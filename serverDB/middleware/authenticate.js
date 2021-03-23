const { user} = require('../serverDB');
const checkStatus = require('../utility/status');
// const global = require('../../global/global');

let authenticate = async (req, res, next) => {
    // req.signedCookies.token
    let token = req.header('authorization');
    if (token && token !== 'null') {
        user.findByToken(token).then((result) => {
            if (!result) {
                res.sendStatus(401);
                res.end();
                return
            }
            req.user = result._id.toHexString();
            req.username = result.username;
            req.userImage = result.image
            req.friend = result.friend;
            req.chat = result.chat;
            next();
            // global.userDet = {id: result._id.toHexString(), type: 'user'}
        }).catch((e) => {
            if (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError') {
                res.sendStatus(401);
                res.end();
                return;
            }
        });
        return
    } else {
        res.sendStatus(401);
        res.end();
        return;
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
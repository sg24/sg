var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('authentication');
        console.log(req.isAuthenticated())
        // User.findByToken(token).then((user) => {
        //     if (!user) {
        //         return Promise.reject();
        //     }
            
        //     req.user = user;
        //     req.token = token;
        //     next();
        // }).catch((e) => {
        //     res.status(401).send();
        // });
        next()
}


module.exports = authenticate;
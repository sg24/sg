var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
        if (req.isAuthenticated) {
            
        }
        next()
}


module.exports = authenticate;
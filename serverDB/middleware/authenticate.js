
let authenticate = (req, res, next) => {
    // if (req.header('authorization') === 'auth') {
    //     next();
    //     return
    // }
    // res.sendStatus(403);
    // res.end();
    next()
}

module.exports = authenticate;
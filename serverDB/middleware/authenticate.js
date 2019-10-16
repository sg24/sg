
let authenticate = (req, res, next) => {
    if (req.header('authorization') === 'authorization') {
        next();
        return
    }
    res.sendStatus(401);
    res.end();
}

module.exports = authenticate;
const jwt = require('jsonwebtoken');
const { authUser , user} = require('../serverDB');

module.exports =  checkStatus = (token, modelType, res) => {
    let decoded = null;
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    let oldDate = new Date((decoded.exp * 1000)).getTime();
    let newDate = new Date().getTime();
    let expire = (oldDate - newDate)/(1000*3600*24);
    let model = modelType === 'authUser' ? authUser : user;
    if ((oldDate > newDate) && expire < 1) {
        let access = 'authentication';
        let newToken = jwt.sign({_id: decoded._id, access}, process.env.JWT_SECRET, { expiresIn: 3600*24*7}).toString();
        let tokens = [{access, token: newToken}];
        model.findByIdAndUpdate(decoded._id, {tokens}).then(result => {
            let updateCookie = jwt.verify(newToken, process.env.JWT_SECRET);
            if (updateCookie) {
                res.cookie('token', newToken, { signed: true, httpOnly: true , maxAge: 604800000});
                res.cookie('expiresIn', updateCookie.exp, {maxAge: 604800000});
                res.cookie('pushMsg', result.pushMsg[0].publickey, {maxAge: 604800000});
            }
        }).catch(err => err)
    }

    let statustoken = jwt.sign({_id: decoded._id}, process.env.JWT_SECRET, { expiresIn: 60}).toString();
    model.findByIdAndUpdate(decoded._id, {statustoken, status: true}).then(() => {
        checkStatus();
        function checkStatus() {
            let check = setInterval(() => {
                let isExpire = true;
                model.findById(decoded._id).then(result => {
                    jwt.verify(result.statustoken, process.env.JWT_SECRET);
                }).catch(err => {
                    model.findByIdAndUpdate(decoded._id, {status: false, offline: Date.now()}).then(() => {
                        clearInterval(check);
                    });
                    clearInterval(check);
                })
            }, 30000) 
        }

    });
}


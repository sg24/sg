let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let authenticate = require('../serverDB/middleware/authenticate');
const nodemailer = require('nodemailer');
let passport = require('passport');
const bcrypt = require('bcryptjs');
const fetchCnt = require('./utility/fetchCnt');
let filterCnt = require('./utility/filtercnt');
let userFilter = require('./utility/userfilter');
let notification = require('./utility/notifications');
const {category,  posts, questions, poets, user, tempUser, postnotifies, 
     authUser, quenotifies, pwtnotifies, viewnotifies, usernotifies,
     favorite, connectStatus} = require('../serverDB/serverDB');

router.get('/', authenticate,function (req, res, next) {
    res.redirect('/index/post')
});

router.get('/index/:id', authenticate,function (req, res, next) {
    res.render('index');
});

router.post('/header', authenticate, (req, res, next) => {
    if(req.header('data-categ') === 'headerfilter') {
        checkText(req.body.filterCnt, posts, [], 'post').then(ptArray => {
            checkText(req.body.filterCnt, questions, ptArray, 'question').then(queArray => {
                checkText(req.body.filterCnt, poets, queArray, 'poet').then(filterArray => {
                    res.send(filterArray).status(200);
                });
            });
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    function checkText(searchCnt, collection, filterRes, grp) {
        return new Promise((resolve, reject) => {
            collection.find({$text: { $search: searchCnt },mode: 'publish',_isCompleted: true}).then(result => {
                for (let filter of result) {
                    filterRes.push({id: filter._id, grp, title: filter.title})
                }
                resolve(filterRes)
            }).catch(err => {
                reject(err)
            })
        });
    }

    if(req.header('data-categ') === 'notification') {
        checkActive(req.user, postnotifies, 0).then(ptActive => {
            checkActive(req.user, quenotifies, ptActive).then(queActive => {
                checkActive(req.user, pwtnotifies, queActive).then(active => {
                    res.send(new String(active)).status(200);
                })
            })
        }).catch(err =>{
            res.status(500).send(err)
        })
        return ;
    }

    if(req.header('data-categ') === 'allnotification') {
        viewnotifies.findOne({userID: req.user}).then(result => {
            if (result) {
                checkAllNotifies(posts, 'post', {postCreated: -1}, result.post,  {coll: [], collTotal: 0}).then(ptNotify  => {
                    checkAllNotifies(questions, 'question', {queCreated: -1}, result.question, ptNotify).then(queNotify => {
                        checkAllNotifies(poets, 'poets', {pwtCreated: -1}, result.poet, queNotify).then(totalNotify  => {
                            res.status(200).send(totalNotify);
                        })
                    })
                })
                return
            }
            let newViewNotifies = new viewnotifies({
                userID: req.user
            })
            newViewNotifies.save().then(result => {
                checkAllNotifies(posts, 'post',{postCreated: -1}, 0, {coll: [], collTotal: 0}).then(ptNotify  => {
                    checkAllNotifies(questions, 'question', {queCreated: -1}, 0, ptNotify).then(queNotify => {
                        checkAllNotifies(poets, 'poets', {pwtCreated: -1}, 0, queNotify).then(totalNotify  => {
                            res.status(200).send(totalNotify);
                        })
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            })
        })
        return ;
    }

    if(req.header('data-categ') === 'resetnotification') {
        modelTotal(posts, 'post', {}).then(ptTotal => {
            modelTotal(questions, 'question', ptTotal).then(queTotal => {
                modelTotal(poets, 'poet', queTotal).then(allTotal => {
                    viewnotifies.findOneAndUpdate({userID: req.user}, {
                        post: allTotal.post,
                        question: allTotal.question,
                        poet: allTotal.poet
                    }).then(result => {
                        res.sendStatus(200);
                    })
                })
            })
        }).catch(err => {
            res.status(400).send(err)
        })
        function modelTotal(model, field, modelTotal) {
            return new Promise((resolve, reject) => {
                model.countDocuments({}).then(total => {
                    modelTotal[field] = total ? total : 0;
                    resolve(modelTotal);
                }).catch(err => {
                    reject(err);
                })
            })
        }
        return
    }

    function checkAllNotifies(model, modelType, sort, viewTotal, notify) {
        return new Promise((resolve, reject) => {
            model.countDocuments({mode: 'publish',_isCompleted: true}).then(total => {
                let curNotify = total - viewTotal;
                if (curNotify < 0) {
                    let updateModel = modelType === 'poets' ? 'poet' : modelType;
                    viewnotifies.findOneAndUpdate({userID: req.user}, {[updateModel]: total}).then(() => {
                        resolve(notify);
                    })
                    return 
                }

                notify.collTotal = notify.collTotal + curNotify;
                if (req.body.fetchCnt && curNotify > 0) {
                    model.findOne({}).sort(sort).limit(1).then(result => {
                        let cnt = null;
                       if (result) {
                            cnt = {
                                id: result._id,
                                category: modelType,
                                title: result.title.substr(0, 100),
                                total: curNotify
                            }
                        }
                        notify.coll.push(cnt);
                        resolve(notify);
                    })
                    return;
                }
                resolve(notify);
            })
        })
    }

    function checkActive(userID, model, active) {
        return new Promise((resolve, reject) =>{
            model.findOne({userID}).then(result => {
                let checkRes = result ? result.notifications : 0;
                resolve(checkRes + active)
            }).catch(err => {
                reject(err)
            })
        })
    }

    if (req.header('data-categ') === 'category') {
        category.findOne({}).then(result => {
            let categ = req.body.categ;
            let allCateg = result ? result[categ] : [];
            res.send(allCateg).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }

    if(req.header('data-categ') === 'share') {
        let model = req.body.model === 'post' ? postnotifies :
        req.body.model === 'question' ? quenotifies : pwtnotifies;
        model.findOne({userID: req.user}).then(active => {
            let isActive = active ? active.notifications :0;
            res.send(new String(isActive)).status(200);
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    if (req.header('data-categ') === 'modelNotify') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        viewnotifies.findOne({userID: req.user}).then(notify => {
            if (notify) {
                model.countDocuments({mode: 'publish'}).then(total => {
                    let modelTotal = total - notify[req.body.model];
                    res.send(new String(modelTotal )).status(200);
                }).catch(err => {
                    reject(err);
                })
            }
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    if (req.header('data-categ') === 'myModel') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        model.find({authorID: req.user}).count().then(result => {
            res.status(200).send(String(result))
        })
        return
    }

    if (req.header('data-categ') === 'editform') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        model.findOne({_id: req.body.id, authorID: req.user}).then(result => {
            res.send(result).status(200)
        })
        return
    }


    if (req.header('data-categ') === 'trend') {
        trends(posts, 'post', []).then(ptArray => {
            trends(questions, 'question', ptArray).then(queArray => {
                trends(poets, 'poet', queArray).then(trend =>{
                    res.send(trend).status(200)
                });
            });
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    if (req.header('data-categ') === 'userimg') {
        authUser.findById(req.user).then(result => {
            if (!result) {
                user.findById(req.user).then(result => {
                    if (result) {
                        res.status(200).send({url: result.image, name: result.username})
                        return
                    }
                    res.sendStatus(200);
                })
                return
            }
            res.status(200).send({url: result.image, name: result.username})
        })
    }

    function trends(model, categ, trend) {
        return new Promise((resolve, reject) => {
            let sort = categ === 'post' ? {comment: -1} : 
            categ == 'question' ? {view: -1}: {comment: -1};
            model.find({mode: 'publish', _isCompleted: true}).sort(sort).limit(3).then(results => {
                for(let result of results) {
                    let cnt = {
                        category: 'Question',
                        helpFull: result.helpFull,
                        notHelpFull: result.notHelpFull,
                        favorite: result.favorite,
                    }
                    if (categ === 'post') {
                        cnt = {
                            category: 'Post',
                            view:  result.view,
                            comment: result.comment,
                            favorite: result.favorite,
                        }
                    }
                    
                    if (categ === 'poet') {
                        cnt = {
                            category: 'Poet/Writer',
                            helpFull: result.helpFull,
                            comment: result.comment,
                            favorite: result.favorite,
                        }
                    }

                    let isLiked = req.user ? result.liked.filter(userID => userID === req.user) : [];
                    if (isLiked.length > 0) {
                        cnt['liked'] = true
                    } else {
                        cnt['liked'] = false
                    }

                    let updateResult = {
                        id: result._id,
                        cntGrp: categ,
                        title: String(result.title).substr(0, 100),
                        ...cnt
                    }
                    trend.push(updateResult);
                }
                resolve(trend)
            }).catch(err => {
                reject(err)
            })
        })
    }
    
    if (req.header('data-categ') === 'cntSearch') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        filterCnt(JSON.parse(req.body.filterCnt)).then(filter => {
            let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
            model.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, mode: 'publish', _isCompleted: true}).then(result => {
                 let resultCount = new String(result.length);
                 res.send(resultCount).status(200);
             }).catch(err => {
                 res.status(500).send(err);
             })
         });
        return ;
    }

    if (req.header('data-categ') === 'usersearch') {
        userFilter(JSON.parse(req.body.filterCnt)).then(filter => {
            let subject = filter.categoryGrp === 'post' ? 'subjectpost' :
            filter.categoryGrp === 'question' ? 'subjectque' : 'subjectpoet';
            let filterCateg = filter.category.length > 0 ? {[subject]: { $all: filter.category }} : {};
            let student = {};
            let comment = {};
            for (let key in filter.filterCnt) {
                if (key === 'student') {
                    student['studenttotal']= filter.filterCnt[key]
                } else {
                    comment[key]= filter.filterCnt[key]
                }
            }

            return fetchUsers(
                connectStatus,
                {$text: { $search: `\"${filter.searchCnt}\"`},
                block: {$ne: req.user},
                _id: {$ne: mongoose.mongo.ObjectId(req.user)},
                ...student,
                ...comment,
                ...filterCateg},
                { },
                0, 0, {}, user, 0
            ).then(userCnt => {
                fetchUsers(
                    connectStatus,
                    {$text: { $search: `\"${filter.searchCnt}\"`},
                    block: {$ne: req.user},
                    _id: {$ne: mongoose.mongo.ObjectId(req.user)},
                    ...student,
                    ...comment,
                    ...filterCateg},
                    { },
                    0, 0, {}, authUser, userCnt
                ).then(result =>{
                    res.status(200).send(String(result))
                }).catch(err => {
                    res.status(500).send(err)
                })
            }).catch(err => {
                res.status(500).send(err)
            })
        })
        return ;
    }

    function fetchUsers(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt) {
        return new Promise((resolve, reject) => {
            fetchCnt(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt).then(result =>{
                let model = req.userType === 'authUser' ? authUser : user;
                model.findById(req.user).then(resultFilter => {
                    for (let cnt of result.cnt) {
                        let userBlock = resultFilter.block || [];
                        let filterBlock = userBlock.filter(id => id === cnt._id.toHexString())
                        if (filterBlock.length < 1) {
                            modelCnt = modelCnt + 1;
                        } 
                    }
                    resolve(modelCnt)
                }).catch(err => {
                    reject(err)
                })
            })  
        })
    }
});


router.patch('/header', authenticate, (req, res, next) => {
    if (req.header('data-categ') === 'draftmode') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        let notify = req.body.model === 'post' ? postnotifies :
        req.body.model === 'question' ? quenotifies : pwtnotifies;
        model.findOneAndUpdate({_id: req.body.id, authorID: req.user}, {mode: 'draft', shareMe: []}).then(result => {
            let send = 0;
            if (result.shareMe && result.shareMe.length < 1) {
                res.sendStatus(200);
                return
            }
            for (let userID of result.shareMe){
                notify.findOneAndUpdate({userID, [req.body.field]: {$in : req.body.id}}, {$pull: { [req.body.field]: req.body.id}
                }).then(() => {
                    ++send;
                    if (send === result.shareMe.length) {
                        res.sendStatus(200);
                    }
                })
            }
        })
        return
    }

    if (req.header('data-categ') === 'publishmode') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        model.findOneAndUpdate({_id: req.body.id, authorID: req.user}, {mode: 'publish'}).then(result => {
            res.sendStatus(200);
        }).catch(err => {
            res.send(500).send(err);
        })
        return
    }

    if(req.header('data-categ') === 'share') {
        let model = req.body.model === 'post' ? postnotifies :
         req.body.model === 'question' ? quenotifies : pwtnotifies;
        model.findOneAndUpdate({userID: req.user}, {notifications: 0}).then(result => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    if (req.header('data-categ') === 'modelNotify') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        model.countDocuments({mode: 'publish'}).then(total => {
            viewnotifies.findOneAndUpdate({userID: req.user}, {[req.body.model]: total}).then(() => {
                res.sendStatus(200);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }
    
    if (req.header('data-categ') === 'shareuser') {
        let modelNotifies = req.body.model === 'post' ? postnotifies :
        req.body.model === 'question' ? quenotifies : pwtnotifies;
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        let shareMe = JSON.parse(req.body.users);
        notification(shareMe, modelNotifies, req.body.id, req.body.field).then(() =>{
            model.findByIdAndUpdate(req.body.id, {$addToSet: { shareMe: { $each: shareMe } }}).then((result) => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header('data-categ') === 'changefavorite') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        favorite.find({userID: req.user, [req.body.field]: {$in : req.body.id}}).then(result => {
            if (result && result.length > 0) {
                favorite.findOneAndUpdate({userID: req.user}, {$pull: { [req.body.field]: req.body.id}}).then(() => {
                    model.findByIdAndUpdate(req.body.id, {$inc: {'favorite': -1}, $pull: { liked: req.user}}).then(() => {
                        res.sendStatus(200);
                    })
                })
            } else {
                notification([req.user], favorite, req.body.id, req.body.field).then(() =>{
                    model.findByIdAndUpdate(req.body.id, {$inc: {'favorite': 1}, $addToSet: { liked: { $each: [req.user] } }}).then((result) => {
                        res.sendStatus(200);
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
  
        return
    }
});

router.delete('/header', authenticate,(req,res, next) =>  {
    if (req.header('data-categ').startsWith('deletecnt')) {
        let payload = JSON.parse(req.header('data-categ').split('-')[1]);
        let model = payload.model === 'post' ? posts :
        payload.model === 'question' ? questions : poets;
        let notify = payload.model === 'post' ? postnotifies :
        payload.model === 'question' ? quenotifies : pwtnotifies;
        model.findOneAndRemove({_id :payload.id, authorID: req.user}).then(result => {
            let send = 0;
            if (result.shareMe && result.shareMe.length < 1) {
                res.sendStatus(200);
                return
            }
            for (let userID of result.shareMe){
                notify.findOneAndUpdate({userID, [payload.field]: {$in : payload.id}}, {$pull: { [payload.field]: payload.id}
                }).then(() => {
                    ++send;
                    if (send === result.shareMe.length) {
                        res.sendStatus(200);
                    }
                })
            }
        })
        return
    }
});

router.get('/group', (req, res, next) => {
    res.render('group');
});

router.get('/onlineexam', (req, res, next) => {
    res.render('onlineexam');
});

router.get('/chat', (req, res, next) => {
    res.render('groupchat');
});

router.get('/community', (req, res, next) => {
    res.render('community');
});

router.get('/conversations', (req, res, next) => {
    res.render('conv');
});

router.get('/add/question', authenticate,(req, res, next) => {
    res.render('queform');
});

router.get('/add/post', authenticate, (req, res, next) => {
    res.render('postform');
});

router.get('/add/group', (req, res, next) => {
    res.render('groupform'); 
});

router.get('/add/onlineexam', (req, res, next) => {
    res.render('onlineexamform'); 
});

router.get('/add/poet', authenticate, (req, res, next) => {
    res.render('poetwriterform'); 
});

router.get('/examtab', (req, res, next) => {
    res.render('examtab');
});

router.get('/acc/shared', (req, res, next) => {
    res.render('accshared'); 
});

router.get('/acc/user', (req, res, next) => {
    res.render('accuser'); 
});

router.get('/acc/published', (req, res, next) => {
    res.render('accpub'); 
});

router.get('/acc/draft', (req, res, next) => {
    res.render('accdft'); 
});

router.get('/acc/profile', (req, res, next) => {
    res.render('accprf'); 
});

router.get('/acc/help', (req, res, next) => {
    res.render('acchelp'); 
});

router.get('/acc/set', (req, res, next) => {
    res.render('accset'); 
});

router.get('/login', (req, res, next) => {
    res.render('loginform'); 
});

router.get('/signup', (req, res, next) => {
    res.render('signupform'); 
});

router.get('/signup/profile', (req, res, next) => {
    res.render('signprfform'); 
});

router.get('/forget/password', (req, res, next) => {
    res.render('forgetpwd'); 
});

router.post('/forget/password', (req, res, next) => {
    user.findOne({email: req.body.email}).then(result => {
        if (result) {
            let token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {  expiresIn: 60*60 });
            let transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: process.env.user,
                    clientId: process.env.googleClientID,
                    clientSecret: process.env.googleClientSecret,
                    refreshToken: process.env.googleRefreshToken,
                    accessToken: process.env.googleAccessToken
                }
            });
            const message = {
                from: 'www.sg24.com',
                to: req.body.email,   
                subject: 'SG24 | Knowledge sharing center',
                html: `
                    <div>
                    <h1 style='text-align:center,color:#333'>SG24 |Connecting Scholars</h1>
                    <h4>Scholars are waiting for you idea's</h4>
                    <p>Click this 
                    <a href='http://localhost:3002/forget/reset/${token}' style='color: #0284a8;font-weight: bold;'>link</a> Reset password </p>
                    </div>
                `
            };
            transport.sendMail(message, function(err, info) {
                if (err) {
                    res.status(400).send(err) 
                } else {
                    console.log(token)
                    res.sendStatus(200)
                }
            });
        } else {
            res.sendStatus(200)
        }
    }).catch(err => {
    res.status(500).send(err)
    })
});

router.get('/forget/reset/:token', (req, res, next) => {
    if (req.params) {
        jwt.verify(req.params.token, process.env.JWT_SECRET, function(err, token) {
            if(!err) {
                res.cookie('resettoken', req.params.token, { signed: true, httpOnly: true });
                res.render('forgetpwd');
                return
            } else {
                res.redirect('/forget/password');
            }
        })
        return
    }
    res.redirect('/forget/password');
});

router.post('/forget/reset', (req, res, next) => {
    let resetToken = req.signedCookies.resettoken;
    if (resetToken ) {
        jwt.verify(resetToken, process.env.JWT_SECRET, function(err, token) {
            if(!err) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        let access = 'authentication';
                        let newToken = jwt.sign({_id: token.id, access}, process.env.JWT_SECRET, { expiresIn: 3600 * 24* 7}).toString();
                        let tokens = [{access, token: newToken}];
                      user.findByIdAndUpdate(token.id, {password: hash, tokens}).then(result =>{
                        let decoded = null;
                        decoded = jwt.verify(newToken, process.env.JWT_SECRET);
                        if (decoded) {
                            res.cookie('token', newToken, { signed: true, httpOnly: true , maxAge: 604800000});
                            res.cookie('expiresIn', decoded.exp, {maxAge: 604800000});
                            res.cookie('pushMsg', result.pushMsg[0].publickey, {maxAge: 604800000});
                            res.cookie('id', result._id, {maxAge: 604800000});
                            res.redirect('/');
                        }
                      }).catch(err =>{
                          res.status(500).send({msg: 'Internal Server Error', expire: false})
                      })
                    });
                });
                return
            } else {
                res.status(500).send({msg: 'Password reset link has expired', expire: true});   
            }
        })
    } else {
        res.redirect('/forget/password')
    }
});

router.post('/signup', (req, res) => {
    if (req.user) {
        res.redirect('/index/post')
    }
    let newUser = new tempUser({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    user.findOne({email: req.body.email}).then(result => {
        if (!result) {
            newUser.save().then(result => {
                let token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {  expiresIn: 60*60 });
                let transport = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        type: 'OAuth2',
                        user: process.env.user,
                        clientId: process.env.googleClientID,
                        clientSecret: process.env.googleClientSecret,
                        refreshToken: process.env.googleRefreshToken,
                        accessToken: process.env.googleAccessToken
                    }
                });
                const message = {
                    from: 'www.sg24.com',
                    to: req.body.email,   
                    subject: 'SG24 | Knowledge sharing center',
                    html: `
                        <div>
                        <h1 style='text-align:center,color:#333'>SG24 |Connecting Scholars</h1>
                        <h4>Scholars are waiting for you idea's</h4>
                        <p>Click this 
                        <a href='http://localhost:3002/signup/confirmation/${token}' style='color: #0284a8;font-weight: bold;'>link</a> to start </p>
                        </div>
                    `
                };
                transport.sendMail(message, function(err, info) {
                    if (err) {
                        tempUser.findByIdAndRemove(result.id).then(() =>{
                            res.status(400).send(err)
                        })
                        
                    } else {
                        console.log(token)
                        res.sendStatus(201)
                    }
                });
            }).catch(err =>{
                res.status(422).send(err)
            })
            return
        }
        res.status(422).send('Email Already exist');
    })
})

router.get('/signup/confirmation/:id', (req, res, next) => {
    if (req.params) {
        jwt.verify(req.params.id, process.env.JWT_SECRET, function(err, token) {
            if(!err) {
                tempUser.findById(token.id).then(result => {
                    if (result) {
                        let newUser = new user({
                            username: result.username,
                            password:  result.password,
                            email: result.email
                        });
                        newUser.generateAuthToken().then(() => {
                            tempUser.findByIdAndRemove(token.id).then(() =>{
                                res.redirect('/login')
                                return
                            });
                        })
                    } else {
                        res.redirect('/login')
                    }
                })
                return
            } else {
                res.redirect('/signup')
            }
        })
    }
})

router.post('/login', (req, res) => {
    if (req.user) {
        res.redirect('/index/post')
    }
    user.findByCredentials(req.body.username, req.body.password).then(token => {
        let decoded = null;
        decoded = jwt.verify(req.user.token, process.env.JWT_SECRET);
        if (decoded) {
            res.cookie('token', req.user.token, { signed: true, httpOnly: true , maxAge: 604800000});
            res.cookie('expiresIn', decoded.exp, {maxAge: 604800000});
            res.cookie('pushMsg', req.user.pushMsg, {maxAge: 604800000});
            res.cookie('id', req.user.id, {maxAge: 604800000});
            res.redirect('/');
        }
    }).catch((e) => {
        res.status(401).send(e)
    });
});

router.post('token', (req, res, next) =>{
    res.send(req.user);
})

module.exports = router;

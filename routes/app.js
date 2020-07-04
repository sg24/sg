let express = require('express');
let router = express.Router();
let path = require('path');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let authenticate = require('../serverDB/middleware/authenticate');
const nodemailer = require('nodemailer');
let passport = require('passport');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const fetchCnt = require('./utility/fetchcnt');
let filterCnt = require('./utility/filtercnt');
let deleteMedia = require('./utility/deletemedia');
let userFilter = require('./utility/userfilter');
let notification = require('./utility/notifications');
let push = require('./utility/push');
const global = require('../global/global');

const {category,  posts, questions, poets, group, contest, qchat, user,  adverts, tempUser, postnotifies, 
     authUser, aroundme, quenotifies, pwtnotifies, viewnotifies, usernotifies,
     favorite, connectStatus, chatnotifies, grpchatnotifies} = require('../serverDB/serverDB');

router.get('/',function (req, res, next) {
    res.redirect(301,'/index/user');
    // if ((req.useragent && req.useragent.isBot) ||
    // req.useragent.source === 'facebookexternalhit/1.1' ||
    // req.useragent.source === 'Facebot' ||
    // req.useragent.source === 'Twitterbot') {
    //     res.redirect(301, `/robotonly/rbindex`)
    // } else {
    //     res.render('index');
    // }
});

// router.get('/', authenticate,function (req, res, next) {
//     res.render('index');

// });

router.get('/index/:id', authenticate,function (req, res, next) {
    // if ((req.useragent && req.useragent.isBot) ||
    // req.useragent.source === 'facebookexternalhit/1.1' ||
    // req.useragent.source === 'Facebot' ||
    // req.useragent.source === 'Twitterbot') {
    //     let id = req.params.id === 'post' ? 'index' : req.params.id
    //     res.redirect(301, `/robotonly/rb${id}`)
    // } else {
        res.render('index');
    // }
});

router.post('/header', authenticate, (req, res, next) => {
    if(req.header('data-categ') === 'headerfilter') {
        checkText(req.body.filterCnt, posts, [], 'post').then(ptArray => {
            checkText(req.body.filterCnt, questions, ptArray, 'question').then(queArray => {
                checkText(req.body.filterCnt, poets, queArray, 'poet').then(poetArray => {
                    checkText(req.body.filterCnt, group, poetArray, 'group').then(advertArray => {
                        checkText(req.body.filterCnt, adverts, advertArray, 'advert').then(qchatArray => {
                            checkText(req.body.filterCnt, qchat, qchatArray, 'qchat').then(userArray => {
                                searchUser(req.body.filterCnt, userArray).then(filterArray => {
                                    res.send(filterArray).status(200);
                                })
                            })
                        })
                    })
                });
            });
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    function searchUser(searchCnt, filterRes) {
      return new Promise((resolve, reject) => {
        userSearch(
            connectStatus,
            {$text: { $search: searchCnt },
            block: {$ne: req.user},
            _id: {$ne: mongoose.mongo.ObjectId(req.user)}},
            { },
            0, 0, {}, user, filterRes
        ).then(userCnt => {
            userSearch(
                connectStatus,
                {$text: { $search: searchCnt },
                block: {$ne: req.user},
                _id: {$ne: mongoose.mongo.ObjectId(req.user)}},
                { },
                0, 0, {}, authUser, userCnt
            ).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
      })
    }

    function userSearch(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt) {
        return new Promise((resolve, reject) => {
            fetchCnt(connectStatus, conditions, sort, curLimit, skip, meta, model, modelCnt).then(result =>{
                let model = req.userType === 'authUser' ? authUser : user;
                model.findById(req.user).then(resultFilter => {
                    for (let cnt of result.cnt) {
                        let userBlock = resultFilter.block || [];
                        let filterBlock = userBlock.filter(id => id === cnt._id.toHexString())
                        if (filterBlock.length < 1) {
                            modelCnt.push({url: `/user/profile/${cnt._id}`, grp: 'user', title: cnt.username});
                        } 
                    }
                    resolve(modelCnt)
                }).catch(err => {
                    reject(err)
                })
            })  
        })
    }

    function checkText(searchCnt, collection, filterRes, grp) {
        return new Promise((resolve, reject) => {
            collection.find({$text: { $search: searchCnt },mode: 'publish',_isCompleted: true}).then(result => {
                for (let filter of result) {
                    filterRes.push({url: grp === 'group' ? `/group/${filter._id}` :  `/view/${grp}/${filter._id}`,
                    grp, title: filter.title})
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
                        checkAllNotifies(poets, 'poets', {pwtCreated: -1}, result.poet, queNotify).then(pwtNotify  => {
                            checkAllNotifies(chatnotifies, 'chat', null, null, pwtNotify).then(chatNotify  => {
                                checkAllNotifies(grpchatnotifies, 'group', null, null, chatNotify).then(grpNotify  => {
                                    checkAllNotifies(group, 'grpreq', null, null, grpNotify).then(grpReqNotify  => {
                                        checkAllNotifies(user, 'userReq', null, null, grpReqNotify).then(totalNotify  => {
                                            res.status(200).send(totalNotify);
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                return
            }
            let newViewNotifies = new viewnotifies({
                userID: req.user
            })
            newViewNotifies.save().then(result => {
                checkAllNotifies(posts, 'post', {postCreated: -1}, result.post,  {coll: [], collTotal: 0}).then(ptNotify  => {
                    checkAllNotifies(questions, 'question', {queCreated: -1}, result.question, ptNotify).then(queNotify => {
                        checkAllNotifies(poets, 'poets', {pwtCreated: -1}, result.poet, queNotify).then(pwtNotify  => {
                            checkAllNotifies(chatnotifies, 'chat', null, null, pwtNotify).then(chatNotify  => {
                                checkAllNotifies(grpchatnotifies, 'group', null, null, chatNotify).then(grpNotify  => {
                                    checkAllNotifies(group, 'grpreq', null, null, grpNotify).then(grpReqNotify  => {
                                        checkAllNotifies(user, 'userReq', null, null, grpReqNotify).then(totalNotify  => {
                                            res.status(200).send(totalNotify);
                                        })
                                    })
                                })
                            })
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
            res.status(401).send(err)
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
            if (modelType === 'grpreq') {
                model.find({authorID: req.user}).then(grp => {
                    let totalNotify  = 0;
                    if (grp && grp.length > 0) {
                        for (let grpdet of grp) {
                            if (grpdet.request.length > 0 && grpdet._isCompleted) {
                                notify.coll.push({id: grpdet._id, title: grpdet.title, category: modelType, notifications: grpdet.request.length})
                                notify.collTotal = notify.collTotal + 1;
                                ++totalNotify
                                if (totalNotify === grp.length) {
                                   return resolve(notify)
                                }
                            } else {
                                ++totalNotify
                                if (totalNotify === grp.length) {
                                   return resolve(notify)
                                }
                            }
                        }
                    } else {
                        resolve(notify)
                    }
                })
                return
            }
            if (modelType === 'userReq') {
                user.findById(req.user).then(userdet => {
                    if (!userdet) {
                        authUser.findById(req.user).then(authdet => {
                            if (authdet.request.length > 0) {
                                notify.coll.push({ category: modelType, notifications: authdet.request.length})
                                notify.collTotal = notify.collTotal + 1;
                                return resolve(notify)
                            } else {
                                return resolve(notify)
                            }
                        })
                    } else {
                        if (userdet.request.length > 0) {
                            notify.coll.push({ category: modelType, notifications: userdet.request.length})
                            notify.collTotal = notify.collTotal + 1;
                            return resolve(notify)
                        } else {
                            return resolve(notify)
                        }
                    }
                })
                return
            }
            if (modelType === 'chat' || modelType === 'group') {
                if (modelType === 'chat') {
                    model.findOne({userID: req.user}).then(notifyCnt => {
                        let totalNotify = 0;
                        if (notifyCnt && notifyCnt.member && notifyCnt.member.length > 0 ) {
                            for (let cnt of notifyCnt.member) {
                                if (cnt.notifications > 0) {
                                    user.findById(cnt.ID).then(userDet => {
                                        if (!userDet) {
                                            authUser.findById(cnt.ID).then(authDet => {
                                                notify.coll.push({id: cnt.ID, username: authDet.username, category: modelType, notifications: cnt.notifications})
                                                notify.collTotal = notify.collTotal + 1;
                                                ++totalNotify;
                                                if (totalNotify === notifyCnt.member.length) {
                                                   return resolve(notify)
                                                }
                                            })
                                        } else {
                                            notify.coll.push({id: cnt.ID, username: userDet.username,category: modelType, notifications: cnt.notifications})
                                            ++totalNotify
                                            notify.collTotal = notify.collTotal + 1;
                                            if (totalNotify === notifyCnt.member.length) {
                                               return resolve(notify)
                                            }
                                        }
                                    })
                                } else {
                                    ++totalNotify
                                    if (totalNotify === notifyCnt.member.length) {
                                        return resolve(notify)
                                    }
                                }
                            }
                        } else {
                            return resolve(notify)
                        }
                    })
                } else {
                    model.findOne({userID: req.user}).then(notifyCnt => {
                        let totalNotify = 0;
                        if (notifyCnt && notifyCnt.grp && notifyCnt.grp.length > 0 ) {
                            for (let cnt of notifyCnt.grp) {
                                if (cnt.notifications > 0) {
                                    group.findById(cnt.ID).then(grpdet => {
                                        if (grpdet) {
                                            notify.coll.push({id: cnt.ID, title: grpdet.title,category: modelType, notifications: cnt.notifications})
                                            notify.collTotal = notify.collTotal + 1;
                                            ++totalNotify
                                            if (totalNotify === notifyCnt.grp.length) {
                                               return resolve(notify)
                                            }
                                        }
                                    })
                                } else {
                                    ++totalNotify
                                    if (totalNotify === notifyCnt.grp.length) {
                                        return resolve(notify)
                                    }
                                }
                            }
                        } else {
                            return resolve(notify)
                        }
                    })
                }
                return 
            } 

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
                model.countDocuments({mode: 'publish', _isCompleted: true}).then(total => {
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
        req.body.model === 'question' ? questions : req.body.model === 'group'  ? group : 
        req.body.model === 'advert' ? adverts : req.body.model === 'aroundme' ? aroundme : 
        req.body.model === 'contest' ? contest : 
        req.body.model === 'qchat' ? qchat : poets;
        model.find({authorID: req.user}).count().then(result => {
            res.status(200).send(String(result))
        })
        return
    }

    if (req.header('data-categ') === 'editform') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : req.body.model === 'group'  ? group :
        req.body.model === 'advert' ? adverts : poets;
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
        req.body.model === 'question' ? questions : req.body.model === 'group' ? group :
        req.body.model === 'advert' ? adverts : poets;
        filterCnt(JSON.parse(req.body.filterCnt)).then(filter => {
            let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
            model.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, mode: 'publish', _isCompleted: true}).then(result => {
                 let resultCount = new String(result.length);
                 res.send(resultCount).status(200);
             }).catch(err => {
                 res.status(500).send(err);
             })
         });
        return ;
    }

    if (req.header('data-categ') === 'groupSearch') {
        filterCnt(JSON.parse(req.body.filterCnt)).then(filter => {
            let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
            group.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, _isCompleted: true}).then(result => {
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
                {$text: { $search: filter.searchCnt },
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
                    {$text: { $search: filter.searchCnt },
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
        req.body.model === 'question' ? questions : 
        req.body.model === 'advert' ?  adverts : 
        req.body.model === 'qchat' ? qchat : poets;
        let notify = req.body.model === 'post' ? postnotifies :
        req.body.model === 'question' ? quenotifies : pwtnotifies;
        model.findOneAndUpdate({_id: req.body.id, authorID: req.user}, {mode: 'draft', shareMe: []}).then(result => {
            let send = 0;
            if ((result.shareMe && result.shareMe.length < 1) || req.body.model === 'advert' || req.body.model === 'qchat') {
                res.sendStatus(200);
                return
            }
            if (req.body.model !== 'advert' && req.body.model !== 'qchat') {
                for (let userID of result.shareMe){
                    notify.findOneAndUpdate({userID, [req.body.field]: {$in : req.body.id}}, {$pull: { [req.body.field]: req.body.id}
                    }).then(() => {
                        ++send;
                        if (send === result.shareMe.length) {
                            res.sendStatus(200);
                        }
                    })
                }
            }
        })
        return
    }

    if (req.header('data-categ') === 'publishmode') {
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : 
        req.body.model === 'advert' ? adverts : 
        req.body.model === 'qchat' ? qchat : poets;
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
        req.body.model === 'question' ? questions : 
        req.body.model === 'advert' ? adverts : 
        req.body.model === 'qchat' ? qchat : poets;
        let shareMe = JSON.parse(req.body.users);
        if (req.body.model === 'advert') {
            model.findByIdAndUpdate(req.body.id, {$addToSet: { shareMe: { $each: shareMe } }}).then((result) => {
                push(shareMe, result, req.body.model, req.body.id).then(() => {
                    res.sendStatus(200);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
            return
        }
 
        if (req.body.model === 'qchat') {
            model.findByIdAndUpdate(req.body.id, {$addToSet: { shareMe: { $each: shareMe } }}).then((result) => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).send(err);
            })
            return
        }

        notification(shareMe, modelNotifies, req.body.id, req.body.field).then(() =>{
            model.findByIdAndUpdate(req.body.id, {$addToSet: { shareMe: { $each: shareMe } }}).then((result) => {
                push(shareMe, result, req.body.model, req.body.id).then(() => {
                    res.sendStatus(200);
                })
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
        req.body.model === 'question' ? questions :
        req.body.model === 'advert' ? adverts :  poets;
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
        payload.model === 'question' ? questions : 
        payload.model === 'advert' ? adverts : poets;
        let notify = payload.model === 'post' ? postnotifies :
        payload.model === 'question' ? quenotifies : pwtnotifies;
        model.findOneAndRemove({_id :payload.id, authorID: req.user}).then(result => {
            if (result.video && result.video.length > 0){
                deleteMedia(result.video, 'media').then(() => {
                    removeShare(result, res, notify, payload)
                })
            }
            if (result.image && result.image.length > 0){
                deleteMedia(result.image, 'image').then(() => {
                    removeShare(result, res, notify, payload)
                })
            } 
            if (result.snapshot && result.snapshot.length > 0){
                deleteMedia(result.snapshot, 'image').then(() => {
                    removeShare(result, res, notify, payload)
                })
            } 
            if (result.video.length < 1 && result.image.length < 1 && result.snapshot.length < 1) {
                removeShare(result, res, notify, payload)
            }

            function removeShare(result, res, notify, payload) {
                let send = 0;
                if ((result.shareMe && result.shareMe.length < 1) || payload.model === 'advert') {
                    res.sendStatus(200);
                    return
                }
                if (payload.model !== 'advert') {
                    for (let userID of result.shareMe){
                        notify.findOneAndUpdate({userID, [payload.field]: {$in : payload.id}}, {$pull: { [payload.field]: payload.id}
                        }).then(() => {
                            ++send;
                            if (send === result.shareMe.length) {
                                res.sendStatus(200);
                            }
                        })
                    }
                }
            }
        })
        return
    }
});

// router.get('/onlineexam', (req, res, next) => {
//     res.render('onlineexam');
// });

// router.get('/community', (req, res, next) => {
//     res.render('community');
// });

// router.get('/conversations', (req, res, next) => {
//     res.render('conv');
// });

router.get('/add/question', authenticate,(req, res, next) => {
    if (!req.authType) {
        res.render('queform');
    } else {
        res.cookie('redirect', '/add/question');
        res.redirect('/login')
    }
    
});

router.get('/edit/question/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editque'); 
    } else {
        res.redirect('/')
    }
});

router.get('/add/post', authenticate, (req, res, next) => {
    if (!req.authType) {
        res.render('postform');
    } else {
        res.cookie('redirect', '/add/post');
        res.redirect('/login')
    }
    
});

router.get('/edit/post/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editpost'); 
    } else {
        res.redirect('/')
    }
});

router.get('/add/advert', authenticate, (req, res, next) => {
    if (!req.authType) {
        res.render('adsform');
    } else {
        res.cookie('redirect', '/add/advert');
        res.redirect('/login')
    }
    
});

router.get('/add/aroundme', authenticate, (req, res, next) => {
    res.render('addaround');
});

router.get('/edit/advert/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editads'); 
    } else {
        res.redirect('/')
    }
});

router.get('/edit/group/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editgroup'); 
    } else {
        res.redirect('/')
    }
});

router.get('/add/group',  authenticate,(req, res, next) => {
    if (!req.authType) {
        res.render('groupform');
    } else {
        res.cookie('redirect', '/add/group');
        res.redirect('/login')
    }
});

router.get('/edit/contest/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editcontest'); 
    } else {
        res.redirect('/')
    }
});

router.get('/add/contest',  authenticate,(req, res, next) => {
    res.render('contestform');
});

router.get('/add/qchat', authenticate, (req, res, next) => {
    if (!req.authType) {
        res.render('qchatform');
    } else {
        res.cookie('redirect', '/add/qchat');
        res.redirect('/login')
    }
});

router.get('/edit/qchat/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editqchat'); 
    } else {
        res.redirect('/')
    }
});

router.get('/add/poet', authenticate, (req, res, next) => {
    if (!req.authType) {
        res.render('poetwriterform');
    } else {
        res.cookie('redirect', '/add/poet');
        res.redirect('/login')
    }
});

router.get('/edit/poet/:id', authenticate, (req, res, next) => {
    if (req.params && !req.authType) { 
        res.render('editpoet'); 
    } else {
        res.redirect('/')
    }
});

// router.get('/examtab', (req, res, next) => {
//     res.render('examtab');
// });

// router.get('/acc/shared', (req, res, next) => {
//     res.render('accshared'); 
// });

// router.get('/acc/user', (req, res, next) => {
//     res.render('accuser'); 
// });

// router.get('/acc/published', (req, res, next) => {
//     res.render('accpub'); 
// });

// router.get('/acc/draft', (req, res, next) => {
//     res.render('accdft'); 
// });

// router.get('/acc/profile', (req, res, next) => {
//     res.render('accprf'); 
// });

// router.get('/acc/help', (req, res, next) => {
//     res.render('acchelp'); 
// });

// router.get('/acc/set', (req, res, next) => {
//     res.render('accset'); 
// });

router.get('/acc/shared', authenticate, function (req, res, next) {
    res.render('share');
})

router.get('/login', (req, res, next) => {
    if (req.cookies.expiresIn && req.cookies.expiresIn !== 'null') {
        user.findByToken(req.signedCookies.token).then((result) => {
            if (!result) {
                authUser.findByToken(req.signedCookies.token).then(result => {
                    if (!result) {
                    res.render('loginform'); 
                    return
                   }
                   res.redirect('/index/user')
                })
                return
            }
            res.redirect('/index/user')
        }).catch((e) => {
            res.render('loginform'); 
        });
        return
    } else {
        res.render('loginform'); 
    }
});

router.get('/signup', (req, res, next) => {
    if (req.cookies.expiresIn && req.cookies.expiresIn !== 'null') {
        user.findByToken(req.signedCookies.token).then((result) => {
            if (!result) {
                authUser.findByToken(req.signedCookies.token).then(result => {
                    if (!result) {
                    res.render('signupform'); 
                    return
                   }
                   res.redirect('/index/user')
                })
                return
            }
            res.redirect('/index/user')
        }).catch((e) => {
            res.render('signupform'); 
        });
        return
    } else {
        res.render('signupform'); 
    }
});

router.get('/forget/password', (req, res, next) => {
    res.render('forgetpwd'); 
});

router.get('/ads.txt', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', 'ads.txt'));
});

router.post('/forget/password', (req, res, next) => {
    user.findOne({email: req.body.email}).then(result => {
        if (result) {
            let token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {  expiresIn: 60*60 });
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: req.body.email, 
              from: 'Reset password <noreply@slodge24.com>',
              subject: 'Slodge24 | Knowledge sharing platform',
              html: `
              <div class="" style="background-color: #f6f6f6; color: #333;font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                <tr>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                  <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                    <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
                      <img src="https://slodge24.com/static/media/logo.png" alt="Slodge24" title="slodge24" style="display:block;margin: 30px auto;max-width:100%;border-style:none;height:48px;width:48px" width="48" height="48">
                      <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                        <tr>
                          <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px; background-color: #fff;height: auto; width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                              <tr>
                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                  <p style="font-family: sans-serif; font-size: 30px; font-weight: normal; margin: 0; Margin-bottom:5px;display:inline-block;color: #3498db">Reset Password</p>
                                  <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; Margin-bottom: 15px; color: #333;padding-top:15px; border-top: 1px solid #dcdbdc;">Please, Click the following link to reset password.</p>
                                  <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                    <tbody>
                                      <tr>
                                        <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                            <tbody>
                                              <tr>
                                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://slodge24.com/forget/reset/${token}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 20px; text-transform: capitalize; border-color: #3498db;">Reset Password</a> </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Or copy and paste this link. https://slodge24.com/forget/reset/${token}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                </tr>
              </table>
            </div>
                `
            };
            sgMail.send(msg).then(() => {
                res.sendStatus(201);
            }).catch(err =>{
                tempUser.findByIdAndRemove(result.id).then(() =>{
                    res.status(401).send(err)
                })
            })
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
                res.render('resetpwd');
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
                            res.cookie('id', result._id.toHexString(), {maxAge: 604800000});
                            res.sendStatus(200);
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
    // let newUser = new tempUser({
    //     username: req.body.username,
    //     password: req.body.password,
    //     email: req.body.email
    // });
    let newUser = new user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    user.findOne({email: req.body.email}).then(result => {
        if (result) {res.status(422).send('Email Already taken'); return}
        authUser.findOne({email: req.body.email}).then(result => {
            if (result) {res.status(422).send('Email Already taken'); return}
            newUser.generateAuthToken().then(result => {
                let decoded = null;
                decoded = jwt.verify(result.token, process.env.JWT_SECRET);
                if (decoded) {
                    res.cookie('token', null);
                    res.cookie('expiresIn', null);
                    res.cookie('pushMsg', null);
                    res.cookie('id', null);
                    res.cookie('token', result.token, { signed: true, httpOnly: true , maxAge: 7257600000});
                    res.cookie('expiresIn', decoded.exp, {maxAge: 7257600000});
                    res.cookie('pushMsg', result.pushMsg, {maxAge: 7257600000});
                    res.cookie('id', result.id, {maxAge: 7257600000});
                    res.sendStatus(200)
                }
                return
            })
    //             newUser.save().then(result => {
    //                 let token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {  expiresIn: 60*60 });
    //                 sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //                 const msg = {
    //                     to: req.body.email, 
    //                     from: 'Slodge24 <noreply@slodge24.com>',
    //                     subject: 'Slodge24 | Knowledge sharing platform',
    //                     html: `
    //                     <div class="" style="background-color: #f6f6f6; color: #333;font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    //                     <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
    //                     <tr>
    //                         <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    //                         <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
    //                         <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
            
    //                             <!--  <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Please click this link  <a href="https://localhost:3000/signup/confirmation/" target="_blank">Confirm Email</a>.</span> -->
    //                             <img src="https://slodge24.com/static/media/logo.png" alt="Slodge24" title="slodge24" style="display:block;margin: 30px auto;max-width:100%;border-style:none;height:48px;width:48px" width="48" height="48">

    //                             <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
    //                             <tr>
    //                                 <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px; background-color: #fff;height: auto; width:100%">
    //                                 <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
    //                                     <tr>
    //                                     <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
    //                                         <p style="font-family: sans-serif; font-size: 30px; font-weight: normal; margin: 0; Margin-bottom:5px;display:inline-block;color: #3498db">Welcome to Slodge24</p>
    //                                         <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; Margin-bottom: 15px;padding-top:15px; border-top: 1px solid #dcdbdc;color: #333;">Scholars are waiting for your idea's.</p>
    //                                         <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; Margin-bottom: 15px; color: #333;">Please, Click the following link to get started .</p>
    //                                         <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
    //                                         <tbody>
    //                                             <tr>
    //                                             <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
    //                                                 <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
    //                                                 <tbody>
    //                                                     <tr>
    //                                                     <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://slodge24.com/signup/confirmation/${token}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 20px; text-transform: capitalize; border-color: #3498db;">Confirm Email</a> </td>
    //                                                     </tr>
    //                                                 </tbody>
    //                                                 </table>
    //                                             </td>
    //                                             </tr>
    //                                         </tbody>
    //                                         </table>
    //                                         <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Or copy and paste this link. https://slodge24.com/signup/confirmation/${token}</p>
    //                                     </td>
    //                                     </tr>
    //                                 </table>
    //                                 </td>
    //                             </tr>
    //                             </table>
    //                         </div>
    //                         </td>
    //                         <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    //                     </tr>
    //                     </table>
    //                 </div>
    //                     `
    //                 };
    //             sgMail.send(msg).then(() => {
    //                 res.sendStatus(201);
    //             }).catch(err =>{
    //                 tempUser.findByIdAndRemove(result.id).then(() =>{
    //                     res.status(401).send(err)
    //                 })
    //             })
    //         }).catch(err =>{
    //             res.status(422).send(err)
    //         })
        })
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
                        newUser.generateAuthToken().then(result => {
                            tempUser.findByIdAndRemove(token.id).then(() =>{
                                let decoded = null;
                                decoded = jwt.verify(result.token, process.env.JWT_SECRET);
                                if (decoded) {
                                    res.cookie('token', result.token, { signed: true, httpOnly: true , maxAge: 7257600000});
                                    res.cookie('expiresIn', decoded.exp, {maxAge: 7257600000});
                                    res.cookie('pushMsg', result.pushMsg, {maxAge: 7257600000});
                                    res.cookie('id', result.id, {maxAge: 7257600000});
                                    res.redirect('/index/user');
                                }
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

router.post('/login', (req, res,next) => {
    user.findByCredentials(req.body.username, req.body.password).then(result => {
        let decoded = null;
        decoded = jwt.verify(result.token, process.env.JWT_SECRET);
        if (decoded) {
            res.cookie('token', result.token, { signed: true, httpOnly: true , maxAge: 7257600000});
            res.cookie('expiresIn', decoded.exp, {maxAge: 7257600000});
            res.cookie('pushMsg', result.pushMsg, {maxAge: 7257600000});
            res.cookie('id', result.id, {maxAge: 7257600000});
            res.sendStatus(200);
        }
    }).catch((e) => {
        res.status(401).send(e)
    });
});

router.post('token', (req, res, next) =>{
    res.send(req.user);
})

router.get('/term',function (req, res, next) {
    res.render('term')
});

router.get('/privacy',function (req, res, next) {
    res.render('policy')
});

module.exports = router;

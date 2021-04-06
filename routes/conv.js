let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
const {chat, chatnotifies, group, grpchatnotifies, user,  connectStatus} = require('../serverDB/serverDB');

router.get('/', authenticate, (req, res,next) => {
    if (!req.authType) {
        res.render('conv');
    } else {
        res.cookie('redirect', '/conv');
        res.redirect('/login')
    }
})

router.get('/:id', authenticate, (req, res,next) => {
    if (!req.authType) {
        res.render('conv');
    } else {
        res.cookie('redirect', '/conv');
        res.redirect('/login')
    }
})

router.post('/', authenticate, (req, res, next) => {
    if (req.header('data-categ') &&  (req.header('data-categ') === 'private' || req.header('data-categ') === 'group')) {
        let condition = req.body.curTab === 'private' ? {$or:  [ { host: { $in: req.user } }, { reply: { $in: req.user} } ]} : 
        {_isCompleted: true, $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}
        return fetchCnt(condition, null, req.body.curTab).then(cnt => {
            res.status(200).send(cnt)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    if (req.header('data-categ') &&  req.header('data-categ') === 'allconv') {
        fetchCnt({$or:  [ { host: { $in: req.user } }, { reply: { $in: req.user} } ]}, null, 'private').then(private => {
            fetchCnt({_isCompleted: true, $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}, null, 'group').then(grp => {
                let cnt = [...private.cnt, ...grp.cnt]
                res.status(200).send(cnt)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    if (req.header('data-categ') &&  req.header('data-categ') === 'friends') { 
        user.findById(req.user).then(userDet => {
            if (userDet) {
                let users = userDet.friend;
                if (users.length < 1) {
                    return res.status(200).send(users)
                }
                let cnt = [];
                let userTotal = 0;
                for (let id of users) {
                    chat.findOne({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: id} }]}]}).then(chatDet => {
                        let lastMsg = {};
                        if (chatDet) {
                            let msg = chatDet.chat.length > 0 ? arraySort(chatDet.chat, 'created', {reverse: true}) : null;
                            lastMsg = checkMsg(msg);
                            function checkMsg(msg) {
                                for (let cnt of msg) {
                                    if (cnt.ID === id) {
                                        let updateCnt = cnt.reply && cnt.reply.length > 0 ? cnt.reply[cnt.reply.length - 1] : cnt;
                                        return {
                                            msg: updateCnt.cntType !== 'typedPlain' ? updateCnt.cntType === 'media' ? 'Video' : updateCnt.cntType : updateCnt.msg,
                                            created: updateCnt.created
                                        }
                                    }
                                }
                                return null
                            }
                        }

                        chatnotifies.findOne({userID: req.user}).then(notify => {
                            let notifications = 0;
                            if (notify) {
                                for (let member of notify.member) {
                                    if (member.ID === id) {
                                        notifications = member.notifications;
                                    }
                                }
                            }
                            getUserDet(id, cnt, lastMsg, notifications).then(userFnd => {
                                cnt = userFnd;
                                ++userTotal;
                                if (userTotal === users.length) {
                                    res.status(200).send(cnt) 
                                }
                            })
                        })  
                    })
                }
            } else {
                res.sendStatus(200)
            }

            function getUserDet(id, cnt, lastMsg, notifications) {
                return new Promise((resolve, reject) => {
                    user.findById(id).then(userdet => {
                        if (!userdet) {
                            authUser.findById(id).then(authdet => {
                                cnt.push({
                                    id,
                                    username: authdet.username,
                                    status: authdet.status, 
                                    image: authdet.image,
                                    ...lastMsg,
                                    notifications
                                })
                                return resolve(cnt)
                            })
                        } else {
                            cnt.push({
                                id,
                                username: userdet.username,
                                status: userdet.status, 
                                image: userdet.image,
                                ...lastMsg,
                                notifications
                            })
                           return resolve(cnt)
                        }
                    })
                })
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'allgroup') {
        group.find({_isCompleted: true, 
            $or: [ { member: { $in: req.user} }, 
                { authorID:  req.user } ]}).sort({groupCreated: -1}).then(grp => {
            let grpCnt = []
            let cntTotal = 0;
            if (grp) {
                if (grp.length < 1) {
                    return res.status(200).send([])
                }
                for(let cnt of grp) {
                    let update = {};
                    update['authorID'] = cnt.authorID;
                    update['category'] = cnt.category;
                    update['desc'] = cnt.desc;
                    update['image'] = cnt.image;
                    update['members'] = cnt.member.length + 1;
                    update['title'] = cnt.title;
                    update['online'] = cnt.online.length;
                    update['groupCreated'] = cnt.groupCreated;
                    update['offline'] = (cnt.member.length + 1) - cnt.online.length;
                    let chats = arraySort(cnt.chat, 'groupCreated', {reverse: true});
                    let lastMsg = null;
                    let created = null
                    for (let chat of chats) {
                        if (chat.cntType === 'typedPlain') {
                            lastMsg = chat.msg;
                            created = chat.created;
                        }
                    }
                    update['lastChat'] = lastMsg;
                    update['created'] = created;
                    update['_id'] = cnt._id;
                    grpchatnotifies.findOne({userID: req.user}).then(notifyCnt => {
                        ++cntTotal;
                        if (notifyCnt) {
                            for (let notify of notifyCnt.grp) {
                                if (notify.ID === cnt._id.toHexString()) {
                                    update['notify'] = notify.notifications;
                                }
                            }
                        }
                        grpCnt.push(update);
                        if (cntTotal === grp.length) {
                            res.status(200).send(grpCnt)
                        }
                    }).catch(err =>{
                        res.status(500).send(err)
                    });
                }
            } else {
                res.status(500).send(err)
        }}).catch(err =>{
            res.status(500).send(err)
        })
    }
    
    if (req.header('data-categ') && req.header('data-categ') === 'navActive') {
        chatnotifies.findOne({userID: req.user}).then(notifyCnt => {
            let notifications = 0;
            if (notifyCnt && notifyCnt.member && notifyCnt.member.length > 0 ) {
                 for (let cnt of notifyCnt.member) {
                     notifications += cnt.notifications;
                 }
                 grpchatnotifies.findOne({userID: req.user}).then(notifyCnt => {
                    if (notifyCnt && notifyCnt.grp && notifyCnt.grp.length > 0 ) {
                        for (let cnt of notifyCnt.grp) {
                            notifications += cnt.notifications;
                        }
                    }
                    res.status(200).send(String(notifications))
                })
                return
            }
            res.sendStatus(200)
         }).catch(err =>{
             res.sendStatus(500)
         })
    }

    if (req.header('data-categ') && req.header('data-categ') === 'privateActive') {
        chatnotifies.findOne({userID: req.user}).then(notifyCnt => {
            let notifications = 0;
            if (notifyCnt && notifyCnt.member && notifyCnt.member.length > 0 ) {
                 for (let cnt of notifyCnt.member) {
                     notifications += cnt.notifications;
                 }
            }
             res.status(200).send(String(notifications))
         }).catch(err =>{
             res.sendStatus(500)
         })
    }

    if (req.header('data-categ') && req.header('data-categ') === 'groupActive') {
        group.find({authorID: req.user}).then(notifyCnt => {
            let notifications = 0;
            if (notifyCnt && notifyCnt.length > 0 ) {
                for (let cnt of notifyCnt) {
                    notifications += cnt.request.length;
                }
            }
            res.status(200).send(String(notifications))
        }).catch(err =>{
            res.sendStatus(500)
        })
    }

    function fetchCnt(conditions, meta, curTab) {
        return new Promise((resolve, reject) => {
            let condition = {...conditions}
            connectStatus.then(() => {
                let isMeta = meta ? meta : {};
                let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {created: -1};
                let curLimit = parseInt(req.header('limit'));
                let skip = parseInt(req.header('skip'));
                let model = curTab === 'private' ? chat : group; 
                model.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
                    model.find(condition, isMeta).sort(sort).then(result => {
                        let cntArray = [];
                        let send = 0;
                        if (result.length < 1) {
                            return resolve({cnt: cntArray, cntTotal})
                        }

                        if(curTab === 'group') {
                            for (let cnt of result) {
                                let update = {};
                                let chatCnt = cnt.chat[cnt.chat.length - 1];
                                update['image'] = cnt.image;
                                update['offline'] = cnt.member.length - cnt.online.length;
                                update['title'] = cnt.title;
                                update['online'] = cnt.online.length;
                                update['msg'] = chatCnt ? chatCnt.reply.length > 0 ? 
                                chatCnt.reply[chatCnt.reply.length -1].cntType !== 'typedPlain' ? chatCnt.reply[chatCnt.reply.length -1].cntType === 'media' ? 'video' :   chatCnt.reply[chatCnt.reply.length -1].cntType : chatCnt.reply[chatCnt.reply.length -1].msg 
                                : chatCnt.cntType !== 'typedPlain' ? chatCnt.cntType === 'media' ? 'video' : chatCnt.cntType : chatCnt.msg : '';
                                update['_id'] = cnt._id;
                                grpchatnotifies.findOne({userID: req.user}).then(notify => {
                                    if (notify) {
                                        let filterNotify = notify.grp.filter(grpdet => grpdet.ID === cnt._id.toHexString())[0];
                                        if (filterNotify) {
                                            update['active'] = filterNotify.notifications;
                                            cntArray.push({...update});
                                            ++send;
                                            if (send === result.length) {
                                                return resolve({cnt: cntArray, cntTotal})
                                            }
                                        } else {
                                            cntArray.push({...update});
                                            ++send;
                                            if (send === result.length) {
                                                return resolve({cnt: cntArray, cntTotal})
                                            }
                                        }
                                    } else {
                                        cntArray.push({...update});
                                        ++send;
                                        if (send === result.length) {
                                            return resolve({cnt: cntArray, cntTotal})
                                        }
                                    }
                                })
                                
                            }
                        }

                        if (curTab === 'private') {
                            for (let cnt of result) {
                                let id = cnt.host === req.user ? cnt.reply : cnt.host;
                                user.findById(id).then(userFnd => {
                                    if (!userFnd) {
                                        authUser.findById(id).then(authFnd => {
                                        if (authFnd) {
                                            fetch(authFnd.username, authFnd.image, authFnd.status, id, cnt, cntArray).then(cnt => {
                                                cntArray = cnt;
                                                ++send;
                                                if (send === result.length) {
                                                   return resolve({cnt: cntArray, cntTotal})
                                                }
                                            })
                                        }
                                        })
                                    } else {
                                        fetch(userFnd.username, userFnd.image, userFnd.status, id,cnt, cntArray).then(cnt => {
                                            cntArray = cnt;
                                            ++send 
                                            if (send === result.length) {
                                                return resolve({cnt: cntArray, cntTotal})
                                            }
                                        })
                                    }
                                })   
                            }
                        }

                        function fetch(username, image,  status, id, cnt, cntArray) {
                            return new Promise((resolve, reject) => {
                                let chats = cnt.chat && cnt.chat.length > 0 ? cnt.chat.reverse() : [];
                                let lastMsg = checkMsg(chats)
                                function checkMsg(chats) {
                                    for (let chatDet of chats) {
                                        if (chatDet.ID !== req.user) {
                                            return  {
                                                created: chatDet.created,
                                                msg: chatDet.cntType !== 'typedPlain' ? chatDet.cntType === 'media' ? 'Video' : chatDet.cntType : chatDet.msg,
                                            }
                                        }
                                    }
                                    return null;
                                }

                                let update ={};
                                update['username'] = username;
                                update['userImage'] = image;
                                update['msg'] = lastMsg ? lastMsg.msg : null,
                                update['created'] = lastMsg ? lastMsg.created : null,
                                update['_id'] = id;
                                update['status'] = status;
                                chatnotifies.findOne({userID: req.user}).then(result => {
                                    if (result && result.member.length > 0) {
                                        for(let notify of result.member) {
                                            if (notify.ID === id) {
                                                update['active'] = notify.notifications;
                                                cntArray.push({...update});
                                                return resolve(cntArray)
                                            }
                                        }
                                        cntArray.push({...update});
                                        return resolve(cntArray)
                                    } else {
                                        cntArray.push({...update});
                                        return resolve(cntArray)
                                    }
                                })
                            })
                        }
                    }).catch(err => {
                        return reject(err)
                    })
                }).catch(err => {
                    return reject(err)
                }) 
            }).catch(err => {
                return reject(err)
            })
        })
    }
});

module.exports = router
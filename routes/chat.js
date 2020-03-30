let express = require('express');
let router = express.Router();
let arraySort = require('array-sort');
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
const {category, grpnotifies, chat, group, user, authUser, connectStatus} = require('../serverDB/serverDB');

router.get('/:categ/:id', authenticate, (req, res,next) => {
    if (!req.params.id || !req.params.categ) {
        res.redirect('/index/group')
        return
    }
    if (req.params.categ === 'group'){
        group.findOne({_id: mongoose.mongo.ObjectId(req.params.id), _isCompleted: true, 
            $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
            if (grp) {
                res.render('groupchat');
            } else {
                res.redirect('/index/group')
            }
        })
    } else {
        let model = req.userType === 'authUser' ? authUser : user;
        model.findOne({_id:  mongoose.mongo.ObjectId(req.user), $or: [ { student: { $in: req.params.id } }, { teacher: { $in: req.params.id} } ]}).then(userDet => {
            if (userDet) {
                res.render('pvtChat');
            } else {
                res.redirect('/index/group');
            }
        })
    }
})

router.post('/:categ/:id', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'chat') {
        let id = req.body.id
        group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
        $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
            if (grp) {
                let chatTotal = grp.chat.length
                let chat = arraySort(grp.chat, 'created', {reverse: true});
                let updateChat =  chat.splice(req.body.skipChat, req.body.chatLimit);
                let allChat = []
                let allChatTotal = 0
                if (updateChat.length < 1) {
                    return res.status(200).send({chat: allChat, chatTotal})
                }
                for (let cnt of updateChat) {
                    let model = cnt.userType === 'authUser' ? authUser : user;
                    model.findById(cnt.ID).then(userDet => {
                        let block = cnt.block ? cnt.block.filter(id => id === req.user) : [];
                        if (!block[0]) {
                            allChat.push({
                                username: userDet.username,
                                image: userDet.image,
                                created: cnt.created,
                                cntType: cnt.cntType,
                                msg: cnt.msg,
                                ID: cnt.ID,
                                chatID: cnt.chatID,
                                format: cnt.format
                            })
                        }
                        ++allChatTotal;
                        if (allChatTotal === updateChat.length) {
                            res.status(200).send({chat: allChat, chatTotal})
                        } 
                    })
                }
                
            } else {
                res.sendStatus(404)
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'userDet') {
        chat.findOne({$or: {$and: [ { host: { $in: req.body.id } }, { reply: { $in: req.user} } ]},  $and: [ { host: { $in: req.user } }, { reply: { $in: req.body.id} } ]}).then(chatDet => {
            let lastMsg = null;
            if (chatDet) {
                lastMsg = chatDet.chat.length > 0 ? chatDet.chat[chatDet.chat.length - 1].msg : null
            }
            user.findOne({_id:  mongoose.mongo.ObjectId(req.body.id), $or: [ { student: { $in: req.user } }, { teacher: { $in: req.user} } ]}).then(userDet => {
                if (userDet) {
                    res.status(200).send({
                        _id: userDet._id,
                        image: userDet.image,
                        username: userDet.username,
                        status: userDet.status,
                        studenttotal: userDet.studenttotal,
                        lastMsg
                    })
                } else {
                    authUser.findOne({_id:  mongoose.mongo.ObjectId(req.body.id), $or: [ { student: { $in: req.user } }, { teacher: { $in: req.user} } ]}).then(authDet => {
                        if (authDet) {
                            res.status(200).send({
                                _id: authDet._id,
                                image: authDet.image,
                                username: authDet.username,
                                status: authDet.status,
                                studenttotal: authDet.studenttotal,
                                lastMsg
                            })
                        }
                    })
                }
            })
        })
    }

    if (req.header !== null && req.header('data-categ') === 'friends') {
        let model = req.userType === 'authUser' ? authUser : user;
        model.findById(req.user).then(userDet => {
            if (userDet) {
                let users = req.body.curTab === 'teacher' ? userDet.teacher : userDet.student;
                if (users.length < 1) {
                    return res.status(200).send(users)
                }
                let cnt = [];
                let userTotal = 0;
                for (let id of users) {
                    getUserDet(id, cnt).then(userFnd => {
                        cnt = userFnd;
                        ++userTotal;
                        if (userTotal === users.length) {
                            res.status(200).send(cnt) 
                        }
                    })
                }
            }

            function getUserDet(id, cnt) {
                return new Promise((resolve, reject) => {
                    user.findById(id).then(userdet => {
                        if (!userDet) {
                            authUser.findById(userID).then(authdet => {
                                cnt.push({
                                    id,
                                    username: authdet.username,
                                    status: authdet.status, 
                                    image: authdet.image,
                                })
                                return resolve(cnt)
                            })
                        } else {
                            cnt.push({
                                id,
                                username: userdet.username,
                                status: userdet.status, 
                                image: userdet.image,
                            })
                           return resolve(cnt)
                        }
                    })
                })
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'groupdet') {
        let id = req.body.id
        group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
        $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
            if (grp) {
                adminDet(grp.authorID).then(adminDet => {
                    let update = {};
                    let isMember = req.user ? grp.member.filter(userID => userID === req.user) : [];
                    if (isMember.length > 0) {
                        update['member'] = true
                    } else {
                        update['member'] = false
                    }
                    let isRequest = req.user ? grp.request.filter(userID => userID === req.user) : [];
                    if (isRequest.length > 0) {
                        update['request'] = true
                    } else {
                        update['request'] = false
                    }
                    update['username'] = adminDet.username;
                    update['studenttotal'] = adminDet.studenttotal;
                    update['userImage'] = adminDet.image;
                    update['status'] = adminDet.status;
                    update['userOpt'] = grp.authorID === req.user;
                    update['authorID'] = grp.authorID;
                    update['category'] = grp.category;
                    update['desc'] = grp.desc;
                    update['image'] = grp.image;
                    update['members'] = grp.member.length + 1;
                    update['groupCreated'] = grp.groupCreated;
                    update['title'] = grp.title;
                    update['requestTotal'] = grp.request.length;
                    update['online'] = grp.online.length,
                    update['_id'] = grp._id;
                    res.status(200).send(update)
                })
                
            } else {
                res.sendStatus(404)
            }
        })
        return 
    }

    function adminDet(userID) {
        return new Promise((resolve, reject) => {
            user.findById(userID).then(userFnd => {
                if (!userFnd) {
                    authUser.findById(userID).then(authFnd => {
                        resolve({
                            username: authFnd.username,
                            studenttotal: authFnd.studenttotal, 
                            image: authFnd.image,
                            status: authFnd.status
                         }) 
                    })
                } else {
                    resolve({
                        username: userFnd.username,
                        studenttotal: userFnd.studenttotal, 
                        image: userFnd.image,
                        status: userFnd.status
                    })
                }
            })
        })
    }
});

module.exports = router

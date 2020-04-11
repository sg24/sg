let express = require('express');
let router = express.Router();
let arraySort = require('array-sort');
let mongoose = require('mongoose');
let fs = require('fs');

let formidable = require('formidable');
let uploadStream = require('./utility/uploadStream')
let savetemp = require('./utility/savetemp');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
let formInit = require('./utility/forminit');
let deleteMedia = require('./utility/deletemedia');
const {category, chatnotifies, grpchatnotifies, tempFile,chat, group, user, authUser, connectStatus} = require('../serverDB/serverDB');

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
                res.render('pvtchat');
            } else {
                res.redirect('/index/user');
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
                                format: cnt.format,
                                position: cnt.position,
                                reply: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? [] : cnt.reply : cnt.reply,
                                delete: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? true : false : cnt.delete
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

    if (req.header !== null && req.header('data-categ') === 'member') {
        let model = req.userType === 'authUser' ? authUser : user;
           model.findById(req.user).then(userDet => {
               let members = [...userDet.teacher, ...userDet.student];
               let memberTotal = 0;
               let cntFnd = {cnt: [], online: 0, offline: 0};
               if (members.length < 1) {
                   return res.status(200).send(cntFnd)
               }
               for (let userID of members) {
                    let lastMsg = null;
                    chat.findOne({$or: [{$and: [ { host: { $in: req.user } }, { reply: { $in: userID} } ]}, {$and: [ { host: { $in: userID } }, { reply: { $in: req.user} }]}]}).then(chatCnt => {
                        if (chatCnt && chatCnt.chat.length > 0) {
                            let msg = arraySort(chatCnt.chat, 'created', {reverse: true})
                            lastMsg = checkMsg(msg);
                            function checkMsg(msg) {
                                for (let cnt of msg) {
                                    if (cnt.ID === userID) {
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
                        userFnd(userID, lastMsg, cntFnd).then(cntArray => {
                            cntFnd = cntArray;
                            ++memberTotal;
                            if (memberTotal === members.length) {
                                res.status(200).send(cntFnd)
                            }
                        })
                    }).catch(err => {
                        res.sendStatus(500)
                    })
               }

               function userFnd(id, lastMsg, cntFnd) {
                   return new Promise((resolve, reject) => {
                        user.findOne({_id:  mongoose.mongo.ObjectId(id)}).then(userDet => {
                            if (userDet) {
                                let msg = lastMsg ? {msg: lastMsg.msg, created: lastMsg.created} : {}
                                cntFnd.cnt.push({
                                    id: userDet._id,
                                    image: userDet.image,
                                    username: userDet.username,
                                    status: userDet.status,
                                    ...msg
                                })
                                if (userDet.status) {
                                    cntFnd.online = cntFnd.online + 1
                                } else {
                                    cntFnd.offline = cntFnd.offline + 1
                                }
                                resolve(cntFnd)
                            } else {
                                authUser.findOne({_id:  mongoose.mongo.ObjectId(id)}).then(authDet => {
                                    if (authDet) {
                                        let msg = lastMsg ? {msg: lastMsg.msg, created: lastMsg.created} : {}
                                        cntFnd.cnt.push({
                                            id: authDet._id,
                                            image: authDet.image,
                                            username: authDet.username,
                                            status: authDet.status,
                                            ...msg
                                        })
                                        if (authDet.status) {
                                            cntFnd.online = cntFnd.online + 1
                                        } else {
                                            cntFnd.offline = cntFnd.offline + 1
                                        }
                                        resolve(cntFnd)
                                    } else {
                                        reject('not found')
                                    }
                                })
                            }
                        })
                   })
               }
           })
    }

    if (req.header !== null && req.header('data-categ') === 'pvtchat') {
        let id = req.body.id
        chat.findOne({$or: [{$and: [ { host: { $in: req.body.id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: req.body.id} }]}]}).then(chatDet => {
            if (chatDet) {
                let chatTotal = chatDet.chat.length
                let chat = arraySort(chatDet.chat, 'created', {reverse: true});
                let updateChat =  chat.splice(req.body.skipChat, req.body.chatLimit);
                let allChat = []
                let allChatTotal = 0
                if (updateChat.length < 1) {
                    return res.status(200).send({chat: allChat, chatTotal})
                }
                for (let cnt of updateChat) {
                    let model = cnt.userType === 'authUser' ? authUser : user;
                    model.findById(cnt.ID).then(userDet => {
                        allChat.push({
                            username: userDet.username,
                            image: userDet._id.toHexString() !== req.user,
                            created: cnt.created,
                            cntType: cnt.cntType,
                            msg: cnt.msg,
                            ID: cnt.ID,
                            chatID: cnt.chatID,
                            format: cnt.format,
                            position: cnt.position,
                            reply: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? [] : cnt.reply : cnt.reply,
                            delete: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? true : false : cnt.delete
                        })
                        ++allChatTotal;
                        if (allChatTotal === updateChat.length) {
                            res.status(200).send({chat: allChat, chatTotal})
                        } 
                    })
                }
                
            } else {
                res.status(200).send({chat: [], chatTotal: 0})
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'userdet') {
        chat.findOne({$or: [{$and: [ { host: { $in: req.body.id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: req.body.id} }]}]}).then(chatDet => {
            let lastMsg = null;
            if (chatDet) {
                let msgCnt = null;
                let msg = chatDet.chat.length > 0 ? arraySort(chatDet.chat, 'created', {reverse: true}) : null;
                lastMsg = checkMsg(msg);
                function checkMsg(msg) {
                    for (let cnt of msg) {
                        if (cnt.ID === req.body.id) {
                            return {
                                msg: cnt.msg,
                                created: cnt.created
                            }
                        }
                    }
                    return null
                }
            }

            chatnotifies.findOne({userID: req.user}).then(notify => {
                let member = [];
                if (notify) {
                    let filterNotify = notify.member.filter(userdet => userdet.ID === req.body.id)[0];
                    member = notify.member;
                    if (filterNotify) {
                        let cloned = JSON.parse(JSON.stringify(filterNotify));
                        let update = {...cloned}
                        let updateCnt = {
                            ...update,
                            notifications: 0
                        };
                        member = notify.member.filter(userdet => userdet.ID !== req.body.id);
                        member.push(updateCnt);
                    }
                }

                chatnotifies.findOneAndUpdate({userID: req.user}, {member}).then(() => {        
                    user.findOne({_id:  mongoose.mongo.ObjectId(req.body.id), $or: [ { student: { $in: req.user } }, { teacher: { $in: req.user} } ]}).then(userDet => {
                        if (userDet) {
                            let msg = lastMsg ? {msg: lastMsg.msg, created: lastMsg.created} : {}
                            res.status(200).send({
                                _id: userDet._id,
                                image: userDet.image,
                                username: userDet.username,
                                status: userDet.status,
                                offline: userDet.offline,
                                studenttotal: userDet.studenttotal,
                                ...msg
                            })
                        } else {
                            authUser.findOne({_id:  mongoose.mongo.ObjectId(req.body.id), $or: [ { student: { $in: req.user } }, { teacher: { $in: req.user} } ]}).then(authDet => {
                                if (authDet) {
                                    let msg = lastMsg ? {msg: lastMsg.msg, created: lastMsg.created} : {}
                                    res.status(200).send({
                                        _id: authDet._id,
                                        image: authDet.image,
                                        username: authDet.username,
                                        status: authDet.status,
                                        offline: authDet.offline,
                                        studenttotal: authDet.studenttotal,
                                        ...msg
                                    })
                                } else {
                                    res.sendStatus(400)
                                }
                            })
                        }
                    })
                })
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
            }

            function getUserDet(id, cnt, lastMsg, notifications) {
                return new Promise((resolve, reject) => {
                    user.findById(id).then(userdet => {
                        if (!userDet) {
                            authUser.findById(userID).then(authdet => {
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

    if(req.header !== null && req.header('data-categ') === 'pvtcreateChat'){
        let id = req.params.id;
        let cnt = req.body;
        let model = req.userType === 'authUser' ? authUser : user;
        model.findOne({_id:  mongoose.mongo.ObjectId(req.user), $or: [ { student: { $in: id } }, { teacher: { $in: id} } ]}).then(userDet => {
            if (userDet) {
                let chats = {
                    ID: req.user,
                    userType: req.userType,
                    cntType: 'typedPlain',
                    msg: cnt.msg,
                    chatID: cnt.chatID,
                    format: 'typedPlain'
                }
                saveFile(id, chats).then((result) => {
                    res.status(200).send(result)
                }).catch(err =>{
                    res.status(500).send(err)
                })
            } else {
                res.status(500).send(err)
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
                    for (let chat of chats) {
                        if (chat.cntType === 'typedPlain') {
                            lastMsg = chat.msg
                        }
                    }
                    update['lastChat'] = lastMsg;
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

    if(req.header !== null && req.header('data-categ') === 'uploadmedia'){
        formInit(req, formidable).then(form => {
            let files = form.files && form.files.media ? form.files.media.length === undefined ? [form.files.media] : form.files.media : []
            let fields = form.fields;
            for (let file of files) {
                savetemp({path: file.path, type: fields.type, name: file.name}, [], req.user).then(tempFileID => {
                    let doc = {
                        path: file.path,
                        bucketName: fields.type,
                        filename: file.name
                    }
                    uploadStream(doc).then((fileDet) => {
                        if (fileDet) {
                            let chats = {
                                ID: req.user,
                                userType: req.userType,
                                cntType: fields.type,
                                msg: fileDet._id,
                                chatID: fields.chatID,
                                format: fields.format
                            }
                            tempFile.findByIdAndRemove(tempFileID).then(() => {
                                saveFile(req.params.id, chats).then((result) => {
                                    res.status(200).send(result)
                                }).catch(err =>{
                                    res.status(500).send(err)
                                })
                            })
                        } else {
                            res.sendStatus(500)
                        }
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                })
            }
        })

    }

    if (req.header('data-categ') && req.header('data-categ') === 'chatActive') {
        chatnotifies.findOne({userID: req.user}).then(notifyCnt => {
            let notifications = {
                pvtchat: null,
                grpchat: null
            };
            if (notifyCnt && notifyCnt.member && notifyCnt.member.length > 0 ) {
                 for (let cnt of notifyCnt.member) {
                     notifications.pvtchat +=  cnt.notifications;
                 }
                 grpchatnotifies.findOne({userID: req.user}).then(notifyCnt => {
                    if (notifyCnt && notifyCnt.grp && notifyCnt.grp.length > 0 ) {
                        for (let cnt of notifyCnt.grp) {
                            notifications.grpchat += cnt.notifications;
                        }
                    }
                    res.status(200).send(notifications)
                })
            }
         }).catch(err =>{
             res.sendStatus(500)
         })
    }

    if (req.header !== null && req.header('data-categ') === 'createChat') {
        let id = req.params.id;
        let cnt = req.body;
        let chat = {
            ID: req.user,
            userType: req.userType,
            cntType: 'typedPlain',
            msg: cnt.msg,
            chatID: cnt.chatID,
            format: 'typedPlain'
        }
        saveChatFile(id, chat).then((result) => {
            res.status(200).send(result)
        }).catch(err =>{
            res.status(500).send(err)
        })
    }

    if (req.header !== null && req.header('data-categ') === 'setLastMsg') {
        let id = req.params.id;
        group.findOne({_id:  mongoose.mongo.ObjectId(id),_isCompleted: true, 
            $or: [ { member: { $in: req.user} }, 
                { authorID:  req.user } ]}).then(grp => {
            let chats = arraySort(grp.chat, 'created', {reverse: true});
            let lastMsg = []
            for (let userID of [...grp.member, grp.authorID]) {
                if (checkChat(userID, chats)) {
                    let cnt = checkChat(userID, chats);
                    if (cnt) {
                        lastMsg.push({userID, msgCnt: {msg: cnt.msg, created: cnt.created}})
                    }
                }
            }
            
            group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}, {
                    lastMsg}).then(() => {
                    res.sendStatus(200)
            }).catch(err => {
                res.status(500).send(err)
            })

            function checkChat(userID, chats) {
                for (let chat of chats) {
                    if (chat.ID === userID) {
                        let updateCnt = chat.reply && chat.reply.length > 0 ? chat.reply[chat.reply.length - 1] : chat;
                        return {
                            msg: updateCnt.cntType !== 'typedPlain' ? updateCnt.cntType === 'media' ? 'Video' : updateCnt.cntType : updateCnt.msg,
                            created: updateCnt.created
                        }
                    }
                }
                return null
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'deleteChat') {
       let id = req.params.id;
       let cnt = req.body.cnt;
        group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
            $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
            if (grp) {
                let chats = grp.chat;
                if (chats && chats.length > 0) {
                    let deleteTotal = 0;
                    let curIndex = 0;
                    for (let chatID of cnt) {
                        let filterCnt = chats.filter((chat, index)=> {
                            if (chat.chatID === chatID) {
                                curIndex = index;
                                return true;
                            }
                            return false;
                        })[0];
                        if (filterCnt && (filterCnt.ID === req.user)) {
                            let cloned = JSON.parse(JSON.stringify(filterCnt));
                            let update = {...cloned, delete: true, reply: [], msg: null}
                            chats[curIndex] = update;
                            if (filterCnt && (filterCnt.cntType !== 'typedPlain')) {
                                deleteMedia([{id: filterCnt.msg }], filterCnt.cntType).then(() => {
                                    if (filterCnt.reply && filterCnt.reply.length > 0) {
                                        for (let replyCnt of filterCnt.reply) {
                                            if (replyCnt.cntType !== 'typedPlain') {
                                            deleteMedia([{id: replyCnt.msg }], replyCnt.cntType).then(() => {
                                                ++deleteTotal;
                                                if (cnt.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnt)
                                                    })
                                                }
                                            })
                                            } else {
                                                ++deleteTotal;
                                                if (cnt.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnt)
                                                    })
                                                }
                                            }
                                        }
                                    } else {
                                        ++deleteTotal;
                                        if (cnt.length === deleteTotal) {
                                            updateChat(id, chats).then(() => {
                                                res.status(200).send(cnt)
                                            })
                                        }
                                    }
                                    
                                })
                            } else {
                                if (filterCnt.reply && filterCnt.reply.length > 0) {
                                    for (let replyCnt of filterCnt.reply) {
                                        if (replyCnt.cntType !== 'typedPlain') {
                                            deleteMedia([{id: replyCnt.msg }], replyCnt.cntType).then(() => {
                                                ++deleteTotal;
                                                if (cnt.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnt)
                                                    })
                                                }
                                            })
                                        } else {
                                                ++deleteTotal;
                                                if (cnt.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnt)
                                                    })
                                                }
                                        }
                                    }
                                } else {
                                    ++deleteTotal;
                                    if (cnt.length === deleteTotal) {
                                        updateChat(id, chats).then(() => {
                                            res.status(200).send(cnt)
                                        })
                                    }
                                }
                                
                            }
                        } else {
                            if (filterCnt) {
                                ++deleteTotal;
                                let block = filterCnt.block ? filterCnt.block.concat(req.user) : [req.user];
                                block = [...new Set(block)]
                                let cloned = JSON.parse(JSON.stringify(filterCnt));
                                let update = {...cloned, block}
                                chats[curIndex] = update;
                                if (cnt.length === deleteTotal) {
                                    updateChat(id, chats).then(() => {
                                        res.status(200).send(cnt)
                                    }).catch(err => {
                                        res.status(500).send(err)
                                    })
                                }
                            } else {
                                res.status(200).send(cnt)
                            }
                        }
                    }
                }
            } else {
                res.sendStatus(400)
            }
        })
       function updateChat (id, chat) {
            return new Promise((resolve, reject) => {
                group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                    $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}, {
                    chat }).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }

    if (req.header !== null && req.header('data-categ') === 'members') {
        let id = req.params.id;
        group.findOne({_id:  mongoose.mongo.ObjectId(id),_isCompleted: true, 
            $or: [ { member: { $in: req.user} }, 
                { authorID:  req.user } ]}).then(grp => {
            if (grp) {
                grp = JSON.parse(JSON.stringify(grp))
                let memberDet = {users: {online: [], offline: [], onlineOnly: []},online: 0,offline: 0};
                let memberTotal = 0;
                let member = [...grp.member, grp.authorID];
                for(let userID  of member) {
                    fetchMember(userID, grp.lastMsg, grp.authorID, grp._id, memberDet).then(members => {
                        memberDet = members;
                        ++memberTotal;
                        if (memberTotal === member.length) {
                            group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true}, {
                                online: memberDet.users.onlineOnly,
                            }).then(() => {
                                res.status(200).send(memberDet)
                            })
                        }
                    })
                }
            } else {
                res.status(200).send([])
            }
        })

        function fetchMember(userID, grp, authorID, id,cnt ) {
            return new Promise((resolve,reject) => {
                user.findById(userID).then(userFnd => {
                    if (!userFnd) {
                        authUser.findById(userID).then(authFnd => {
                            lastChat(userID, grp, id).then(msgCnt => {
                                let msg = msgCnt ? {cnt: msgCnt.msg, created: msgCnt.created}: {cnt: null, created: null};
                                if (authFnd.status) {
                                    cnt.users.online.push({
                                        id: userID,
                                        username: authFnd.username,
                                        status: authFnd.status, 
                                        image: authFnd.image,
                                        created: msg.created,
                                        msg: msg.cnt,
                                        isAdmin: userID === authorID
                                    })
                                    cnt.users.onlineOnly.push({
                                        id: userID
                                    })
                                } else {
                                    cnt.users.offline.push({
                                        id: userID,
                                        username: authFnd.username,
                                        status: authFnd.status, 
                                        image: authFnd.image,
                                        created: msg.created,
                                        msg: msg.cnt,
                                        isAdmin: userID === authorID
                                    })
                                }
                                authFnd.status ? cnt.online = cnt.online + 1 : cnt.offline = cnt.offline + 1
                                resolve(cnt)
                            })  
                        })
                    } else {
                        lastChat(userID, grp, id).then(msgCnt => {
                            let msg = msgCnt ? {cnt: msgCnt.msg, created: msgCnt.created}: {cnt: null, created: null};
                            if (userFnd.status) {
                                cnt.users.online.push({
                                    id: userID,
                                    username: userFnd.username,
                                    status: userFnd.status, 
                                    image: userFnd.image,
                                    created: msg.created,
                                    msg: msg.cnt,
                                    isAdmin: userID === authorID
                                })
                                cnt.users.onlineOnly.push({
                                    id: userID
                                })
                            } else {
                                cnt.users.offline.push({
                                    id: userID,
                                    username: userFnd.username,
                                    status: userFnd.status, 
                                    image: userFnd.image,
                                    created: msg.created,
                                    msg: msg.cnt,
                                    isAdmin: userID === authorID
                                })
                            }
                            userFnd.status ? cnt.online = cnt.online + 1 : cnt.offline = cnt.offline + 1
                            resolve(cnt)
                        })  
                    }
                }) 
            })
        }

        function lastChat (userID, lastMsg) {
            return new Promise((resolve, reject) => {
                if (lastMsg && lastMsg.length > 0) {
                    for (let msg of lastMsg) {
                        if (msg.userID === userID) {
                            return resolve(msg.msgCnt);
                        }
                    }
                }
                resolve(null)
            })
        }
    }

    if (req.header !== null && req.header('data-categ') === 'pvtDeleteChat') {
        let id = req.params.id;
        let cnt = req.body.cnt
        chat.findOne({$or: [{$and: [ { host: { $in: req.user } }, { reply: { $in: id} } ]}, {$and: [ { host: { $in: id } }, { reply: { $in: req.user} }]}]}).then(chatDet => {
            if (chatDet) {
                let chats = chatDet.chat;
                if (chats && chats.length > 0) {
                    let deleteTotal = 0;
                    let curIndex = 0;
                    for (let chatID of cnt) {
                        let filterCnt = chats.filter((chat, index)=> {
                            if (chat.chatID === chatID) {
                                curIndex = index;
                                return true;
                            }
                            return false;
                        })[0];
                        if (filterCnt && (filterCnt.ID === req.user)) {
                            let cloned = JSON.parse(JSON.stringify(filterCnt));
                            let update = {...cloned, delete: true, reply: [], msg: null}
                            chats[curIndex] = update;
                            if (filterCnt && (filterCnt.cntType !== 'typedPlain')) {
                                deleteMedia([{id: filterCnt.msg }], filterCnt.cntType).then(() => {
                                   if (filterCnt.reply && filterCnt.reply.length > 0) {
                                       for (let replyCnt of filterCnt.reply) {
                                           if (replyCnt.cntType !== 'typedPlain') {
                                            deleteMedia([{id: replyCnt.msg }], replyCnt.cntType).then(() => {
                                                ++deleteTotal;
                                                if (cnt.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnt)
                                                    })
                                                }
                                            })
                                           } else {
                                                ++deleteTotal;
                                                if (cnt.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnt)
                                                    })
                                                }
                                           }
                                       }
                                   } else {
                                        ++deleteTotal;
                                        if (cnt.length === deleteTotal) {
                                            updateChat(id, chats).then(() => {
                                                res.status(200).send(cnt)
                                            })
                                        }
                                   }
                                   
                                })
                            } else {
                                if (filterCnt.reply && filterCnt.reply.length > 0) {
                                    for (let replyCnt of filterCnt.reply) {
                                        if (replyCnt.cntType !== 'typedPlain') {
                                         deleteMedia([{id: replyCnt.msg }], replyCnt.cntType).then(() => {
                                             ++deleteTotal;
                                             if (cnt.length === deleteTotal) {
                                                 updateChat(id, chats).then(() => {
                                                    res.status(200).send(cnt)
                                                 })
                                             }
                                         })
                                        } else {
                                             ++deleteTotal;
                                             if (cnt.length === deleteTotal) {
                                                 updateChat(id, chats).then(() => {
                                                    res.status(200).send(cnt)
                                                 })
                                             }
                                        }
                                    }
                                } else {
                                    ++deleteTotal;
                                    if (cnt.length === deleteTotal) {
                                        updateChat(id, chats).then(() => {
                                            res.status(200).send(cnt)
                                        })
                                    }
                                }
                               
                            }
                        } else {
                            if (filterCnt) {
                                ++deleteTotal;
                                let block = filterCnt.block ? filterCnt.block.concat(req.user) : [req.user];
                                block = [...new Set(block)]
                                let cloned = JSON.parse(JSON.stringify(filterCnt));
                                let update = {...cloned, block}
                                chats[curIndex] = update;
                                if (cnt.length === deleteTotal) {
                                    updateChat(id, chats).then(() => {
                                        res.status(200).send(cnt)
                                    }).catch(err => {
                                        res.status(500).send(err)
                                    })
                                }
                            } else {
                                res.status(200).send(cnt)
                            }
                        }
                    }
                }
            } else {
                res.sendStatus(400)
            }
        })
        function updateChat (id, chats) {
            return new Promise((resolve, reject) => {
                chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: id} }]}]}, {
                    chat: chats}).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }

    if (req.header !== null && req.header('data-categ') === 'pvtconv') {
        let model = req.userType === 'authUser' ? authUser : user;
        model.findById(req.user).then(cntDet => {
            let members = cntDet ? [...cntDet.teacher, ...cntDet.student] : [];
            let memberTotal = 0;
            let cntFnd = {cnt: [], online: 0, offline: 0};
            if (members.length < 1) {
                return res.status(200).send(cntFnd)
            }
            for (let userID of members) {
                let lastMsg = null;
                chat.findOne({$or: [{$and: [ { host: { $in: req.user } }, { reply: { $in: userID} } ]}, {$and: [ { host: { $in: userID } }, { reply: { $in: req.user} }]}]}).then(chatCnt => {
                    if (chatCnt && chatCnt.chat.length > 0) {
                        let msg = arraySort(chatCnt.chat, 'created', {reverse: true})
                        lastMsg = checkMsg(msg);
                        function checkMsg(msg) {
                            for (let cnt of msg) {
                                if (cnt.ID === userID) {
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
                    userFnd(userID, lastMsg, cntFnd).then(cntArray => {
                        cntFnd = cntArray;
                        ++memberTotal;
                        if (memberTotal === members.length) {
                            res.status(200).send(cntFnd)
                        }
                    })
                }).catch(err =>{
                    res.status(500).send(err)
                })
            }

            function userFnd(id, lastMsg, cntFnd) {
                return new Promise((resolve, reject) => {
                    user.findOne({_id:  mongoose.mongo.ObjectId(id)}).then(userDet => {
                        if (userDet) {
                            let msg = lastMsg ? {msg: lastMsg.msg, created: lastMsg.created} : {}
                            cntFnd.cnt.push({
                                id: userDet._id,
                                image: userDet.image,
                                username: userDet.username,
                                status: userDet.status,
                                studenttotal: userDet.studenttotal,
                                ...msg
                            })
                            if (userDet.status) {
                                cntFnd.online = cntFnd.online + 1
                            } else {
                                cntFnd.offline = cntFnd.offline + 1
                            }
                            resolve(cntFnd)
                        } else {
                            authUser.findOne({_id:  mongoose.mongo.ObjectId(id)}).then(authDet => {
                                if (authDet) {
                                    let msg = lastMsg ? {msg: lastMsg.msg, created: lastMsg.created} : {}
                                    cntFnd.cnt.push({
                                        id: authDet._id,
                                    
                                        image: authDet.image,
                                        username: authDet.username,
                                        status: authDet.status,
                                        studenttotal: authDet.studenttotal,
                                        ...msg
                                    })
                                    if (authDet.status) {
                                        cntFnd.online = cntFnd.online + 1
                                    } else {
                                        cntFnd.offline = cntFnd.offline + 1
                                    }
                                    resolve(cntFnd)
                                } else {
                                    reject('Not Found')
                                }
                            })
                        }
                    })
                })
            }
        })
    }

    if(req.header !== null && req.header('data-categ') === 'uploadcntmedia'){
        formInit(req, formidable).then(form => {
            let files = form.files && form.files.media ? form.files.media.length === undefined ? [form.files.media] : form.files.media : []
            let fields = form.fields;
            for (let file of files) {
                savetemp({path: file.path, type: fields.type, name: file.name}, [], req.user).then(tempFileID => {
                    let doc = {
                        path: file.path,
                        bucketName: fields.type,
                        filename: file.name
                    }
                    uploadStream(doc).then((fileDet) => {
                        if (fileDet) {
                            let chats = {
                                ID: req.user,
                                userType: req.userType,
                                cntType: fields.type,
                                msg: fileDet._id,
                                chatID: fields.chatID,
                                format: fields.format
                            }
                            tempFile.findByIdAndRemove(tempFileID).then(() => {
                                saveChatFile(req.params.id, chats).then((result) => {
                                    res.status(200).send(result)
                                }).catch(err =>{
                                    res.status(500).send(err)
                                })
                            })
                        } else {
                            res.sendStatus(500)
                        }
                    }).catch(err => {
                        res.status(500).send(err)
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
                grpchatnotifies.findOne({userID: req.user}).then(notify => {
                    let grpnotify = [];
                    if (notify) {
                        let filterNotify = notify.grp.filter(grpdet => grpdet.ID === id)[0];
                        grpnotify = notify.grp;
                        if (filterNotify) {
                            let cloned = JSON.parse(JSON.stringify(filterNotify));
                            let update = {...cloned}
                            let updateCnt = {
                                ...update,
                                notifications: 0
                            };
                            grpnotify = notify.grp.filter(grpdet => grpdet.ID !== id);
                            grpnotify.push(updateCnt);
                        }
                    }
    
                    grpchatnotifies.findOneAndUpdate({userID: req.user}, {grp: grpnotify}).then(() => {        
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
                    })
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
    
    function notify(userID, ID) {
        return new Promise((resolve, reject) => {
            chatnotifies.findOne({userID}).then(result => {
                if (result) {
                    let member = result.member.filter(user => user.ID === ID);
                    if (member.length < 1) {
                        chatnotifies.findOneAndUpdate({userID}, {
                            $push: {member: {ID, notifications: 1 }}
                        }).then(() => {
                            resolve()
                        })
                    } else {
                        let removeNotify = result.member.filter(user => user.ID !== ID);
                        let updateNotify = member[0] ;
                        updateNotify.notifications = updateNotify.notifications + 1;
                        removeNotify.push(updateNotify);
                        chatnotifies.findOneAndUpdate({userID}, {member: removeNotify }).then(() => {
                            resolve()
                        })
                    }
                } else {
                    let nof = new chatnotifies({
                        userID,
                        member: [{
                            ID,
                            notifications: 1
                        }]
                    })
                    nof.save().then(() => {
                        resolve()
                    })
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    function saveFile(id, chats) {
        return new Promise((resolve, reject) => {
            let model =  req.userType === 'authUser' ? authUser : user;
            model.findById(req.user).then(userDet => {
                chat.findOne({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: id} }]}]}).then(chatDet => {
                    if (chatDet) {
                        let position = chatDet.lastID && chatDet.lastID === req.user ? chatDet.position : chatDet.position + 1;
                        chats['position'] = position;
                        if (chatDet.lastID && chatDet.lastID === req.user) {
                            let updateChat = chatDet.chat
                            let lastChat = updateChat[updateChat.length - 1];
                            if (lastChat && (chatDet.lastID === lastChat.ID)) {
                                chats['mainID'] = lastChat.chatID;
                                if (!lastChat.delete) {
                                    lastChat.reply.push(chats);
                                } else {
                                    lastChat['delete'] = false;
                                    lastChat = {...chats, chatID: lastChat.chatID}
                                }
                                updateChat[updateChat.length - 1] = lastChat;
                                chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: id} }]}]}, {
                                chat: updateChat, lastID: req.user, position}).then(grp => {
                                    save(lastChat, userDet, id, req.user, position).then(cnt => {
                                        resolve(cnt)
                                    })
                                })
                            } else {
                                chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: id} }]}]}, {
                                    $push: {chat: chats}, lastID: req.user, position}).then(grp => {
                                    save(chats, userDet, id, req.user, position).then(cnt => {
                                        resolve(cnt)
                                    })
                                })
                            }
                        } else {
                            chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: req.user} } ]}, {$and: [ { host: { $in: req.user } }, { reply: { $in: id} }]}]}, {
                                $push: {chat: chats}, lastID: req.user, position}).then(grp => {
                                save(chats, userDet, id, req.user, position).then(cnt => {
                                    resolve(cnt)
                                })
                            })
                        }
                    } else {
                        let create = new chat({
                            host: req.user,
                            reply: id,
                            chat: [{
                                ...chats,
                                position: 0
                            }],
                            lastID: req.user
                        })
                        create.save().then(() => {
                            save(chats, userDet, id, req.user, 0).then(cnt => {
                                resolve(cnt)
                            })
                        })
                    }
                })
            }).catch(err => {
                reject(err)
            })
        })
    }

    function save (chat, userDet, userID, id, position) {
        return new Promise((resolve, reject) => {
            let cloned = JSON.parse(JSON.stringify(chat));
            let update = {...cloned}
            update['username'] = userDet.username;
            update['position'] = position;
            update['image'] = false;
            update['reply'] = update.reply ? update.reply : [];
            user.findById(userID).then(res => {
                if (!res) {
                    authUser.findById(userID).then(authRes => {
                        if (!authRes.status) {
                            notify(userID, id).then(() => {
                                let msg = chat.cntType !== 'typedPlain' ? `${chat.cntType} chat` : chat.msg
                                pushNotify(id, userID, 'user', chat.username, msg).then(() => {
                                    resolve([update])
                                })
                            })
                        } else {
                            resolve([update])
                        }
                    })
                } else {
                    if (!res.status) {
                        notify(userID, id).then(() => {
                            let msg = chat.cntType !== 'typedPlain' ? `${chat.cntType} chat` : chat.msg
                            pushNotify(id, userID, 'user', chat.username, msg).then(() => {
                                resolve([update])
                            })
                        })
                    } else {
                        resolve([update])
                    }
                }
            })
        })
    }

function pushNotify(id, userID, field, name, msg) {
    return new Promise((resolve, reject) => {
        let allSubscription = [];
        user.find({_id: userID}).then(users => {
            let fndUsers = users ? users : []
            allSubscription.push(...fndUsers);
            authUser.find({_id: userID}).then(authUsers => {
                let fndAuthUser = authUsers ? authUsers : [];
                allSubscription.push(...fndAuthUser);
                let send = 0;
                if (allSubscription && allSubscription.length < 1) {
                    resolve();
                    return
                }

                for (let subUsers of allSubscription) {
                    if (subUsers.enableNotification) {
                        var pushConfig = {
                            endpoint: subUsers.subscription[0].endpoint,
                            keys: {
                            auth: subUsers.subscription[0].keys.auth,
                            p256dh: subUsers.subscription[0].keys.p256dh
                            }
                        };
                        var pushOptions = {
                            vapidDetails: {
                                subject: "https://slodge24.com",
                                privateKey: subUsers.pushMsg[0].privatekey,
                                publicKey: subUsers.pushMsg[0].publickey
                            },
                            headers: {}
                        };
                        let isImage = content.image && content.image.length > 0 ? {image:  content.image[0]} : {}; 
                        webpush.sendNotification(pushConfig, JSON.stringify({
                            title: msg,
                            content: `from ${name}`,
                            openUrl: `/chat/${field}/${id}`
                        }), pushOptions).then(() => {
                            ++send;
                            if (send === allSubscription.length) {
                                resolve()
                            }
                        })
                        .catch((err) => {
                            ++send;
                            if (send === allSubscription.length) {
                                resolve()
                            }
                        })
                    } else {
                        ++send;
                        if (send === allSubscription.length) {
                            resolve()
                        }
                    }
                }
            })
        })
    })
    }

    function notifyChat(userID, grpID, members) {
        return new Promise((resolve, reject) => {
            grpchatnotifies.findOne({userID}).then(result => {
                if (result) {
                    let grpCnt = result.grp.filter(grpDet => grpDet.ID === grpID);
                    if (grpCnt.length < 1) {
                        grpchatnotifies.findOneAndUpdate({userID}, {
                            $push: {grp: {ID: grpID, notifications: 1}}
                        }).then(() => {
                            members.push(userID)
                            resolve(members)
                        })
                    } else {
                        let removeGrpNotify = result.grp.filter(grpDet => grpDet.ID !== grpID);
                        let updateGrpNotify = grpCnt[0] ;
                        updateGrpNotify.notifications = updateGrpNotify.notifications + 1;
                        removeGrpNotify.push(updateGrpNotify);
                        grpchatnotifies.findOneAndUpdate({userID}, {grp: removeGrpNotify }).then(() => {
                            members.push(userID)
                            resolve(members)
                        })
                    }
                } else {
                    let grpNof = new grpchatnotifies({
                        userID,
                        grp: {
                            ID: grpID,
                            notifications: 1
                        } 
                    })
                    grpNof.save().then(() => {
                        members.push(userID)
                        resolve(members)
                    })
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
    
    function saveChatFile(id, chat) {
        return new Promise((resolve, reject) => {
            let model =  req.userType === 'authUser' ? authUser : user;
            model.findById(req.user).then(userDet => {
                group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                    $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
                    if (grp) {
                        let position = grp.lastID && grp.lastID === req.user ? grp.position : grp.lastID === '' || !grp.lastID ? 0  : grp.position + 1;
                        chat['position'] = position;
                        if (grp.lastID && grp.lastID === req.user) {
                            let updateChat = grp.chat
                            let lastChat = updateChat[updateChat.length - 1];
                            if ( lastChat && (grp.lastID === lastChat.ID)) {
                                chat['mainID'] = lastChat.chatID;
                                if (!lastChat.delete) {
                                    lastChat.reply.push(chat);
                                } else {
                                    lastChat['delete'] = false;
                                    lastChat = {...chat, chatID: lastChat.chatID}
                                }
                                updateChat[updateChat.length - 1] = lastChat;
                                group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                                $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}, {
                                    chat: updateChat, lastID: req.user, position, $addToSet: { active : req.user }}).then(() => {
                                    saveChat(grp, id, lastChat, userDet, position).then(cnt => {
                                        resolve(cnt)
                                    })        
                                })
    
                            } else {
                                group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                                    $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}, {
                                    $push: {chat}, lastID: req.user, position, $addToSet: { active : req.user }}).then(() => {
                                    saveChat(grp, id, chat, userDet, position).then(cnt => {
                                        resolve(cnt)
                                    })        
                                })
                            }
                        } else {
                            group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                                $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}, {
                                $push: {chat}, lastID: req.user, position, $addToSet: { active : req.user }}).then(() => {
                                saveChat(grp, id, chat, userDet, position).then(cnt => {
                                    resolve(cnt)
                                })        
                            })
                        }
                        
                    } else {
                        reject('No Group found')
                    } 
                })
            }).catch(err => {
                reject(err)
            })
        })
    }
    
    function saveChat(grp, id, chat, userDet,position) { 
        let cloned = JSON.parse(JSON.stringify(chat));
        let update = {...cloned}
        update['username'] = userDet.username;
        update['image'] = userDet.image;
        update['position'] = position;
        update['reply'] = update.reply ? update.reply : [];
        return new Promise((resolve, reject) => {
            if (grp.member && grp.member.length > 0) {
                let cntTotal = 0;
                let allUser = []
                for (let userID of grp.member) {
                    user.findById(userID).then(res => {
                        if (!res) {
                            authUser.findById(userID).then(authRes => {
                                if (!authRes.status) {
                                    notifyChat(userID, id, allUser).then(members => {
                                        allUser = members;
                                        ++cntTotal;
                                        if (cntTotal === grp.member.length) {
                                            let msg = chat.cntType === 'audio' ? 'Audio chat' : chat.msg
                                            pushNotify(id, allUser, 'group', grp.title, msg).then(() => {
                                                resolve([update])
                                            })
                                        }
                                    })
                                } else {
                                    ++cntTotal;
                                    if (cntTotal === grp.member.length) {
                                        let msg = chat.cntType === 'audio' ? 'Audio chat' : chat.msg
                                        pushNotify(id, allUser, 'group', grp.title, msg).then(() => {
                                            resolve([update])
                                        })
                                    }
                                }
    
                            })
                        } else {
                            if (!res.status) {
                                notifyChat(userID, id, allUser).then(members => {
                                    allUser = members;
                                    ++cntTotal;
                                    if (cntTotal === grp.member.length) {
                                        let msg = (chat.cntType === 'audio' || chat.cntType === 'video') ? `${chat.cntType} message` : chat.msg
                                        pushNotify(id, allUser, 'group', grp.title, msg).then(() => {
                                            resolve([update])
                                        })
                                    }
                                })
                            } else {
                                ++cntTotal;
                                if (cntTotal === grp.member.length) {
                                    let msg = (chat.cntType === 'audio' || chat.cntType === 'video') ? `${chat.cntType} message` : chat.msg
                                    pushNotify(id, allUser, 'group', grp.title, msg).then(() => {
                                        resolve([update])
                                    })
                                }
                            }
                        }
                    })
                }
            } else {
                return resolve([update])
            }
        })
    }

});

module.exports = router

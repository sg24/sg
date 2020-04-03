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
const {category, chatnotifies, grpnotifies, tempFile,chat, group, user, authUser, connectStatus} = require('../serverDB/serverDB');

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
                            delete: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? true : false : cnt.delete,
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
                            chats['mainID'] = lastChat.chatID;
                            if ( chatDet.lastID === lastChat.ID) {
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
});

module.exports = router

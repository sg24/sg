const express = require('express');
const router = express.Router();
const {posts, questions, poets, group, tempFile,user, authUser, grpchatnotifies, chatnotifies,comment, connectStatus} = require('../serverDB/serverDB');
const webpush = require('web-push');
let global = require('../global/global');
let mongoose = require('mongoose');
let uuid = require('uuid');
let fs = require('fs');
let arraySort = require('array-sort');

let uploadStream = require('./utility/uploadStream')
let savetemp = require('./utility/savetemp');
let deleteMedia = require('./utility/deletemedia');

module.exports = {
   comment: (id, categ , cnts) => {
    return new Promise((resolve, reject) => {
        let model =  categ === 'post' ? posts : categ === 'question' ? questions : poets;
        model.findByIdAndUpdate(id, {$inc: {'comment': 1}}).then(() => {
            let newComment = new comment({
                authorID: global.userDet.id,
                userType: global.userDet.type,
                commentID: id,
                comment: cnts
            });
            newComment.save().then(result => {
                let model = result.userType === 'authUser' ? authUser : user;
                model.findById(result.authorID).then(userDet => {
                    let cnt = {
                        authorID: result.authorID,
                        username: userDet.username,
                        status: true,
                        offline: userDet.offline,
                        image: userDet.image,
                        comment: result.comment,
                        commentCreated: result.commentCreated,
                        _id: result._id,
                        like: false,
                        dislike: false,
                        liked: 0,
                        disliked: 0,
                        smile: false,
                        smiled: 0,
                        disabled: true
                    }
                    resolve(cnt)
                })
            }).catch(err => {
                reject(err)
            })
        })
    })
   },
   replyComment: (id, categ, cnts, commentID) => {
       return new Promise((resolve, reject) => {
        let cnt = {
            authorID: global.userDet.id,
            userType: global.userDet.type,
            comment: cnts,
            commentID
        }
        comment.findOneAndUpdate({_id: id}, {$push: {reply: cnt}}).then(result => {
            let model =  categ === 'post' ? posts : categ === 'question' ? questions : poets;
            model.findByIdAndUpdate(result.commentID, {$inc: {'comment': 1}}).then(() => {
                comment.findById(id).then(commentRes => {
                    let replyFilter = commentRes.reply.filter(reply => reply.commentID === commentID);
                    let model = replyFilter[0].userType === 'authUser' ? authUser : user;
                    model.findById(replyFilter[0].authorID).then(result => {
                        let cnt = {
                            authorID: replyFilter[0].authorID,
                            username: result.username,
                            status: true,
                            offline: result.offline,
                            image: result.image,
                            comment: replyFilter[0].comment,
                            commentCreated: replyFilter[0].commentCreated,
                            _id: replyFilter[0]._id,
                            like: false,
                            dislike: false,
                            liked: 0,
                            disliked: 0,
                            smile: false,
                            smiled: 0,
                            disabled: true
                        }
                        resolve(cnt)
                    })
                })
            })
        }).catch(err => {
            reject(err)
         })   
       })
   },
   members: ( id ) => {
    return new Promise((resolve, reject) => {
        group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true}).then(grp => {
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
                                resolve({memberDet, lastMsg: grp.lastMsg})
                            })
                        }
                    })
                }
            } else {
                resolve({memberDet: [], lastMsg: []})
            }
        })
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
   },
   typing: () => {
       return new Promise((resolve, reject) => {
           resolve(global.userDet.id)
       })
   },
   getUserID:() => {
       return new Promise((resolve,reject) =>{
           resolve(global.userDet.id)
       })
   },
   createChat: (id, cnt, lastMsg) => {
    return new Promise((resolve, reject) => {
        let chat = {
            ID: global.userDet.id,
            userType: global.userDet.type,
            cntType: 'typedPlain',
            msg: cnt.msg,
            chatID: cnt.chatID,
            format: 'typedPlain'
        }
        saveFile(id, chat).then((result) => {
            let msgCnt = []
            for (let cnt of lastMsg) {
                if (cnt.room === id) {
                    msgCnt = cnt.msg;
                }
            }
            // group.findByIdAndUpdate(id, {lastMsg: msgCnt}).then(() => {
                resolve(result)
            // }).catch(err => {
                // console.log(err)
            // })
        }).catch(err =>{
            reject(err)
        })
    })
   },
   mediaRecChat: (id, cnt) => {
    return new Promise((resolve, reject) => {
        let dataUrl = cnt.msg;
        let buff = Buffer.from(dataUrl.split(",")[1], 'base64');
        let path =  `./tmp/${uuid()}.${cnt.format}`;
        fs.writeFile(path, buff, function(err) {
            if (!err) {
                savetemp({path, type: cnt.type, name: uuid()}, [], global.userDet.id).then(tempFileID => {
                    let doc = {
                        path,
                        bucketName: cnt.type,
                        filename: uuid()
                    }
                    uploadStream(doc).then((fileDet) => {
                        if (fileDet) {
                            let chat = {
                                ID: global.userDet.id,
                                userType: global.userDet.type,
                                cntType: cnt.type,
                                msg: fileDet._id,
                                chatID: cnt.chatID,
                                format: cnt.format
                            }
                            tempFile.findByIdAndRemove(tempFileID).then(() => {
                                saveFile(id, chat).then((result) => {
                                    resolve(result)
                                }).catch(err =>{
                                    reject(err)
                                })
                            })
                        } else {
                            reject('Server Error')
                        }
                    }).catch(err => {
                       reject(err)
                    })
                })
            } else {
                reject(err)
            }
        })
    })
   },
   deleteChat: (id, cnt, lastMsg) => {
       return new Promise((resolve, reject) => {
        group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
            $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}).then(grp => {
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
                            if (filterCnt && (filterCnt.ID === global.userDet.id)) {
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
                                                        updateChat(id, chats, lastMsg).then(() => {
                                                            resolve(cnt)
                                                        })
                                                    }
                                                })
                                               } else {
                                                    ++deleteTotal;
                                                    if (cnt.length === deleteTotal) {
                                                        updateChat(id, chats, lastMsg).then(() => {
                                                            resolve(cnt)
                                                        })
                                                    }
                                               }
                                           }
                                       } else {
                                            ++deleteTotal;
                                            if (cnt.length === deleteTotal) {
                                                updateChat(id, chats, lastMsg).then(() => {
                                                    resolve(cnt)
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
                                                     updateChat(id, chats, lastMsg).then(() => {
                                                         resolve(cnt)
                                                     })
                                                 }
                                             })
                                            } else {
                                                 ++deleteTotal;
                                                 if (cnt.length === deleteTotal) {
                                                     updateChat(id, chats, lastMsg).then(() => {
                                                         resolve(cnt)
                                                     })
                                                 }
                                            }
                                        }
                                    } else {
                                        ++deleteTotal;
                                        if (cnt.length === deleteTotal) {
                                            updateChat(id, chats, lastMsg).then(() => {
                                                resolve(cnt)
                                            })
                                        }
                                    }
                                   
                                }
                            } else {
                                if (filterCnt) {
                                    ++deleteTotal;
                                    let block = filterCnt.block ? filterCnt.block.concat(global.userDet.id) : [global.userDet.id];
                                    block = [...new Set(block)]
                                    let cloned = JSON.parse(JSON.stringify(filterCnt));
                                    let update = {...cloned, block}
                                    chats[curIndex] = update;
                                    if (cnt.length === deleteTotal) {
                                        updateChat(id, chats, lastMsg).then(() => {
                                            resolve(cnt)
                                        }).catch(err => {
                                            reject(err)
                                        })
                                    }
                                } else {
                                    resolve(cnt)
                                }
                            }
                        }
                    }
                } else {
                    reject('Not Authorized')
                }
            })
       })
       function updateChat (id, chat, lastMsg) {
        return new Promise((resolve, reject) => {
            let msgCnt = []
            for (let cnt of lastMsg) {
                if (cnt.room === id) {
                    msgCnt = cnt.msg
                    if (msgCnt.length > 0) {
                        msgCnt = msgCnt.filter(msg => msg.userID !== global.userDet.id)
                    }
                }
            }
            group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}, {
                   chat, lastMsg: msgCnt }).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }
        
   },
   groups: () => {
       return new Promise((resolve, reject) => {
        group.find({_isCompleted: true, 
            $or: [ { member: { $in: global.userDet.id} }, 
                { authorID:  global.userDet.id } ]}).sort({groupCreated: -1}).then(grp => {
                let grpCnt = []
                let cntTotal = 0;
                if (grp) {
                    if (grp.length < 1) {
                        return resolve([])
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
                        grpchatnotifies.findOne({userID: global.userDet.id}).then(notifyCnt => {
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
                                resolve(grpCnt)
                            }
                        }).catch(err =>{
                            reject(err)
                        });
                    }
             } else {
                reject(err)
            }}).catch(err =>{
                reject(err)
            })
       })
   },
   groupNotify: () => {
        return new Promise((resolve, reject) => {
            grpchatnotifies.findOne({userID: global.userDet.id}).then(notifyCnt => {
                let notifications = 0;
                if (notifyCnt && notifyCnt.grp && notifyCnt.grp.length > 0 ) {
                        for (let cnt of notifyCnt.grp) {
                            notifications += cnt.notifications;
                        }
                }
                resolve(notifications)
            }).catch(err =>{
                reject(err)
            })
        })
    },
    userNotify: () => {
        return new Promise((resolve, reject) => {
            chatnotifies.findOne({userID: global.userDet.id}).then(notifyCnt => {
               let notifications = 0;
               if (notifyCnt && notifyCnt.member && notifyCnt.member.length > 0 ) {
                    for (let cnt of notifyCnt.member) {
                        notifications += cnt.notifications;
                    }
               }
                resolve(notifications)
            }).catch(err =>{
                reject(err)
            })
        })
    },
    setLastMsg: (id) => {
         return new Promise((resolve, reject) => {
            group.findOne({_id:  mongoose.mongo.ObjectId(id),_isCompleted: true, 
                $or: [ { member: { $in: global.userDet.id} }, 
                    { authorID:  global.userDet.id } ]}).then(grp => {
                if (grp && grp.member && grp.member.length > 0 && grp.chat.length > 0) {
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
                        $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}, {
                           lastMsg}).then(() => {
                        resolve()
                    }).catch(err => {
                        reject(err)
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
                } else {
                    resolve()
                }
            })
         })
    }
}

function notify(userID, grpID, members) {
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

function saveFile(id, chat) {
    return new Promise((resolve, reject) => {
        let model =  global.userDet.type === 'authUser' ? authUser : user;
        model.findById(global.userDet.id).then(userDet => {
            group.findOne({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}).then(grp => {
                if (grp) {
                    let position = grp.lastID && grp.lastID === global.userDet.id ? grp.position : grp.lastID === '' || !grp.lastID ? 0  : grp.position + 1;
                    chat['position'] = position;
                    if (grp.lastID && grp.lastID === global.userDet.id) {
                        let updateChat = grp.chat
                        let lastChat = updateChat[updateChat.length - 1];
                        if (lastChat && (grp.lastID === lastChat.ID)) {
                            chat['mainID'] = lastChat.chatID;
                            if (!lastChat.delete) {
                                lastChat.reply.push(chat);
                            } else {
                                lastChat['delete'] = false;
                                lastChat = {...chat, chatID: lastChat.chatID}
                            }
                            updateChat[updateChat.length - 1] = lastChat;
                            group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                            $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}, {
                                chat: updateChat, lastID: global.userDet.id, position, $addToSet: { active : global.userDet.id }}).then(() => {
                                save(grp, id, lastChat, userDet, position).then(cnt => {
                                    resolve(cnt)
                                })        
                            })

                        } else {
                            group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                                $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}, {
                                $push: {chat}, lastID: global.userDet.id, position, $addToSet: { active : global.userDet.id }}).then(() => {
                                save(grp, id, chat, userDet, position).then(cnt => {
                                    resolve(cnt)
                                })        
                            })
                        }
                    } else {
                        group.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id), _isCompleted: true, 
                            $or: [ { member: { $in: global.userDet.id } }, { authorID:  global.userDet.id } ]}, {
                            $push: {chat}, lastID: global.userDet.id, position, $addToSet: { active : global.userDet.id }}).then(() => {
                            save(grp, id, chat, userDet, position).then(cnt => {
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

function save(grp, id, chat, userDet, position) {
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
                                notify(userID, id, allUser).then(members => {
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
                      
                            notify(userID, id, allUser).then(members => {
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

function pushNotify(id, shareMe, field, title, msg) {
    return new Promise((resolve, reject) => {
        let allSubscription = [];
        user.find({_id: { $in : shareMe }}).then(users => {
            let fndUsers = users ? users : []
            allSubscription.push(...fndUsers);
            authUser.find({_id: { $in : shareMe }}).then(authUsers => {
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
                            content: `from ${field} ${title}`,
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

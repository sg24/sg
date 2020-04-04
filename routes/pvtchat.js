const express = require('express');
const router = express.Router();
const {group, chat, tempFile, user, authUser, chatnotifies, comment} = require('../serverDB/serverDB');
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
   pvtDeleteChat: (id, cnt) => {
       return new Promise((resolve, reject) => {
        chat.findOne({$or: [{$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: id} } ]}, {$and: [ { host: { $in: id } }, { reply: { $in: global.userDet.id} }]}]}).then(chatDet => {
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
                                                        updateChat(id, chats).then(() => {
                                                            resolve(cnt)
                                                        })
                                                    }
                                                })
                                               } else {
                                                    ++deleteTotal;
                                                    if (cnt.length === deleteTotal) {
                                                        updateChat(id, chats).then(() => {
                                                            resolve(cnt)
                                                        })
                                                    }
                                               }
                                           }
                                       } else {
                                            ++deleteTotal;
                                            if (cnt.length === deleteTotal) {
                                                updateChat(id, chats).then(() => {
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
                                                     updateChat(id, chats).then(() => {
                                                         resolve(cnt)
                                                     })
                                                 }
                                             })
                                            } else {
                                                 ++deleteTotal;
                                                 if (cnt.length === deleteTotal) {
                                                     updateChat(id, chats).then(() => {
                                                         resolve(cnt)
                                                     })
                                                 }
                                            }
                                        }
                                    } else {
                                        ++deleteTotal;
                                        if (cnt.length === deleteTotal) {
                                            updateChat(id, chats).then(() => {
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
                                        updateChat(id, chats).then(() => {
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
       function updateChat (id, chats) {
        return new Promise((resolve, reject) => {
            chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: global.userDet.id} } ]}, {$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: id} }]}]}, {
                chat: chats}).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }
        
   },
    conv: () => {
        return new Promise((resolve, reject) => {
           let model = global.userDet.type === 'authUser' ? authUser : user;
           model.findById(global.userDet.id).then(cntDet => {
               let members = cntDet ? [...cntDet.teacher, ...cntDet.student] : [];
               let memberTotal = 0;
               let cntFnd = {cnt: [], online: 0, offline: 0};;
               if (members.length < 1) {
                    return resolve(cntFnd)
               }
               for (let userID of members) {
                    let lastMsg = null;
                    chat.findOne({$or: [{$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: userID} } ]}, {$and: [ { host: { $in: userID } }, { reply: { $in: global.userDet.id} }]}]}).then(chatCnt => {
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
                                resolve(cntFnd)
                            }
                        })
                    }).catch(err =>{
                        reject(err)
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
        })
    },
    pvtcreateChat: (id, cnt) => {
        return new Promise((resolve, reject) => {
            let model = global.userDet.type === 'authUser' ? authUser : user;
            model.findOne({_id:  mongoose.mongo.ObjectId(global.userDet.id), $or: [ { student: { $in: id } }, { teacher: { $in: id} } ]}).then(userDet => {
                if (userDet) {
                    let chats = {
                        ID: global.userDet.id,
                        userType: global.userDet.type,
                        cntType: 'typedPlain',
                        msg: cnt.msg,
                        chatID: cnt.chatID,
                        format: 'typedPlain'
                    }
                    saveFile(id, chats).then((result) => {
                        resolve(result)
                    }).catch(err =>{
                        reject(err)
                    })
                } else {
                    reject('Not authorized')
                }
            })
        })
    },
    pvtMediaRecChat: (id, cnt) => {
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
                            let chats = {
                                ID: global.userDet.id,
                                userType: global.userDet.type,
                                cntType: cnt.type,
                                msg: fileDet._id,
                                chatID: cnt.chatID,
                                format: cnt.format
                            }
                            tempFile.findByIdAndRemove(tempFileID).then(() => {
                                saveFile(id, chats).then((result) => {
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
  }
}

function notify(userID, ID) {
    return new Promise((resolve, reject) => {
        chatnotifies.findOne({userID}).then(result => {
            if (result) {
                let member = result.member.filter(user => user.ID === ID);
                if (member.length < 1) {
                    chatnotifies.findOneAndUpdate({userID}, {
                        $push: {member: {ID, notifications: 1}}
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
        let model =  global.userDet.type === 'authUser' ? authUser : user;
        model.findById(global.userDet.id).then(userDet => {
            chat.findOne({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: global.userDet.id} } ]}, {$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: id} }]}]}).then(chatDet => {
                if (chatDet) {
                    let position = chatDet.lastID && chatDet.lastID === global.userDet.id ? chatDet.position : chatDet.position + 1;
                    chats['position'] = position;
                    if (chatDet.lastID && chatDet.lastID === global.userDet.id) {
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
                            chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: global.userDet.id} } ]}, {$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: id} }]}]}, {
                               chat: updateChat, lastID: global.userDet.id, position}).then(grp => {
                                save(lastChat, userDet, id, global.userDet.id, position).then(cnt => {
                                    resolve(cnt)
                                })
                            })
                        } else {
                            chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: global.userDet.id} } ]}, {$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: id} }]}]}, {
                                $push: {chat: chats}, lastID: global.userDet.id, position}).then(grp => {
                                save(chats, userDet, id, global.userDet.id, position).then(cnt => {
                                    resolve(cnt)
                                })
                            })
                        }
                    } else {
                        chat.findOneAndUpdate({$or: [{$and: [ { host: { $in: id } }, { reply: { $in: global.userDet.id} } ]}, {$and: [ { host: { $in: global.userDet.id } }, { reply: { $in: id} }]}]}, {
                            $push: {chat: chats}, lastID: global.userDet.id, position}).then(grp => {
                            save(chats, userDet, id, global.userDet.id, position).then(cnt => {
                                resolve(cnt)
                            })
                        })
                    }
                } else {
                    let create = new chat({
                        host: global.userDet.id,
                        reply: id,
                        chat: [{
                            ...chats,
                            position: 0
                        }],
                        lastID: global.userDet.id
                    })
                    create.save().then(() => {
                        save(chats, userDet, id, global.userDet.id, 0).then(cnt => {
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

let express = require('express');
let router = express.Router();
let arraySort = require('array-sort');
let mongoose = require('mongoose');
let fs = require('fs');
const webpush = require('web-push');

let formidable = require('formidable');
let uploadStream = require('./utility/uploadStream')
let savetemp = require('./utility/savetemp');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
let formInit = require('./utility/forminit');
let deleteMedia = require('./utility/deletemedia');
const {tempFile, qchat, qcontent, user, authUser, connectStatus} = require('../serverDB/serverDB');

router.get('/', authenticate, (req, res,next) => {
    res.render('qchat');
})

router.post('/', authenticate, (req, res, next) => {
    if (req.header('data-categ') === 'editform') {
        qchat.findOne({_id: req.body.id, authorID: req.user}).then(result => {
            if (result) {
                qcontent.findOne({qchatID: result.contentID}).then(cnt => {
                    if (cnt) {
                        let qchatCnt = []
                        qchatCnt.push({
                            position: 0, categ: result.category, duration: result.duration, hour: result.hour, 
                            video: result.video, image: result.image, snapshot: result.snapshot,
                            minute: result.minute, second: result.second, title: result.title, participant: result.access}, ...cnt.question)
                        res.status(200).send(qchatCnt)
                    } else {
                        res.sendStatus(404)
                    }
                })
            }  else {
                res.sendStatus(404)
            }
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'userDet') {
        qchat.findById(req.body.id).then(userDet => {
            if (userDet) {
                let model = userDet.userType === 'authUser' ? authUser : user;
                model.findById(userDet.authorID).then(userFnd => {
                    if (userFnd) {
                        let cnt = {
                            username: userFnd.username,
                            image: userFnd.image,
                            offline: userFnd.offline,
                            status: userFnd.status,
                            nickname: userDet.nickname
                        }
                        res.status(200).send(cnt)
                    }
                })
            } else {
                res.sendStatus(404)
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'editform') {
        qchat.findById(req.body.id).then(userDet => {
            if (userDet) {
                let cnt = {
                    nickname: userDet.nickname,
                    bank: userDet.bank,
                    account: userDet.account,
                    paypal: userDet.paypal,
                    phone: userDet.phone,
                    image: userDet.image,
                    snapshot: userDet.snapshot,
                    video: userDet.video
                }
                res.status(200).send(cnt)
            } else {
                res.sendStatus(404)
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'deleteqchat') {
        qchat.findOneAndRemove({authorID: req.user,_id: req.body.id}).then(result => {
            if (!result) {
                return res.sendStatus(404);
            }
            
            if (result.video && result.video.length > 0){
                deleteMedia(result.video, 'media').then(() => {
                    return res.sendStatus(200);
                })
            } else if (result.image && result.image.length > 0){
                deleteMedia(result.image, 'image').then(() => {
                    return res.sendStatus(200);
                })
            } else {
                return res.sendStatus(200);
            }
        })   
    }

    if (req.header !== null && req.header('data-categ') === 'qchat') {
        return fetchContest({});
    }

    if (req.header !== null && req.header('data-categ') === 'myqchat') {
        return fetchContest({authorID: req.user});
    }

    if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
        return fetchContest({mode: 'publish', shareMe: []});
    }

    if (req.header !== null && req.header('data-categ') === 'chat') {
        let id = req.body.id
        qchat.findByIdAndUpdate(id, {$inc: {'view': 1}}).then(chatFnd => {
            if (chatFnd) {
                let chatTotal = chatFnd.chat.length
                let chat = arraySort(chatFnd.chat, 'position', {reverse: true});
                let updateChat =  chat.splice(req.body.skipChat, req.body.chatLimit -1);
                let allChat = []
                let allChatTotal = 0
                if (updateChat.length < 1) {
                    return res.status(200).send({chat: allChat, chatTotal})
                }
                for (let cnt of updateChat) {
                    let reply = []
                    for (let replyCnt of cnt.reply) {
                        let cnt = {
                            created: replyCnt.created,
                            cntType: replyCnt.cntType,
                            msg: replyCnt.msg,
                            ID: replyCnt.ID,
                            chatID: replyCnt.chatID,
                            format: replyCnt.format,
                            position: replyCnt.position
                        }
                        if (!replyCnt.delete && !replyCnt.block) {
                            cnt['delete'] = false;
                            reply.push(cnt);
                        }
                        if (!replyCnt.delete && replyCnt.block && replyCnt.block.filter(id => id !== req.user)) {
                            cnt['delete'] = false;
                            reply.push(cnt);
                        }
                        
                        if (replyCnt.delete || (replyCnt.block && replyCnt.block.filter(id => id === req.user)[0])) {
                            cnt['delete'] =  true;
                            reply.push(cnt)
                        } 
                    }
                    let model = cnt.userType === 'authUser' ? authUser : user;
                    model.findById(cnt.ID).then(userDet => {
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
                            reply,
                            delete: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? true : false : cnt.delete
                        })
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

    if(req.header !== null && req.header('data-categ') === 'pvtcreateChat'){
        let id = req.body.id;
        let cnt = req.body;
        if (cnt.msg && !cnt.msg.editMsg) {
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
            let msg = cnt.msg
            qchat.findById(id).then(chatDet => {
                if (chatDet && chatDet.chat) {
                    let content = chatDet.chat;
                    let update = content.filter(cnt => cnt.chatID === msg.mainID)[0];
                    if (update && update.ID === req.user) {
                    if (!msg.chatID) {
                        let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
                        if (update) {
                            if (update && (update.cntType !== 'typedPlain')) {
                                deleteMedia([{id: update.msg }], update.cntType).then(() => {
                                    update.msg = msg.editMsg;
                                    update['edit'] = true;
                                    update.cntType = 'typedPlain'
                                    update.format = 'typedPlain'
                                    content[index] = update;
                                    editCnt(content, update).then(cnt => {
                                        return res.status(200).send(cnt)
                                    })
                                })
                            } else {
                                update.msg = msg.editMsg;
                                update['edit'] = true;
                                content[index] = update
                                editCnt(content, update).then(cnt => {
                                    return res.status(200).send(cnt)
                                })
                            }
                        }
                    } else {
                        let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
                        if (update) {
                            let filterReply = update.reply.filter(replyCnt => replyCnt.chatID === msg.chatID)[0];
                            let filterIndex = update.reply.findIndex(replyCnt => replyCnt.chatID === msg.chatID)[0];
                            if (filterReply) {
                                if (filterReply && (filterReply.cntType !== 'typedPlain')) {
                                    deleteMedia([{id: filterReply.msg }], filterReply.cntType).then(() => {
                                        filterReply.msg = msg.editMsg
                                        filterReply['edit'] = true;
                                        filterReply.cntType = 'typedPlain';
                                        filterReply.format = 'typedPlain';
                                        update.reply[filterIndex] = filterReply;
                                        content[index] = update
                                        editCnt(content, update).then(cnt => {
                                            return res.status(200).send(cnt)
                                        })
                                    })
                                } else {
                                    filterReply.msg = msg.editMsg
                                    filterReply['edit'] = true;
                                    update.reply[filterIndex] = filterReply;
                                    content[index] = update
                                    editCnt(content, update).then(cnt => {
                                        return res.status(200).send(cnt)
                                    })
                                }
                            }
                        }
                    }
                } else {
                    res.sendStatus(200)
                }
                
                function editCnt(content, updateCnt) {
                    return new Promise((resolve, reject) => {
                        qchat.findByIdAndUpdate(id, {
                            chat: content}).then(() => {
                                save(updateCnt, updateCnt.position).then(cnt => {
                                    resolve(cnt)
                                })
                            })
                        })
                    }
                }
            })
        }
    }

    if (req.header !== null && req.header('data-categ') === 'pvtDeleteChat') {
        let id = req.body.id;
        let cnts = req.body.cnt
        qchat.findById(id).then(chatDet => {
            if (chatDet) {
                let chats = chatDet.chat;
                if (chats && chats.length > 0) {
                    let deleteTotal = 0;
                    let curIndex = 0;
                    for (let cnt of cnts) {
                        if (!cnt.chatID) {
                            let filterCnt = chats.filter((chat, index)=> {
                                if (chat.chatID === cnt.mainID) {
                                    curIndex = index;
                                    return true;
                                }
                                return false;
                            })[0];
                            if (filterCnt && (filterCnt.ID === req.user)) {
                                let cloned = JSON.parse(JSON.stringify(filterCnt));
                                let update = {...cloned, delete: true, msg: null}
                                chats[curIndex] = update;
                                if (filterCnt && (filterCnt.cntType !== 'typedPlain')) {
                                    deleteMedia([{id: filterCnt.msg }], filterCnt.cntType).then(() => {
                                        ++deleteTotal;
                                        if (cnts.length === deleteTotal) {
                                            updateChat(id, chats).then(() => {
                                                res.status(200).send(cnts)
                                            })
                                        }
                                    })
                                } else {
                                    ++deleteTotal;
                                    if (cnts.length === deleteTotal) {
                                        updateChat(id, chats).then(() => {
                                            res.status(200).send(cnts)
                                        })
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
                                    if (cnts.length === deleteTotal) {
                                        updateChat(id, chats).then(() => {
                                            res.status(200).send(cnts)
                                        }).catch(err => {
                                            res.status(500).send(err)
                                        })
                                    }
                                } else {
                                    res.status(200).send(cnts)
                                }
                            }
                        } else {
                            let filterReply = chats.filter((chat, index)=> {
                                if (chat.chatID === cnt.mainID) {
                                    curIndex = index;
                                    return true;
                                }
                                return false;
                            })[0];
                            if (filterReply) {
                                let filterCnt = filterReply.reply.filter(replyCnt => replyCnt.chatID === cnt.chatID)[0];
                                let filterIndex = filterReply.reply.findIndex(replyCnt => replyCnt.chatID === cnt.chatID);
                                
                                if (filterCnt) {
                                    if (filterCnt && (filterCnt.ID === req.user)) {
                                        let cloned = JSON.parse(JSON.stringify(filterCnt));
                                        let update = {...cloned, delete: true, msg: null}
                                        filterReply.reply[filterIndex] = update;
                                        chats[curIndex] = filterReply;
                                        if (filterCnt && (filterCnt.cntType !== 'typedPlain')) {
                                            deleteMedia([{id: filterCnt.msg }], filterCnt.cntType).then(() => {
                                                ++deleteTotal;
                                                if (cnts.length === deleteTotal) {
                                                    updateChat(id, chats).then(() => {
                                                        res.status(200).send(cnts)
                                                    })
                                                }
                                            })
                                        } else {
                                            ++deleteTotal;
                                            if (cnts.length === deleteTotal) {
                                                updateChat(id, chats).then(() => {
                                                    res.status(200).send(cnts)
                                                })
                                            }
                                        }
                                    } else {
                                        if (filterCnt) {
                                            ++deleteTotal;
                                            let block = filterCnt.block ? filterCnt.block.concat(req.user) : [req.user];
                                            block = [...new Set(block)]
                                            let cloned = JSON.parse(JSON.stringify(filterCnt));
                                            let update = {...cloned, block}
                                            filterReply.reply[filterIndex] = update;
                                            chats[curIndex] = filterReply;
                                            if (cnts.length === deleteTotal) {
                                                updateChat(id, chats).then(() => {
                                                    res.status(200).send(cnts)
                                                }).catch(err => {
                                                    res.status(500).send(err)
                                                })
                                            }
                                        } else {
                                            res.status(200).send(cnts)
                                        }
                                    }
                                } else {
                                    res.status(200).send(cnts)
                                } 
                            } else {
                                res.status(200).send(cnts)
                            }
                        }
                        
                        
                    }
                }
            } else {
                res.sendStatus(401)
            }
        })
        function updateChat (id, chats) {
            return new Promise((resolve, reject) => {
                qchat.findByIdAndUpdate(id, {
                    chat: chats}).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }

    if(req.header !== null && req.header('data-categ') === 'uploadmedia'){
        formInit(req, formidable).then(form => {
            let files = form.files && form.files.media ? form.files.media.length === undefined ? [form.files.media] : form.files.media : []
            let fields = form.fields;
            let chatID = JSON.parse(fields.chatID);
            let id = fields.id;
            if (chatID && !chatID.mainID) {
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
                                    saveFile(id, chats).then((result) => {
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
            } else {
                let msg = chatID
                qchat.findById(id).then(chatDet => {
                    if (chatDet && chatDet.chat) {
                        let content = chatDet.chat;
                        let update = content.filter(cnt => cnt.chatID === msg.mainID)[0];
                        if(update && update.ID === req.user) {
                            if (!msg.chatID) {
                                let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
                                if (update) {
                                    if (update && (update.cntType !== 'typedPlain')) {
                                        deleteMedia([{id: update.msg }], update.cntType).then(() => {
                                            editMedia().then(result => {
                                                update.msg = result
                                                update['edit'] = true;
                                                update.cntType = fields.type;
                                                update.format = fields.format;
                                                content[index] = update
                                                editCnt(content, update).then(cnt => {
                                                    return res.status(200).send(cnt)
                                                })
                                            })
                                        })
                                    } else {
                                        editMedia().then(result => {
                                            update.msg = result
                                            update['edit'] = true;
                                            update.cntType = fields.type;
                                            update.format = fields.format;
                                            content[index] = update
                                            editCnt(content, update).then(cnt => {
                                                return res.status(200).send(cnt)
                                            })
                                        })
                                    }
                                }
                            } else {
                                let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
                                if (update) {
                                    let filterReply = update.reply.filter(replyCnt => replyCnt.chatID === msg.chatID)[0];
                                    let filterIndex = update.reply.findIndex(replyCnt => replyCnt.chatID === msg.chatID)[0];
                                    if (filterReply) {
                                        if (filterReply && (filterReply.cntType !== 'typedPlain')) {
                                            deleteMedia([{id: filterReply.msg }], filterReply.cntType).then(() => {
                                                editMedia().then(result => {
                                                    filterReply.msg = result
                                                    filterReply['edit'] = true;
                                                    filterReply.cntType = fields.type;
                                                    filterReply.format = fields.format;
                                                    update.reply[filterIndex] = filterReply;
                                                    content[index] = update
                                                    editCnt(content, update).then(cnt => {
                                                        return res.status(200).send(cnt)
                                                    })
                                                })
                                            })
                                        } else {
                                            editMedia().then(result => {
                                                filterReply.msg = result
                                                filterReply['edit'] = true;
                                                filterReply.cntType = fields.type;
                                                filterReply.format = fields.format;
                                                update.reply[filterIndex] = filterReply;
                                                content[index] = update
                                                editCnt(content, update).then(cnt => {
                                                    return res.status(200).send(cnt)
                                                })
                                            })
                                        }
                                    }
                                }
                            }
                        } else {
                            res.sendStatus(200)
                        }
                    }   
                })
            }
            function editMedia() {
                return new Promise((resolve, reject) => {
                    for (let file of files) {
                        savetemp({path: file.path, type: fields.type, name: file.name}, [], req.user).then(tempFileID => {
                            let doc = {
                                path: file.path,
                                bucketName: fields.type,
                                filename: file.name
                            }
                            uploadStream(doc).then((fileDet) => {
                                if (fileDet) {
                                    tempFile.findByIdAndRemove(tempFileID).then(() => {
                                        resolve(fileDet._id)
                                    })
                                } else {
                                    reject()
                                }
                            }).catch(err => {
                            reject(err)
                            })
                        })
                    }
                })
            }
            function editCnt(content, update) {
                return new Promise((resolve, reject) => {
                    qchat.findByIdAndUpdate(id, {
                        chat: content}).then(() => {
                        save(update, update.position).then(cnt => {
                            resolve(cnt)
                        })
                    })
                })
            }
            
        })
    }

    function fetchContest(conditions, meta) {
        let condition = { _isCompleted: true, ...conditions}
        connectStatus.then(() => {
            let isMeta = meta ? meta : {};
            let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {created: -1};
            let curLimit = parseInt(req.header('limit'));
            let skip = parseInt(req.header('skip'));
            qchat.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
                qchat.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
                    let cntArray= [];
                    let send = 0;
                    if (result.length < 1) {
                        res.send({cnt: cntArray, cntTotal}).status(200)
                    }
                    for (let cnt of result) {
                        fetch(cnt.username, cnt.userImage, cnt, cntArray).then(cnt => {
                            cntArray = cnt;
                            ++send 
                            if (send === result.length) {
                                res.send({cnt: cntArray, cntTotal}).status(200)
                            }
                        }) 
                    }
                    
                    function fetch(username, image, cnt, cntArray) {
                        return new Promise((resolve, reject) => {
                           let update ={};
                            update['username'] = username;
                            update['userImage'] = image;
                            update['userOpt'] = cnt.authorID === req.user;
                            update['authorID'] = cnt.authorID;
                            update['comment'] = cnt.comment.length;
                            update['nickname'] = cnt.nickname;
                            update['image'] = cnt.image;
                            update['created'] = cnt.created;
                            update['snapshot'] = cnt.snapshot;
                            update['video'] = cnt.video;
                            update['view'] = cnt.view;
                            update['_id'] = cnt._id;
                            cntArray.push({...update});
                            resolve(cntArray)
                        })
                    }
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            }) 
        }).catch(err => {
            res.status(500).send(err);
        })
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

    function saveFile(id, chats) {
        return new Promise((resolve, reject) => {
            qchat.findById(id).then(chatDet => {
                if (chatDet) {
                    let position = chatDet.lastID && chatDet.lastID === req.user ? chatDet.position : chatDet.lastID === '' || !chatDet.lastID ? 0  : chatDet.position + 1;
                    chats['position'] = position;
                    if (chatDet.lastID && chatDet.lastID === req.user) {
                        let updateChat = chatDet.chat
                        let lastChat = updateChat[updateChat.length - 1];
                        if (lastChat && (chatDet.lastID === lastChat.ID)) {
                            chats['mainID'] = lastChat.chatID;
                            lastChat.reply.push(chats);
                            updateChat[updateChat.length - 1] = lastChat;
                            qchat.findByIdAndUpdate(id, {
                            chat: updateChat, lastID: req.user, position, $addToSet: { comment : req.user }}).then(() => {
                                save(lastChat, position).then(cnt => {
                                    resolve(cnt)
                                })
                            })
                        } else {
                            qchat.findByIdAndUpdate(id, {
                                $push: {chat: chats}, lastID: req.user, position,  $addToSet: { comment : req.user }}).then(() => {
                                save(chats, position).then(cnt => {
                                    resolve(cnt)
                                })
                            })
                        }
                    } else {
                        qchat.findByIdAndUpdate(id, {
                            $push: {chat: chats}, lastID: req.user, position,  $addToSet: { comment : req.user }}).then(() => {
                            save(chats, position).then(cnt => {
                                resolve(cnt)
                            })
                        })
                    }
                } else {
                    reject('Not Found')
                }
            })
        }).catch(err => {
            reject(err)
        })
    }

    function save (chat, position) {
        return new Promise((resolve, reject) => {
            let cloned = JSON.parse(JSON.stringify(chat));
            let update = {...cloned}
            update['username'] = req.username;
            update['position'] = position;
            update['image'] = false;
            update['reply'] = update.reply ? update.reply : [];
            resolve([update])
        })
    }

});

module.exports = router

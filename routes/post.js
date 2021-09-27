let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');

let formidable = require('formidable');
let savetemp = require('./utility/savetemp');
let sequence = require('./utility/sequence');
let deleteMedia = require('./utility/deletemedia');
let authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let uploadToBucket = require('./utility/upload');
let notifications = require('./utility/notifications');
let sharecontent = require('./utility/sharecontent');
let subString = require('./utility/substring');
let checkPageID = require('./utility/checkPageID');
const {post, group, grouppost, advert, user, share, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonepost') {
        post.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            if (result) {
                let cnt = JSON.parse(JSON.stringify(result));
                delete cnt.block;
                let updateResult = {...cnt,
                share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0}
                res.status(200).send(updateResult);
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getoneandcheck') {
        post.findOne({$or: [{authorID: { $in: [req.user, ...req.friend] }}, {allowed: { $in: [req.user]}}], _id: req.body.pageID, _isCompleted: true, block: {$nin: [req.user]}}).then(result => {
            if (result) {
                let cnt = JSON.parse(JSON.stringify(result));
                delete cnt.block;
                let updateResult = {...cnt,
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0}
                res.status(200).send(updateResult);
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getByAuthor') {
        post.find(checkPageID({$or: [{authorID: { $in: [req.user, ...req.friend] }}, {allowed: { $in: [req.user]}}], _isCompleted: true, block: {$nin: [req.user]}}, req.body.pageID))
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    ...subString(cnt.content),
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0})
                }
            }
            let showAdvert = Math.round(Math.random());
            if (showAdvert === 0) {
                advert.find().skip(req.body.start).limit(req.body.limit).then(doc => {
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        lastItem.advert = doc
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                })
            } else if (showAdvert === 1) {
                user.find({_id: {$in: req.request}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                    let updateFriend = [];
                    for (let cnt of doc) {
                        let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                        updateFriend.push({_id: cnt._id, username: cnt.username, userImage: cnt.image, status: isOnline})
                    }
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        lastItem.friendRequest = updateFriend;
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0});
                });
            } else {
                res.status(200).send({page: updateResult, loadMore: result.length > 0});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getFavorite') {
        post.find({$or: [{authorID: { $in: [req.user, ...req.friend] }}, {allowed: { $in: [req.user]}}],favorite: {$in: [req.user]}, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    ...subString(cnt.content),
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0})
                }
            }
            let showAdvert = Math.round(Math.random());
            if (showAdvert === 0) {
                advert.find().skip(req.body.start).limit(req.body.limit).then(doc => {
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        lastItem.advert = doc
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
                })
            } else if (showAdvert === 1) {
                user.find({_id: {$in: req.request}}).skip(req.body.start).limit(req.body.limit).then(doc => {
                    let updateFriend = [];
                    for (let cnt of doc) {
                        let isOnline =  (new Date().getTime() - new Date(cnt.visited).getTime()) < 60000;
                        updateFriend.push({_id: cnt._id, username: cnt.username, userImage: cnt.image, status: isOnline})
                    }
                    let lastItem = updateResult[updateResult.length - 1];
                    if (lastItem) {
                        lastItem.friendRequest = updateFriend;
                        updateResult[updateResult.length - 1] = lastItem
                    }
                    res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
                });
            } else {
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getPostByAuthor') {
        Promise.all([user.findById(req.body.searchCnt)]).then(doc => {
            post.find({authorID: req.body.searchCnt, 'shareInfo.authorID': null, _isCompleted: true, block: {$nin: [req.user]}})
                .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                let updateResult = [];
                if (result) {
                    for (let cnt of result) {
                        let updateCnt = JSON.parse(JSON.stringify(cnt));
                        delete updateCnt.block;
                        updateResult.push({...updateCnt,
                        ...subString(cnt.content),
                        userImage: doc[0] ? doc[0].image : cnt.userImage, username: doc[0] ? doc[0].username : cnt.username,
                        share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                        isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                        isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0})
                    }
                }
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'hashSearch') {
        post.find({hashTag: {$in: [req.body.searchCnt]}, 'shareInfo.authorID': null, _isCompleted: true, block: {$nin: [req.user]}})
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    ...subString(cnt.content),
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0})
                }
            }
            res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setFavorite') {
        post.findOneAndUpdate({_id: req.body.pageID, favorite: {$nin: [req.user]}}, {$push: {'favorite': req.user}}).then(doc => {
            if (doc) {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: true, favorite: doc.favorite.length + 1}});
            }
            post.findOneAndUpdate({_id: req.body.pageID, favorite: {$in: [req.user]}}, {$pull: {'favorite': req.user}}).then(result => {
                return res.status(200).send({pageInfo: {_id: req.body.pageID, isFavored: false, favorite: result.favorite.length - 1}});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShare') {
        let reciepent = JSON.parse(req.body.reciepent);
        post.findOneAndUpdate({_id: req.body.pageID}, {$addToSet: {'share': reciepent}}).then(() => {
            post.findById(req.body.pageID).then(doc => {
                if (doc) {
                    sharecontent(post, post, req.body.pageID, reciepent, req.user, req.username, req.userImage, 
                        doc.shareInfo ? doc.shareInfo.pageID : null, doc.shareInfo ? doc.shareInfo.pageTitle : null).then(shareInfo => {
                        res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                        for (let cnt of shareInfo) {
                            notifications('postShare', cnt.userID, {userID: req.user, ID: cnt.pageID}, false);
                        }
                    });
                    return
                }
                return res.sendStatus(200);
            });
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setShareGroup') {
        let reciepent = JSON.parse(req.body.cnt);
        let checkGroup = [];
        let checked = 0;
        post.findOneAndUpdate({_id: req.body.pageID}, {$addToSet: {'share': reciepent}}).then(() => {
            post.findById(req.body.pageID).then(doc => {
                for (let groupID of reciepent) {
                    group.findOne({_id: groupID,'member.authorID': req.user}).then(groupDoc => {
                        if (groupDoc) {
                            ++checked;
                            checkGroup.push(doc._id);
                            if (checked === reciepent.length) {
                                sharecontent(post, grouppost, req.body.pageID, reciepent, req.user, req.username, req.userImage,
                                    doc.shareInfo ? doc.shareInfo.pageID : null, doc.shareInfo ? doc.shareInfo.pageTitle : null).then(() => {
                                    res.status(200).send({pageInfo: {_id: req.body.pageID, share: doc.share.length}});
                                })
                            }
                        }
                    });
                }
            });
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header && (req.header('data-categ') === 'searchPost' || req.header('data-categ') === 'searchPostTab')) {
        post.find({$or: [{authorID: { $in: [req.user, ...req.friend] }}, {allowed: { $in: [req.user]}}], _isCompleted: true, block: {$nin: [req.user]}, $text: {$search: req.body.searchCnt} })
        .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    ...subString(cnt.content),
                    share: cnt.share.length, favorite: cnt.favorite.length, chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)},
                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                    isFriend: [req.user, ...req.friend].filter(id => id === JSON.parse(JSON.stringify(cnt.authorID))).length > 0})
                }
            }
            res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: req.header('data-categ') === 'searchPostTab'});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getOneAndDelete') {
        post.findOne({_id: req.body.pageID}).then(doc => {
            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.share.length < 1 && !doc.shareInfo.authorID && 
                (JSON.parse(JSON.stringify(doc.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([deleteMedia(doc.media), doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (doc && !doc.chat._id && doc.favorite.length < 1 && doc.shareInfo.authorID && 
                (JSON.parse(JSON.stringify(doc.shareInfo.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (doc && (JSON.parse(JSON.stringify(doc.authorID)) !== JSON.parse(JSON.stringify(req.user)))) {
                post.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}, $pull: {'favorite': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This post could not be deleted');
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }
    

    // if (req.header !== null && req.header('data-categ') === 'userDet') {
    //     let model = req.userType === 'authUser' ? authUser : user;
    //     model.findById(userDet.authorID).then(userFnd => {
    //         if (userFnd) {
    //             let cnt = {
    //                 username: userFnd.username,
    //                 image: userFnd.image,
    //                 offline: userFnd.offline,
    //                 status: userFnd.status
    //             }
    //             res.status(200).send(cnt)
    //         }
    //     })
    // }

    // if (req.header !== null && req.header('data-categ') === 'deletearoundme') {
    //     aroundme.findOneAndRemove({authorID: req.user,_id: req.body.id}).then(result => {
    //         if (!result) {
    //             return res.sendStatus(404);
    //         }
            
    //         if (result.video && result.video.length > 0){
    //             deleteMedia(result.video, 'media')
    //         } 
    //         if (result.image && result.image.length > 0){
    //             deleteMedia(result.image, 'image')
    //         } 
    //         if (result.snapshot && result.snapshot.length > 0){
    //             deleteMedia(result.snapshot, 'image')
    //         } 
    //         if (result.video.length < 1 && result.image.length < 1 && result.snapshot.length < 1) {
    //             return res.sendStatus(200);
    //         }
    //     })
    //     return res.sendStatus(200);   
    // }

    // if (req.header !== null && req.header('data-categ') === 'aroundme') {
    //     return fetchAround({});
    // }

    // if (req.header !== null && req.header('data-categ') === 'mylocation') {
    //     return fetchAround({authorID: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'fetcharoundme') {
    //     return fetchAround({_id: req.body.id, authorID: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
    //     return fetchAround({mode: 'publish', shareMe: []});
    // }

    // if (req.header !== null && req.header('data-categ') === 'chat') {
    //     let id = req.body.id
    //     aroundme.findByIdAndUpdate(id, {$inc: {'view': 1}}).then(chatFnd => {
    //         if (chatFnd) {
    //             let chatTotal = chatFnd.chat.length
    //             let chat = arraySort(chatFnd.chat, 'position', {reverse: true});
    //             let updateChat =  chat.splice(req.body.skipChat, req.body.chatLimit -1);
    //             let allChat = []
    //             let allChatTotal = 0
    //             if (updateChat.length < 1) {
    //                 return res.status(200).send({chat: allChat, chatTotal})
    //             }
    //             for (let cnt of updateChat) {
    //                 let reply = []
    //                 for (let replyCnt of cnt.reply) {
    //                     let cnt = {
    //                         created: replyCnt.created,
    //                         cntType: replyCnt.cntType,
    //                         msg: replyCnt.msg,
    //                         ID: replyCnt.ID,
    //                         chatID: replyCnt.chatID,
    //                         format: replyCnt.format,
    //                         position: replyCnt.position
    //                     }
    //                     if (!replyCnt.delete && !replyCnt.block) {
    //                         cnt['delete'] = false;
    //                         reply.push(cnt);
    //                     }
    //                     if (!replyCnt.delete && replyCnt.block && replyCnt.block.filter(id => id !== req.user)) {
    //                         cnt['delete'] = false;
    //                         reply.push(cnt);
    //                     }
                        
    //                     if (replyCnt.delete || (replyCnt.block && replyCnt.block.filter(id => id === req.user)[0])) {
    //                         cnt['delete'] =  true;
    //                         reply.push(cnt)
    //                     } 
    //                 }
    //                 let model = cnt.userType === 'authUser' ? authUser : user;
    //                 model.findById(cnt.ID).then(userDet => {
    //                     allChat.push({
    //                         username: userDet.username,
    //                         image: userDet.image,
    //                         created: cnt.created,
    //                         cntType: cnt.cntType,
    //                         msg: cnt.msg,
    //                         ID: cnt.ID,
    //                         chatID: cnt.chatID,
    //                         format: cnt.format,
    //                         position: cnt.position,
    //                         reply,
    //                         delete: !cnt.delete ?  cnt.block.filter(id => id === req.user)[0] ? true : false : cnt.delete
    //                     })
    //                     ++allChatTotal;
    //                     if (allChatTotal === updateChat.length) {
    //                         res.status(200).send({chat: allChat, chatTotal})
    //                     } 
    //                 })
    //             }
                
    //         } else {
    //             res.sendStatus(404)
    //         }
    //     })
    // }

    // if(req.header !== null && req.header('data-categ') === 'pvtcreateChat'){
    //     let id = req.body.id;
    //     let cnt = req.body;
    //     if (cnt.msg && !cnt.msg.editMsg) {
    //         let chats = {
    //             ID: req.user,
    //             userType: req.userType,
    //             cntType: 'typedPlain',
    //             msg: cnt.msg,
    //             chatID: cnt.chatID,
    //             format: 'typedPlain'
    //         }
    //         saveFile(id, chats).then((result) => {
    //             res.status(200).send(result)
    //         }).catch(err =>{
    //             res.status(500).send(err)
    //         })
    //     } else {
    //         let msg = cnt.msg
    //         aroundme.findById(id).then(chatDet => {
    //             if (chatDet && chatDet.chat) {
    //                 let content = chatDet.chat;
    //                 let update = content.filter(cnt => cnt.chatID === msg.mainID)[0];
    //                 if (update && update.ID === req.user) {
    //                 if (!msg.chatID) {
    //                     let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
    //                     if (update) {
    //                         if (update && (update.cntType !== 'typedPlain')) {
    //                             deleteMedia([{id: update.msg }], update.cntType).then(() => {
    //                                 update.msg = msg.editMsg;
    //                                 update['edit'] = true;
    //                                 update.cntType = 'typedPlain'
    //                                 update.format = 'typedPlain'
    //                                 content[index] = update;
    //                                 editCnt(content, update).then(cnt => {
    //                                     return res.status(200).send(cnt)
    //                                 })
    //                             })
    //                         } else {
    //                             update.msg = msg.editMsg;
    //                             update['edit'] = true;
    //                             content[index] = update
    //                             editCnt(content, update).then(cnt => {
    //                                 return res.status(200).send(cnt)
    //                             })
    //                         }
    //                     }
    //                 } else {
    //                     let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
    //                     if (update) {
    //                         let filterReply = update.reply.filter(replyCnt => replyCnt.chatID === msg.chatID)[0];
    //                         let filterIndex = update.reply.findIndex(replyCnt => replyCnt.chatID === msg.chatID)[0];
    //                         if (filterReply) {
    //                             if (filterReply && (filterReply.cntType !== 'typedPlain')) {
    //                                 deleteMedia([{id: filterReply.msg }], filterReply.cntType).then(() => {
    //                                     filterReply.msg = msg.editMsg
    //                                     filterReply['edit'] = true;
    //                                     filterReply.cntType = 'typedPlain';
    //                                     filterReply.format = 'typedPlain';
    //                                     update.reply[filterIndex] = filterReply;
    //                                     content[index] = update
    //                                     editCnt(content, update).then(cnt => {
    //                                         return res.status(200).send(cnt)
    //                                     })
    //                                 })
    //                             } else {
    //                                 filterReply.msg = msg.editMsg
    //                                 filterReply['edit'] = true;
    //                                 update.reply[filterIndex] = filterReply;
    //                                 content[index] = update
    //                                 editCnt(content, update).then(cnt => {
    //                                     return res.status(200).send(cnt)
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 res.sendStatus(200)
    //             }
                
    //             function editCnt(content, updateCnt) {
    //                 return new Promise((resolve, reject) => {
    //                     aroundme.findByIdAndUpdate(id, {
    //                         chat: content}).then(() => {
    //                             save(updateCnt, updateCnt.position).then(cnt => {
    //                                 resolve(cnt)
    //                             })
    //                         })
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // }

    // if (req.header !== null && req.header('data-categ') === 'pvtDeleteChat') {
    //     let id = req.body.id;
    //     let cnts = req.body.cnt
    //     aroundme.findById(id).then(chatDet => {
    //         if (chatDet) {
    //             let chats = chatDet.chat;
    //             if (chats && chats.length > 0) {
    //                 let deleteTotal = 0;
    //                 let curIndex = 0;
    //                 for (let cnt of cnts) {
    //                     if (!cnt.chatID) {
    //                         let filterCnt = chats.filter((chat, index)=> {
    //                             if (chat.chatID === cnt.mainID) {
    //                                 curIndex = index;
    //                                 return true;
    //                             }
    //                             return false;
    //                         })[0];
    //                         if (filterCnt && (filterCnt.ID === req.user)) {
    //                             let cloned = JSON.parse(JSON.stringify(filterCnt));
    //                             let update = {...cloned, delete: true, msg: null}
    //                             chats[curIndex] = update;
    //                             if (filterCnt && (filterCnt.cntType !== 'typedPlain')) {
    //                                 deleteMedia([{id: filterCnt.msg }], filterCnt.cntType).then(() => {
    //                                     ++deleteTotal;
    //                                     if (cnts.length === deleteTotal) {
    //                                         updateChat(id, chats).then(() => {
    //                                             res.status(200).send(cnts)
    //                                         })
    //                                     }
    //                                 })
    //                             } else {
    //                                 ++deleteTotal;
    //                                 if (cnts.length === deleteTotal) {
    //                                     updateChat(id, chats).then(() => {
    //                                         res.status(200).send(cnts)
    //                                     })
    //                                 }
    //                             }
    //                         } else {
    //                             if (filterCnt) {
    //                                 ++deleteTotal;
    //                                 let block = filterCnt.block ? filterCnt.block.concat(req.user) : [req.user];
    //                                 block = [...new Set(block)]
    //                                 let cloned = JSON.parse(JSON.stringify(filterCnt));
    //                                 let update = {...cloned, block}
    //                                 chats[curIndex] = update;
    //                                 if (cnts.length === deleteTotal) {
    //                                     updateChat(id, chats).then(() => {
    //                                         res.status(200).send(cnts)
    //                                     }).catch(err => {
    //                                         res.status(500).send(err)
    //                                     })
    //                                 }
    //                             } else {
    //                                 res.status(200).send(cnts)
    //                             }
    //                         }
    //                     } else {
    //                         let filterReply = chats.filter((chat, index)=> {
    //                             if (chat.chatID === cnt.mainID) {
    //                                 curIndex = index;
    //                                 return true;
    //                             }
    //                             return false;
    //                         })[0];
    //                         if (filterReply) {
    //                             let filterCnt = filterReply.reply.filter(replyCnt => replyCnt.chatID === cnt.chatID)[0];
    //                             let filterIndex = filterReply.reply.findIndex(replyCnt => replyCnt.chatID === cnt.chatID);
                                
    //                             if (filterCnt) {
    //                                 if (filterCnt && (filterCnt.ID === req.user)) {
    //                                     let cloned = JSON.parse(JSON.stringify(filterCnt));
    //                                     let update = {...cloned, delete: true, msg: null}
    //                                     filterReply.reply[filterIndex] = update;
    //                                     chats[curIndex] = filterReply;
    //                                     if (filterCnt && (filterCnt.cntType !== 'typedPlain')) {
    //                                         deleteMedia([{id: filterCnt.msg }], filterCnt.cntType).then(() => {
    //                                             ++deleteTotal;
    //                                             if (cnts.length === deleteTotal) {
    //                                                 updateChat(id, chats).then(() => {
    //                                                     res.status(200).send(cnts)
    //                                                 })
    //                                             }
    //                                         })
    //                                     } else {
    //                                         ++deleteTotal;
    //                                         if (cnts.length === deleteTotal) {
    //                                             updateChat(id, chats).then(() => {
    //                                                 res.status(200).send(cnts)
    //                                             })
    //                                         }
    //                                     }
    //                                 } else {
    //                                     if (filterCnt) {
    //                                         ++deleteTotal;
    //                                         let block = filterCnt.block ? filterCnt.block.concat(req.user) : [req.user];
    //                                         block = [...new Set(block)]
    //                                         let cloned = JSON.parse(JSON.stringify(filterCnt));
    //                                         let update = {...cloned, block}
    //                                         filterReply.reply[filterIndex] = update;
    //                                         chats[curIndex] = filterReply;
    //                                         if (cnts.length === deleteTotal) {
    //                                             updateChat(id, chats).then(() => {
    //                                                 res.status(200).send(cnts)
    //                                             }).catch(err => {
    //                                                 res.status(500).send(err)
    //                                             })
    //                                         }
    //                                     } else {
    //                                         res.status(200).send(cnts)
    //                                     }
    //                                 }
    //                             } else {
    //                                 res.status(200).send(cnts)
    //                             } 
    //                         } else {
    //                             res.status(200).send(cnts)
    //                         }
    //                     }
                        
                        
    //                 }
    //             }
    //         } else {
    //             res.sendStatus(401)
    //         }
    //     })
    //     function updateChat (id, chats) {
    //         return new Promise((resolve, reject) => {
    //             aroundme.findByIdAndUpdate(id, {
    //                 chat: chats}).then(() => {
    //                 resolve()
    //             }).catch(err => {
    //                 reject(err)
    //             })
    //         })
    //     }
    // }

    // if(req.header !== null && req.header('data-categ') === 'uploadmedia'){
    //     formInit(req, formidable).then(form => {
    //         let files = form.files && form.files.media ? form.files.media.length === undefined ? [form.files.media] : form.files.media : []
    //         let fields = form.fields;
    //         let chatID = JSON.parse(fields.chatID);
    //         let id = fields.id;
    //         if (chatID && !chatID.mainID) {
    //             for (let file of files) {
    //                 savetemp({path: file.path, type: fields.type, name: file.name}, [], req.user).then(tempFileID => {
    //                     let doc = {
    //                         path: file.path,
    //                         bucketName: fields.type,
    //                         filename: file.name
    //                     }
    //                     uploadStream(doc).then((fileDet) => {
    //                         if (fileDet) {
    //                             let chats = {
    //                                 ID: req.user,
    //                                 userType: req.userType,
    //                                 cntType: fields.type,
    //                                 msg: fileDet._id,
    //                                 chatID: fields.chatID,
    //                                 format: fields.format
    //                             }
    //                             tempFile.findByIdAndRemove(tempFileID).then(() => {
    //                                 saveFile(id, chats).then((result) => {
    //                                     res.status(200).send(result)
    //                                 }).catch(err =>{
    //                                     res.status(500).send(err)
    //                                 })
    //                             })
    //                         } else {
    //                             res.sendStatus(500)
    //                         }
    //                     }).catch(err => {
    //                         res.status(500).send(err)
    //                     })
    //                 })
    //             }
    //         } else {
    //             let msg = chatID
    //             aroundme.findById(id).then(chatDet => {
    //                 if (chatDet && chatDet.chat) {
    //                     let content = chatDet.chat;
    //                     let update = content.filter(cnt => cnt.chatID === msg.mainID)[0];
    //                     if(update && update.ID === req.user) {
    //                         if (!msg.chatID) {
    //                             let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
    //                             if (update) {
    //                                 if (update && (update.cntType !== 'typedPlain')) {
    //                                     deleteMedia([{id: update.msg }], update.cntType).then(() => {
    //                                         editMedia().then(result => {
    //                                             update.msg = result
    //                                             update['edit'] = true;
    //                                             update.cntType = fields.type;
    //                                             update.format = fields.format;
    //                                             content[index] = update
    //                                             editCnt(content, update).then(cnt => {
    //                                                 return res.status(200).send(cnt)
    //                                             })
    //                                         })
    //                                     })
    //                                 } else {
    //                                     editMedia().then(result => {
    //                                         update.msg = result
    //                                         update['edit'] = true;
    //                                         update.cntType = fields.type;
    //                                         update.format = fields.format;
    //                                         content[index] = update
    //                                         editCnt(content, update).then(cnt => {
    //                                             return res.status(200).send(cnt)
    //                                         })
    //                                     })
    //                                 }
    //                             }
    //                         } else {
    //                             let index = content.findIndex(cnt => cnt.chatID === msg.mainID)
    //                             if (update) {
    //                                 let filterReply = update.reply.filter(replyCnt => replyCnt.chatID === msg.chatID)[0];
    //                                 let filterIndex = update.reply.findIndex(replyCnt => replyCnt.chatID === msg.chatID)[0];
    //                                 if (filterReply) {
    //                                     if (filterReply && (filterReply.cntType !== 'typedPlain')) {
    //                                         deleteMedia([{id: filterReply.msg }], filterReply.cntType).then(() => {
    //                                             editMedia().then(result => {
    //                                                 filterReply.msg = result
    //                                                 filterReply['edit'] = true;
    //                                                 filterReply.cntType = fields.type;
    //                                                 filterReply.format = fields.format;
    //                                                 update.reply[filterIndex] = filterReply;
    //                                                 content[index] = update
    //                                                 editCnt(content, update).then(cnt => {
    //                                                     return res.status(200).send(cnt)
    //                                                 })
    //                                             })
    //                                         })
    //                                     } else {
    //                                         editMedia().then(result => {
    //                                             filterReply.msg = result
    //                                             filterReply['edit'] = true;
    //                                             filterReply.cntType = fields.type;
    //                                             filterReply.format = fields.format;
    //                                             update.reply[filterIndex] = filterReply;
    //                                             content[index] = update
    //                                             editCnt(content, update).then(cnt => {
    //                                                 return res.status(200).send(cnt)
    //                                             })
    //                                         })
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     } else {
    //                         res.sendStatus(200)
    //                     }
    //                 }   
    //             })
    //         }
    //         function editMedia() {
    //             return new Promise((resolve, reject) => {
    //                 for (let file of files) {
    //                     savetemp({path: file.path, type: fields.type, name: file.name}, [], req.user).then(tempFileID => {
    //                         let doc = {
    //                             path: file.path,
    //                             bucketName: fields.type,
    //                             filename: file.name
    //                         }
    //                         uploadStream(doc).then((fileDet) => {
    //                             if (fileDet) {
    //                                 tempFile.findByIdAndRemove(tempFileID).then(() => {
    //                                     resolve(fileDet._id)
    //                                 })
    //                             } else {
    //                                 reject()
    //                             }
    //                         }).catch(err => {
    //                         reject(err)
    //                         })
    //                     })
    //                 }
    //             })
    //         }
    //         function editCnt(content, update) {
    //             return new Promise((resolve, reject) => {
    //                 aroundme.findByIdAndUpdate(id, {
    //                     chat: content}).then(() => {
    //                     save(update, update.position).then(cnt => {
    //                         resolve(cnt)
    //                     })
    //                 })
    //             })
    //         }
            
    //     })
    // }

    // function fetchAround(conditions, meta) {
    //     let condition = { _isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {created: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         aroundme.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             aroundme.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
    //                 let cntArray= [];
    //                 let send = 0;
    //                 if (result.length < 1) {
    //                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                 }
    //                 for (let cnt of result) {
    //                     fetch(cnt.username, cnt.userImage, cnt, cntArray).then(cnt => {
    //                         cntArray = cnt;
    //                         ++send 
    //                         if (send === result.length) {
    //                             res.send({cnt: cntArray, cntTotal}).status(200)
    //                         }
    //                     }) 
    //                 }
                    
    //                 function fetch(username, image, cnt, cntArray) {
    //                     return new Promise((resolve, reject) => {
    //                        let update ={};
    //                        let isLiked = req.user ? cnt.liked.filter(userID => userID === req.user) : [];
    //                         if (isLiked.length > 0) {
    //                             update['liked'] = true
    //                         } else {
    //                             update['liked'] = false
    //                         }
    //                         update['username'] = username;
    //                         update['userImage'] = image;
    //                         update['userOpt'] = cnt.authorID === req.user;
    //                         update['authorID'] = cnt.authorID;
    //                         update['comment'] = cnt.comment.length;
    //                         update['post'] = cnt.post;
    //                         update['image'] = cnt.image;
    //                         update['created'] = cnt.created;
    //                         update['snapshot'] = cnt.snapshot;
    //                         update['favorite'] = cnt.favorite;
    //                         update['video'] = cnt.video;
    //                         update['view'] = cnt.view;
    //                         update['_id'] = cnt._id;
    //                         cntArray.push({...update});
    //                         resolve(cntArray)
    //                     })
    //                 }
    //             }).catch(err => {
    //                 res.status(500).send(err);
    //             })
    //         }).catch(err => {
    //             res.status(500).send(err);
    //         }) 
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })
    // }
    
    // function adminDet(userID) {
    //     return new Promise((resolve, reject) => {
    //         user.findById(userID).then(userFnd => {
    //             if (!userFnd) {
    //                 authUser.findById(userID).then(authFnd => {
    //                     resolve({
    //                         username: authFnd.username,
    //                         studenttotal: authFnd.studenttotal, 
    //                         image: authFnd.image,
    //                         status: authFnd.status
    //                      }) 
    //                 })
    //             } else {
    //                 resolve({
    //                     username: userFnd.username,
    //                     studenttotal: userFnd.studenttotal, 
    //                     image: userFnd.image,
    //                     status: userFnd.status
    //                 })
    //             }
    //         })
    //     })
    // }

    // function saveFile(id, chats) {
    //     return new Promise((resolve, reject) => {
    //         aroundme.findById(id).then(chatDet => {
    //             if (chatDet) {
    //                 let position = chatDet.lastID && chatDet.lastID === req.user ? chatDet.position : chatDet.lastID === '' || !chatDet.lastID ? 0  : chatDet.position + 1;
    //                 chats['position'] = position;
    //                 if (chatDet.lastID && chatDet.lastID === req.user) {
    //                     let updateChat = chatDet.chat
    //                     let lastChat = updateChat[updateChat.length - 1];
    //                     if (lastChat && (chatDet.lastID === lastChat.ID)) {
    //                         chats['mainID'] = lastChat.chatID;
    //                         lastChat.reply.push(chats);
    //                         updateChat[updateChat.length - 1] = lastChat;
    //                         aroundme.findByIdAndUpdate(id, {
    //                         chat: updateChat, lastID: req.user, position, $addToSet: { comment : req.user }}).then(() => {
    //                             save(lastChat, position).then(cnt => {
    //                                 resolve(cnt)
    //                             })
    //                         })
    //                     } else {
    //                         aroundme.findByIdAndUpdate(id, {
    //                             $push: {chat: chats}, lastID: req.user, position,  $addToSet: { comment : req.user }}).then(() => {
    //                             save(chats, position).then(cnt => {
    //                                 resolve(cnt)
    //                             })
    //                         })
    //                     }
    //                 } else {
    //                     aroundme.findByIdAndUpdate(id, {
    //                         $push: {chat: chats}, lastID: req.user, position,  $addToSet: { comment : req.user }}).then(() => {
    //                         save(chats, position).then(cnt => {
    //                             resolve(cnt)
    //                         })
    //                     })
    //                 }
    //             } else {
    //                 reject('Not Found')
    //             }
    //         })
    //     }).catch(err => {
    //         reject(err)
    //     })
    // }

    // function save (chat, position) {
    //     return new Promise((resolve, reject) => {
    //         let cloned = JSON.parse(JSON.stringify(chat));
    //         let update = {...cloned}
    //         update['username'] = req.username;
    //         update['position'] = position;
    //         update['image'] = false;
    //         update['reply'] = update.reply ? update.reply : [];
    //         resolve([update])
    //     })
    // }

});

module.exports = router

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const webpush = require('web-push');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
let deleteMedia = require('./utility/deletemedia');
const { group, qcontent,  connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonechatRoom') {
        group.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            if (result && result.question) {
                qcontent.findById(result.question).then(cnt => {
                    let updateResult = {...JSON.parse(JSON.stringify(result))}
                    updateResult['cbt'] = cnt ? {question: cnt.question, totalOption: cnt.totalOption} : {};
                    res.status(200).send(updateResult);
                });
            } else {
                res.status(200).send(result);
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }
    // if (req.header !== null && req.header('data-categ') === 'group') {
    //     return fetchGroup({});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
    //     return fetchGroup({shareMe: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'mygroup') {
    //     return fetchGroup({authorID: req.user});
    // }
    

    // if (req.header !== null && req.header('data-categ') === 'onlygroup') {
    //     group.find({_isCompleted: true, 
    //         $or: [ { member: { $in: req.user } }, { authorID:  req.user } ]}).then(grp => {
    //             let cntArray = [];
    //             for (let cnt of grp) {
    //                 cntArray.push({id: cnt._id, title: cnt.title, image: cnt.image})
    //             }
    //             res.status(200).send(cntArray)
    //         })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'requestTotal') {
    //     return group.find({authorID: req.user}).then(result => {
    //         let requestTotal = 0;
    //         for (let det of result) {
    //             requestTotal = det.request.length + requestTotal;
    //         }
    //         res.status(200).send(String(requestTotal));
    //     })
        
    // }

    // if (req.header !== null && req.header('data-categ') === 'request') {
    //     return fetchGroup({authorID: req.user, 'request.0': {$exists: true}})
    // }

    // if (req.header !== null && req.header('data-categ') === 'joined') {
    //     return fetchGroup({member: {$in: req.user}});
    // }

    // if (req.header !== null && req.header('data-categ') === 'join') {
    //     if (!req.authType) {
    //         let id = req.body.id;
    //         group.findByIdAndUpdate(id, {$addToSet: { request: req.user }}).then(grp => {
    //             grpnotifies.findOne({userID: grp.authorID}).then(result => {
    //                 let grpsNotify = [];
    //                 let request = 0;
    //                 if (result) {
    //                     let grpNotify = result.group.filter(grpDet => grpDet.ID === id)
    //                     if (grpNotify.length > 0) {
    //                         grpNotify[0].edit = false;
    //                         grpNotify[0].view = false;
    //                         grpNotify[0].isMember = true;
    //                         grpNotify[0].request = ++grpNotify[0].request;
    //                         grpsNotify = result.group.filter(grpDet => grpDet.ID !== id)
    //                         grpsNotify.push(grpNotify[0]);
    //                         request = grpNotify[0].request;
    //                     } else {
    //                         request = 1;
    //                         grpsNotify.push(...result.group, {ID: id, view: false, request: 1, isMember: true})
    //                     }
    //                     grpnotifies.findOneAndUpdate({userID: grp.authorID}, {group: grpsNotify }).then(() =>{
    //                         pushNotify(grp.authorID,`You have ${request} scholars request`, 
    //                         `From ${grp.title} Group`, `/group/request`).then(() => {
    //                             res.sendStatus(200)
    //                         })
    //                     }).catch(err =>{
    //                         res.status(500).send(err)
    //                     })
    //                 }else {
    //                     let newNotify = new grpnotifies({
    //                         userID: grp.authorID,
    //                         notifications: 1,
    //                         group:  [{ID: id, view: false, request: 1, isMember: true}] 
    //                     });
    //                     newNotify.save().then(() => {
    //                         pushNotify(grp.authorID,`You have 1 scholar's request`, 
    //                         `From ${grp.title} Group`, `/group/request`).then(() => {
    //                             res.sendStatus(200)
    //                         })
    //                     }).catch(err =>{
    //                         res.status(500).send(err)
    //                     })
    //                 }
    //             })
    //         })
    //     } else {
    //         res.cookie('redirect', '/group');
    //         res.redirect('/login')
    //     }
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'reject') {
    //     let id = req.body.id;
    //     let reqUser = req.body.user;
    //     group.findByIdAndUpdate(id, { $pull: {request: reqUser }}).then(grp =>{
    //        res.sendStatus(200)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'cancel') {
    //     group.findByIdAndUpdate(req.body.id, { $pull: {request: req.user }}).then(grp =>{
    //        res.sendStatus(200)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'grpreq') {
    //     let request = [];
    //     let requestTotal = 0;
    //     let id = req.body.id;
    //     return group.findById(id).then(grp => {  
    //         if (!grp) {
    //             return res.sendStatus(404);
    //         }   

    //         if (grp && grp.request.length < 1 ) {
    //             return res.status(200).send(request)
    //         }

    //         for (let id of grp.request) {
    //             user.findById(id).then(userDet =>{
    //                 if (!userDet) {
    //                     authUser.findById(id).then(authDet => {
    //                         if (authDet) {
    //                             grpInfo(authDet, request).then(info => {
    //                                 ++requestTotal;
    //                                 request = info;
    //                                 if (requestTotal === grp.request.length) {
    //                                     res.status(200).send(request)
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 } else {
    //                     grpInfo(userDet, request).then(info => {
    //                         ++requestTotal;
    //                         request = info;
    //                         if (requestTotal === grp.request.length) {
    //                             res.status(200).send(request)
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //         function grpInfo(userDet, request) {
    //             return new Promise((resolve, reject) =>{
    //                 request.push({
    //                     _id: userDet._id,
    //                     username: userDet.username, 
    //                     image: userDet.image,
    //                     studenttotal: userDet.student.length + userDet.teacher.length,
    //                     status: userDet.status
    //                 })
    //                 resolve(request)
    //             })
    //         }
    //     })
    // }
    
    // if (req.header !== null && req.header('data-categ') === 'grpinfo') {
    //     let id = req.body.id;
    //     let status = req.body.status === 'online';
    //     return group.findById(id).then(result =>{
    //         if (result) {
    //             grpDet(result, status).then(info => {
    //                 res.status(200).send(info);
    //             })

    //             function grpDet(grp, status) {
    //                 return new Promise((resolve, reject) => {
    //                     let member = [];
    //                     let memberTotal = 0;

    //                     if (grp.member.length < 1 ) {
    //                         return resolve(member)
    //                     }

    //                     for (let id of grp.member) {
    //                         grpInfo(id, status, member).then(info => {
    //                             member = info;
    //                             ++memberTotal;
    //                             if (memberTotal === grp.member.length)  {
    //                                  return resolve(member)
    //                             }
    //                         })
    //                     }
    //                 })
    //             }

    //             function grpInfo(id, status, member) {
    //                 return new Promise((resolve, reject) => {
    //                     user.findById(id).then(det => {
    //                         if (!det) {
    //                             authUser.findById(id).then(authDet => {
    //                                 if (authDet && (authDet.status === status)) {
    //                                     member.push({
    //                                         _id: authDet._id,
    //                                         username: authDet.username, 
    //                                         image: authDet.image,
    //                                         studenttotal: authDet.student.length + authDet.teacher.length,
    //                                         status: authDet.status
    //                                     })
    //                                 }
    //                                 resolve(member)
    //                             })
    //                         } else {
    //                             if (det && (det.status === status)) {
    //                                 member.push({
    //                                     _id: det._id,
    //                                     username: det.username, 
    //                                     image: det.image,
    //                                     studenttotal: det.student.length + det.teacher.length,
    //                                     status: det.status
    //                                 })
    //                             }
    //                             resolve(member)
    //                         }
    //                     })
    //                 })
    //             }
    //         } else {
    //             res.sendStatus(404);
    //         }
    //     })
    // }

    // if (req.header !== null && req.header('data-categ') === 'accept') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     let rawID = req.body.id;
    //     let reqUser = req.body.user;
    //     group.findOneAndUpdate({authorID: req.user, _id: id}, { $addToSet: {member: reqUser }, 
    //         $pull: {request: reqUser }, $inc: {'memberTotal': 1}}).then(grp =>{
    //         grpnotifies.findOne({userID: reqUser}).then(result => {
    //             let grpsNotify = [];
    //             if (result) {
    //                 let grpNotify = result.group.filter(grpDet => grpDet.ID === rawID)
    //                 if (grpNotify.length > 0) {
    //                     grpNotify[0].edit = false;
    //                     grpNotify[0].view = false;
    //                     grpNotify[0].isMember = true;
    //                     grpsNotify = result.group.filter(grpDet => grpDet.ID !== rawID)
    //                     grpsNotify.push(grpNotify[0]);
    //                     request = grpNotify[0].request;
    //                 } else {
    //                     grpsNotify.push(...result.group, {ID: rawID, view: false, isMember: true})
    //                 }
    //                 grpnotifies.findOneAndUpdate({userID: reqUser}, {group: grpsNotify }).then(() =>{
    //                     pushNotify(reqUser,`Welcome to ${grp.title} group`, 
    //                         `From Group Admin`, `/chat/group/${grp._id}`).then(() => {
    //                         res.sendStatus(200)
    //                     })
    //                 }).catch(err =>{
    //                     res.status(500).send(err)
    //                 })
    //             }else {
    //                 let newNotify = new grpnotifies({
    //                     userID: reqUser,
    //                     notifications: 1,
    //                     group:  [{ID: rawID, view: false, isMember: true}] 
    //                 });
    //                 newNotify.save().then(() => {
    //                     pushNotify(reqUser,`Welcome to ${grp.title} group`, 
    //                         `From Group Admin`, `/chat/group/${grp._id}`).then(() => {
    //                         res.sendStatus(200)
    //                     })
    //                 }).catch(err =>{
    //                     res.status(500).send(err)
    //                 })
    //             }
    //         })
    //     })
    //     return
    // }
    
    // if (req.header !== null && req.header('data-categ') === 'exitgroup') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     group.findOne({_id: id}).then(fnd => {
    //         if(fnd) {
    //             let member = fnd.member.filter(userID => userID !== req.user);
    //             group.findOneAndUpdate({_id: id}, {member}).then(()=> {
    //                 res.sendStatus(200)
    //             })
    //         } else {
    //             res.sendStatus(404)
    //         }
    //     }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'deletegroup') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     group.findOneAndDelete({_id: id, authorID: req.user}).then(fnd => {
    //         if(fnd) {
    //             if (fnd.image.length > 0) {
    //                 deleteMedia([{id: fnd.image[0].id.toHexString() }], 'image').then(() => {
    //                     res.sendStatus(200)
    //                 })
    //                 return
    //             }
    //             res.sendStatus(200)
    //         } else {
    //             res.sendStatus(401)
    //         }
    //     }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //     return
    // }

    // if (req.header !== null && req.header('data-categ') === 'remove') {
    //     let id = mongoose.mongo.ObjectId(req.body.id);
    //     let rawID = req.body.id;
    //     let userID = req.body.user;
    //     group.findOneAndUpdate({authorID: req.user, _id: id}, { 
    //         $pull: {member: userID },
    //         $inc: {'memberTotal': -1}}).then(grp =>{
    //         grpnotifies.findOne({userID}).then(result => {
    //             let grpsNotify = [];
    //             if (result) {
    //                 let grpNotify = result.group.filter(grpDet => grpDet.ID === rawID)
    //                 if (grpNotify.length > 0 &&  grpNotify[0].isMember) {
    //                     grpNotify[0].edit = false;
    //                     grpNotify[0].view = false;
    //                     grpNotify[0].isMember = false;
    //                     grpsNotify = result.group.filter(grpDet => grpDet.ID !== rawID)
    //                     grpsNotify.push(grpNotify[0]);
    //                     grpnotifies.findOneAndUpdate({userID}, {group: grpsNotify }).then(() =>{
    //                         res.sendStatus(200)
    //                     }).catch(err =>{
    //                         res.status(500).send(err)
    //                     })
    //                     return
    //                 } 
    //             }
    //             res.sendStatus(200)
    //         })
    //     })
    //     return
    // }

    // function pushNotify(userID, title, content, url) {
    //     return new Promise((resolve, reject) => {
    //         user.findById(userID).then(userFnd => {
    //             if (userFnd) {
    //                 return sendNotify(userFnd)
    //             } else {
    //                 authUser.findById(userID).then(authFnd => {
    //                     if (authFnd) {
    //                       return  sendNotify(authFnd);
    //                     }
    //                     return resolve()
    //                 })
    //             }
    //         })
            
    //         function sendNotify(result) {
    //             if (result && result.enableNotification) {
    //                 var pushConfig = {
    //                     endpoint: result.subscription[0].endpoint,
    //                     keys: {
    //                       auth: result.subscription[0].keys.auth,
    //                       p256dh: result.subscription[0].keys.p256dh
    //                     }
    //                   };
    //                   var pushOptions = {
    //                     vapidDetails: {
    //                         subject: "https://www.slodge24.com",
    //                         privateKey: result.pushMsg[0].privatekey,
    //                         publicKey: result.pushMsg[0].publickey
    //                     },
    //                     headers: {}
    //                 };
    //                 let isImage = content.image && content.image.length > 0 ? {image:  content.image[0]} : {}; 
    //                   webpush.sendNotification(pushConfig, JSON.stringify({
    //                     title,
    //                     content,
    //                     openUrl: url
    //                   }), pushOptions).then(() => {
    //                     resolve()
    //                   })
    //                 .catch((err) => {
    //                     resolve()
    //                 })
    //             } else {
    //                 resolve()
    //             }
    //         }
    //     })
    // }

    // function fetchGroup(conditions, meta) {
    //     let condition = { _isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {groupCreated: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         group.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             group.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
    //                 let cntArray= [];
    //                 let send = 0;
    //                 if (result.length < 1) {
    //                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                 }
    //                 for (let cnt of result) {
    //                     user.findById(cnt.authorID).then(userFnd => {
    //                         if (!userFnd) {
    //                             res.sendStatus(200)
    //                         } else {
    //                             let userFriend = userFnd.friend.length
    //                             fetch(userFnd.username, userFriend, userFnd.image, userFnd.status, cnt, cntArray).then(cnt => {
    //                                 cntArray = cnt;
    //                                 ++send 
    //                                 if (send === result.length) {
    //                                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                                 }
    //                             })
    //                         }
    //                     })   
    //                 }
                    
    //                 function fetch(username, friendtotal, image, status , cnt, cntArray) {
    //                     return new Promise((resolve, reject) => {
    //                         let update = {};
    //                         let isMember = req.user ? cnt.member.filter(userID => userID === req.user) : [];
    //                         if (isMember.length > 0 || cnt.groupMode === 'general') {
    //                             update['member'] = true
    //                         } else {
    //                             update['member'] = false
    //                         }
    //                         let isRequest = req.user ? cnt.request.filter(userID => userID === req.user) : [];
    //                         if (isRequest.length > 0) {
    //                             update['request'] = true
    //                         } else {
    //                             update['request'] = false
    //                         }
    //                         update['username'] = username;
    //                         update['friendtotal'] = friendtotal;
    //                         update['userImage'] = image;
    //                         update['status'] = status;
    //                         update['userOpt'] = cnt.authorID === req.user;
    //                         update['authorID'] = cnt.authorID;
    //                         update['category'] = cnt.category;
    //                         update['desc'] = cnt.desc;
    //                         update['image'] = cnt.image;
    //                         update['members'] = cnt.member.length + 1;
    //                         update['groupCreated'] = cnt.groupCreated;
    //                         update['title'] = cnt.title;
    //                         update['requestTotal'] = cnt.request.length;
    //                         update['online'] = cnt.online.length,
    //                         update['groupMode'] = cnt.groupMode ? cnt.groupMode : 'private'
    //                         update['_id'] = cnt._id;
    //                         update['id'] = cnt._id;
    //                         cntArray.push({...update});
    //                         resolve(cntArray)
    //                     })
    //                 }
    //             })
    //         }) 
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     })
    // }

    // if (req.header !== null && req.header('data-categ') === 'groupCateg') {
    //     category.findOne({}).then(result => {
    //         let checkRes =  result ? result.group : []
    //         res.send(checkRes).status(200);
    //     }).catch(err => {
    //         res.status(500).send(err);
    //     });
    //     return;
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
    //         return fetchGroup({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
    //      });
    //      return
    // }

    // if(req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('postSearch')) {
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //        let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
    //        group.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, _isCompleted: true}).then(result => {
    //             let resultCount = new String(result.length);
    //             res.send(resultCount).status(200);
    //         }).catch(err => {
    //             res.status(500).send(err);
    //         })
    //     })
    //     return ;
    // }
    
    // if (req.header !== null && req.header('data-categ')) {  
    //     return fetchGroup({category: req.header('data-categ')});
    // }
});

module.exports = router

let express = require('express');
let router = express.Router();
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
const { qchat, qcontent, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonecbt') {
        qchat.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
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
    // if (req.header('data-categ') === 'editform') {
    //     qchat.findOne({_id: req.body.id, authorID: req.user}).then(result => {
    //         if (result) {
    //             qcontent.findOne({qchatID: result.contentID}).then(cnt => {
    //                 if (cnt) {
    //                     let qchatCnt = []
    //                     qchatCnt.push({
    //                         position: 0, categ: result.category, duration: result.duration, hour: result.hour, 
    //                         video: result.video, image: result.image, snapshot: result.snapshot,
    //                         minute: result.minute, second: result.second, title: result.title, participant: result.access}, ...cnt.question)
    //                     res.status(200).send(qchatCnt)
    //                 } else {
    //                     res.sendStatus(404)
    //                 }
    //             })
    //         }  else {
    //             res.sendStatus(404)
    //         }
    //     })
    //     return
    // }


    // if (req.header !== null && req.header('data-categ') === 'deleteqchat') {
    //     qchat.findOneAndRemove({authorID: req.user,_id: req.body.id}).then(result => {
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
    //         qcontent.findOneAndRemove({qchatID: result.contentID}).then(que => {
    //             if (!que) {
    //                 return res.sendStatus(404);
    //             }
    //             for (let cnt of que.question) {
    //                 if (cnt.video && cnt.video.length > 0){
    //                     deleteMedia(cnt.video, 'media')
    //                 } 
    //                 if (cnt.image && cnt.image.length > 0){
    //                     deleteMedia(cnt.image, 'image')
    //                 } 
    //                 if (cnt.snapshot && cnt.snapshot.length > 0){
    //                     deleteMedia(cnt.snapshot, 'image')
    //                 } 
    //             }
    //         })  
    //     }) 
    //     return res.sendStatus(200);
    // }

    // if (req.header !== null && req.header('data-categ') === 'qchat') {
    //     return fetchQchat({mode: 'publish'});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
    //     return fetchQchat({mode: 'publish', shareMe: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'myqchat') {
    //     return fetchQchat({authorID: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
    //         return fetchQchat({$text: { $search: filter.searchCnt },mode: 'publish', ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
    //      });
    //      return
    // }

    // function fetchQchat(conditions, meta) {
    //     let condition = { _isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {created: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         qchat.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             qchat.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
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
    //                        let update = {};
    //                        let fndAccess = false;
    //                        let private = false;
    //                        let paid = false;
    //                        let model = cnt.access === 'friends' ? 
    //                        cnt.userType === 'authUser' ? authUser : user : null;
    //                         if (model) {
    //                             model.findById(cnt.authorID).then(fnd => {
    //                                 let friends = [...fnd.teacher, ...fnd.student, cnt.authorID]
    //                                 let checkFriend = friends.filter(id => id === req.user)[0];
    //                                 fndAccess = checkFriend ? checkFriend : false;
    //                                 props();
    //                             })
    //                             return;
    //                         }

    //                         if (cnt.access && Array.isArray(cnt.access)) {
    //                             let checkPrivate = [...cnt.access, cnt.authorID].filter(id => id === req.user)[0];
    //                             private =  checkPrivate ? checkPrivate : false
    //                         }   
    //                         props();

    //                         function props() {
    //                             if (cnt.paid && cnt.paid.length > 0) {
    //                                 let checkPaid = cnt.paid.filter(id => id === req.user)[0];
    //                                 paid = checkPaid ? checkPaid : false
    //                             }

    //                             update['username'] = username;
    //                             update['userImage'] = image;
    //                             update['userOpt'] = cnt.authorID === req.user;
    //                             update['authorID'] = cnt.authorID;
    //                             update['write'] = cnt.write;
    //                             update['comment'] = cnt.comment;
    //                             update['image'] = cnt.image;
    //                             update['hour'] = cnt.hour;
    //                             update['minute'] = cnt.minute;
    //                             update['second'] = cnt.second;
    //                             update['created'] = cnt.created;
    //                             update['qchatTotal'] = cnt.qchatTotal;
    //                             update['contentID'] = cnt.contentID;
    //                             update['mode'] = cnt.mode;
    //                             update['title'] = cnt.title;
    //                             update['access'] = cnt.access === 'public' ? true : cnt.access === 'friends' ? fndAccess ? fndAccess : paid : private ? private : paid;
    //                             update['snapshot'] = cnt.snapshot;
    //                             update['video'] = cnt.video;
    //                             update['amount'] = cnt.amount;
    //                             update['_id'] = cnt._id;
    //                             cntArray.push({...update});
    //                             resolve(cntArray)
    //                         }
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

    // if (req.header !== null && req.header('data-categ')) {  
    //     return fetchQchat({category: req.header('data-categ'), mode: 'publish'});
    // }
});

module.exports = router

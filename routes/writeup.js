let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
const {writeup, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getonewriteup') {
        writeup.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    // if (req.header('data-categ') &&  req.header('data-categ') === 'poet') {
    //     return fetchCnt({mode: 'publish'});
    // }

    // if (req.header('data-categ') &&  req.header('data-categ').startsWith('shared')) {
    //     return fetchCnt({mode: 'publish', shareMe: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'mypoet') {
    //     return fetchCnt({authorID: req.user});
    // }

    // function fetchCnt(conditions, meta) {
    //     let condition = {_isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {pwtCreated: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         poets.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             poets.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
    //                 let cntArray = [];
    //                 let send = 0;
    //                 if (result.length < 1) {
    //                     res.send({cnt: cntArray, cntTotal}).status(200)
    //                 }
    //                 for (let cnt of result) {
    //                     fetch(cnt.username, cnt.userImage, cnt, cntArray).then(cnt => {
    //                         cntArray = cnt;
    //                         ++send;
    //                         if (send === result.length) {
    //                             res.send({cnt: cntArray, cntTotal}).status(200)
    //                         }
    //                     }) 
    //                 }

    //                 function fetch(username, image, cnt, cntArray) {
    //                     return new Promise((resolve, reject) => {
    //                         let title = cnt.title;
    //                         cnt.title = String(title.substr(0, 1500000));
    //                         let isLiked = req.user ? cnt.liked.filter(userID => userID === req.user) : [];
    //                        let update ={};
    //                         if (isLiked.length > 0) {
    //                             update['liked'] = true
    //                         } else {
    //                             update['liked'] = false
    //                         }
    //                         update['username'] = username;
    //                         update['userImage'] = image;
    //                         update['userOpt'] = cnt.authorID === req.user;
    //                         update['authorID'] = cnt.authorID;
    //                         update['category'] = cnt.category;
    //                         update['helpFull'] = cnt.helpFull;
    //                         update['comment'] = cnt.comment;
    //                         update['favorite'] = cnt.favorite;
    //                         update['mode'] = cnt.mode;
    //                         update['pwtCreated'] = cnt.pwtCreated;
    //                         update['title'] = cnt.title;
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

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
    //         return fetchCnt({$text: { $search: filter.searchCnt },mode: 'publish', ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
    //      }).catch(err => {
    //         res.status(500).send(err)
    //     })
    //      return
    // }

    // if (req.header !== null && req.header('data-categ')) {  
    //     return fetchCnt({category: req.header('data-categ'), mode: 'publish'});
    // }
});

module.exports = router
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
const { user, advert , connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getoneadvert') {
        advert.findOne({_id: req.body.cntID, authorID: req.user}).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getByAuthor') {
        Promise.all([req.body.start === 0 ?  user.findById(req.body.searchCnt) : Promise.resolve()]).then(doc => {
            advert.find({ _isCompleted: true, block: {$nin: [req.user]}, authorID: req.body.searchCnt})
                .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
                let updateResult = [];
                if (result) {
                    for (let cnt of result) {
                        let updateCnt = JSON.parse(JSON.stringify(cnt));
                        delete updateCnt.block;
                        updateResult.push({...updateCnt,
                        userImage: doc[0] ? doc[0].image : cnt.userImage, username: doc[0] ? doc[0].username : cnt.username,
                       chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)}})
                    }
                }
                res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header && req.header('data-categ') === 'searchAdvert') {
        advert.find({_isCompleted: true, block: {$nin: [req.user]}, $text: {$search: req.body.searchCnt} })
            .skip(req.body.start).limit(req.body.limit).sort({_id: -1}).then(result => {
            let updateResult = [];
            if (result) {
                for (let cnt of result) {
                    let updateCnt = JSON.parse(JSON.stringify(cnt));
                    delete updateCnt.block;
                    updateResult.push({...updateCnt,
                    chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)}})
                }
            }
            res.status(200).send({page: updateResult, loadMore: result.length > 0, tabPage: true});
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getOneAndDelete') {
        advert.findOne({_id: req.body.pageID}).then(doc => {
            if (doc && !doc.chat._id && (JSON.parse(JSON.stringify(doc.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([deleteMedia(doc.media), doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (doc && !doc.chat._id && (JSON.parse(JSON.stringify(doc.shareInfo.authorID)) === JSON.parse(JSON.stringify(req.user)))) {
                return sequence([doc.deleteOne()]).then(() => {
                    return res.sendStatus(200);
                })
            }
            if (doc && (JSON.parse(JSON.stringify(doc.authorID)) !== JSON.parse(JSON.stringify(req.user)))) {
                advert.findByIdAndUpdate({_id: req.body.pageID}, {$push: {'block': req.user}}).then(() => {
                    return res.sendStatus(200);
                })
                return;
            }
            return Promise.reject('This advert could not be deleted');
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    // if (req.header !== null && req.header('data-categ') === 'advert') {
    //     return fetchAdvert({mode: 'publish'});
    // }

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
    //     return fetchAdvert({mode: 'publish', shareMe: req.user});
    // }

    // if (req.header !== null && req.header('data-categ') === 'myadvert') {
    //     return fetchAdvert({authorID: req.user});
    // }

    // function fetchAdvert(conditions, meta) {
    //     let condition = { _isCompleted: true, ...conditions}
    //     connectStatus.then(() => {
    //         let isMeta = meta ? meta : {};
    //         let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {created: -1};
    //         let curLimit = parseInt(req.header('limit'));
    //         let skip = parseInt(req.header('skip'));
    //         adverts.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
    //             adverts.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
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
    //                         let desc = JSON.parse(cnt.desc).blocks[0].text;
    //                         cnt.desc = String(desc.substr(0, 180000));
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
    //                         update['comment'] = cnt.comment;
    //                         update['desc'] = cnt.desc;
    //                         update['favorite'] = cnt.favorite;
    //                         update['image'] = cnt.image;
    //                         update['mode'] = cnt.mode;
    //                         update['created'] = cnt.created;
    //                         update['snapshot'] = cnt.snapshot;
    //                         update['title'] = cnt.title;
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

    // if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //         let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
    //         return fetchAdvert({$text: { $search: filter.searchCnt },mode: 'publish', ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
    //      });
    //      return
    // }

    // if (req.header !== null && req.header('data-categ')) {  
    //     return fetchAdvert({category: req.header('data-categ'), mode: 'publish'});
    // }
});

module.exports = router

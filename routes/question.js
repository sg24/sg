let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
const {category, questions, user, authUser, connectStatus} = require('../serverDB/serverDB');

router.get('/', authenticate, (req, res, next) => {
    res.render('question');
})

router.get('/:id', authenticate, (req, res,next) => {
    res.render('question');
})

router.post('/', authenticate, (req, res, next) => {
    if (req.header('data-categ') === 'category') {
        category.findOne({}).then(result => {
            let checkRes =  result ? result.question : []
            res.send(checkRes).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }

    if (req.header !== null && req.header('data-categ') === 'question') {
        return fetchQue({mode: 'publish'});
    }

    if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
        return fetchQue({mode: 'publish', shareMe: req.user});
    }

    if (req.header !== null && req.header('data-categ') === 'myquestion') {
        return fetchQue({authorID: req.user});
    }

    function fetchQue(conditions, meta) {
        let condition = {_isCompleted: true, ...conditions}
        connectStatus.then(() => {
            let isMeta = meta ? meta : {};
            let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {queCreated: -1};
            let curLimit = parseInt(req.header('limit'));
            let skip = parseInt(req.header('skip'));
            questions.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
                questions.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
                    let cntArray = [];
                    let send = 0;
                    if (result.length < 1) {
                        res.send({cnt: cntArray, cntTotal}).status(200)
                    }
                    for (let cnt of result) {
                        user.findById(cnt.authorID).then(userFnd => {
                            if (!userFnd) {
                                authUser.findById(cnt.authorID).then(authFnd => {
                                   if (authFnd) {
                                    fetch(authFnd.username, authFnd.image, cnt, cntArray).then(cnt => {
                                        cntArray = cnt;
                                        ++send;
                                        if (send === result.length) {
                                            res.send({cnt: cntArray, cntTotal}).status(200)
                                        }
                                    })
                                   }
                                })
                            } else {
                                fetch(userFnd.username, userFnd.image, cnt, cntArray).then(cnt => {
                                    cntArray = cnt;
                                    ++send 
                                    if (send === result.length) {
                                        res.send({cnt: cntArray, cntTotal}).status(200)
                                    }
                                })
                            }
                        })   
                    }

                    function fetch(username, image, cnt, cntArray) {
                        return new Promise((resolve, reject) => {
                            let title = cnt.title;
                            cnt.title = String(title.substr(0, 1500000));
                            let isLiked = req.user ? cnt.liked.filter(userID => userID === req.user) : [];
                           let update ={};
                            if (isLiked.length > 0) {
                                update['liked'] = true
                            } else {
                                update['liked'] = false
                            }
                            update['username'] = username;
                            update['userImage'] = image;
                            update['userOpt'] = cnt.authorID === req.user;
                            update['authorID'] = cnt.authorID;
                            update['category'] = cnt.category;
                            update['helpFull'] = cnt.helpFull;
                            update['notHelpFull'] = cnt.notHelpFull;
                            update['comment'] = cnt.comment;
                            update['favorite'] = cnt.favorite;
                            update['image'] = cnt.image;
                            update['mode'] = cnt.mode;
                            update['queCreated'] = cnt.queCreated;
                            update['snapshot'] = cnt.snapshot;
                            update['title'] = cnt.title;
                            update['video'] = cnt.video;
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

    if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
        filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
            let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
            return fetchQue({$text: { $search: filter.searchCnt },mode: 'publish', ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
         }).catch(err => {
            res.status(500).send(err)
        })
         return
    }

    if (req.header !== null && req.header('data-categ')) {  
        return fetchQue({category: req.header('data-categ'), mode: 'publish'});
    }
});

module.exports = router
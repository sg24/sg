let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
const {category, posts, user, authUser, connectStatus} = require('../serverDB/serverDB');


router.get('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'post') {
        return fetchPost({});
    }

    if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('shared')) {
        return fetchPost({shareMe: req.user});
    }

    if (req.header !== null && req.header('data-categ') === 'mypost') {
        return fetchPost({authorID: req.user});
    }

    function fetchPost(conditions, meta) {
        let condition = {mode: 'publish', _isCompleted: true, ...conditions}
        connectStatus.then(() => {
            let isMeta = meta ? meta : {};
            let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {postCreated: -1};
            let curLimit = parseInt(req.header('limit'));
            let skip = parseInt(req.header('skip'));
            posts.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
                posts.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
                    let cntArray= [];
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
                            let desc = JSON.parse(cnt.desc).blocks[0].text;
                            cnt.desc = String(desc.substr(0, 180));
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
                            cntArray.push({...cnt._doc, ...update});
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
    
    if (req.header !== null && req.header('data-categ') === 'postCateg') {
        category.findOne({}).then(result => {
            let checkRes =  result ? result.post : []
            res.send(checkRes).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }

    if (req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('filter')) { 
        filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
            let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
            return fetchPost({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category},{ score: { $meta: "textScore" } })
         });
         return
    }

    if(req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('postSearch')) {
        filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
           let category = filter.category && filter.category.length > 0 ? {category: filter.category} : {};
           posts.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, mode: 'publish', _isCompleted: true}).then(result => {
                let resultCount = new String(result.length);
                res.send(resultCount).status(200);
            }).catch(err => {
                res.status(500).send(err);
            })
        })
        return ;
    }
    
    if (req.header !== null && req.header('data-categ')) {  
        return fetchPost({category: req.header('data-categ')});
    }

    res.render('post')
});

router.delete('/', authenticate, (req, res, next) => {
    if (req.header('data-categ').startsWith('deleteCnt')) {
        let id = req.header('data-categ').split('-')[1];
        posts.findByIdAndRemove(id).then(() =>{
            res.send('deleted').status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }
});


router.patch('/', authenticate ,(req, res, next) => {
    if (req.header('data-categ') === 'changemode') {
        posts.findByIdAndUpdate(req.body.id, {mode: 'draft'}).then(result => {
            res.send('patch').status(200);
        })
        return
    }

    let content = req.body;
    let model = req.body.model === 'post' ? posts :
    req.body.model === 'question' ? questions : poets;
    model.findOne({_id: content.id}).then(result => {
        let favorite = result.favorite;
        let liked = result.liked;
        let isLiked = true;
        for ( let userID  of liked) {
            if (userID === content.userID) {
                isLiked = false;
                liked = result.liked.filter(userID => userID !== content.userID);
                favorite = favorite - 1;
            }
        }

        if (isLiked){
            liked.push(content.userID);
            favorite = favorite + 1;
        }
        
        model.findByIdAndUpdate(content.id, {liked, favorite}).then(result => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err);
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let authenticate = require('../serverDB/middleware/authenticate');
const {category, favorite, posts, questions, poets, postnotifies, quenotifies, pwtnotifies, user, authUser, connectStatus} = require('../serverDB/serverDB');

router.get('/', authenticate, (req, res, next) => {
    if (req.header('data-categ') &&  req.header('data-categ') === 'share') {
        let cntArray = {
            cnt: {},
            cntTotal: 0
        }
        let curLimit = parseInt(req.header('limit'));
        let skip = parseInt(req.header('skip'));
        postnotifies.findOneAndUpdate({userID: req.user}, {notifications: 0}).then(result => {
            let ptModel = result && result.postID ? result.postID : [];
            favorites(posts, ptModel, {postCreated: -1}, curLimit, skip, 'post', cntArray).then(ptCnt => {
                quenotifies.findOneAndUpdate({userID: req.user}, {notifications: 0}).then(queRes => {
                    let queModel = queRes && queRes.queID ? queRes.queID : [];
                    favorites(questions, queModel, {queCreated: -1}, curLimit, skip, 'question', ptCnt).then(queCnt =>{
                        pwtnotifies.findOneAndUpdate({userID: req.user}, {notifications: 0}).then(pwtRes => {
                            let pwtModel = pwtRes && pwtRes.pwtID ? pwtRes.pwtID : [];
                            favorites(poets, pwtModel, {pwtCreated: -1}, curLimit, skip, 'poet', queCnt).then(allCnt =>{
                                res.send(allCnt).status(200)
                            })  
                        })  
                    })
                })
                
            })
        }).catch(err =>{
            res.send(err).status(500);
        })

        function favorites(model, modelID, sort, curLimit, skip, modelType, cntArray) {
            return new Promise((resolve, reject) =>{
                model.find({_id: { $in : modelID }, mode: 'publish', _isCompleted: true}).countDocuments({}).then(total => {
                    model.find({_id: { $in : modelID }, mode: 'publish', _isCompleted: true}).sort(sort).limit(curLimit).skip(skip).then(result => {
                        cntArray.cntTotal = cntArray.cntTotal + total;
                        if (result.length < 1) {
                            cntArray.cnt[modelType] = [];
                            resolve(cntArray);
                            return
                        }
                        let modelCnt = []
                        let send = 0;
                        for (let cnt of result) {
                            user.findById(cnt.authorID).then(userFnd => {
                                if (!userFnd) {
                                    authUser.findById(cnt.authorID).then(authFnd => {
                                    if (authFnd) {
                                        fetch(authFnd.username, authFnd.image, cnt, modelType, modelCnt).then(cnt => {
                                            ++send;
                                            if (send === result.length) {
                                                cntArray.cnt[modelType] = cnt;
                                                resolve(cntArray);
                                            }
                                        })
                                    }
                                    })
                                } else {
                                    fetch(userFnd.username, userFnd.image, cnt, modelType, modelCnt).then(cnt => {
                                        ++send 
                                        if (send === result.length) {
                                            cntArray.cnt[modelType] = cnt;
                                            resolve(cntArray);
                                        }
                                    })
                                }
                            })   
                        }
                        
                        function fetch(username, image, cnt, modelType, cntArray) {
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
                                if (modelType === 'post' || modelType === 'question') {
                                    update['image'] = cnt.image;
                                    update['video'] = cnt.video;
                                    update['snapshot'] = cnt.snapshot;
                                }

                                if (modelType === 'post') {
                                    update['postCreated'] = cnt.postCreated;
                                    update['view'] = cnt.view;
                                    update['desc'] = cnt.desc;
                                }
                                if (modelType === 'question') {
                                    update['helpFull'] = cnt.helpFull;
                                    update['notHelpFull'] = cnt.notHelpFull;
                                    update['queCreated'] = cnt.queCreated;
                                }
                                if (modelType === 'poet') {
                                    update['pwtCreated'] = cnt.pwtCreated;
                                    update['helpFull'] = cnt.helpFull;
                                }
                                update['username'] = username;
                                update['userImage'] = image;
                                update['userOpt'] = cnt.authorID === req.user;
                                update['authorID'] = cnt.authorID;
                                update['category'] = cnt.category;
                                update['comment'] = cnt.comment;
                                update['favorite'] = cnt.favorite;
                                update['mode'] = cnt.mode;
                                update['title'] = cnt.title;
                                update['_id'] = cnt._id;
                                cntArray.push({...update});
                                resolve(cntArray)
                            })
                        }
                    })
                })
            })
        }
        return
   }

    res.render('share');
})
module.exports = router
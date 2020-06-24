const express = require('express');
const router = express.Router();
const {posts, questions, poets, adverts, qchat, user, authUser, comment, connectStatus} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');

router.get('/view/:categ/:id', authenticate, (req, res, next) => {
    if (!req.params.id || !req.params.categ) {
        res.redirect('/index/post')
        return
    }
    if ((req.useragent && req.useragent.isBot) ||
    req.useragent.source === 'facebookexternalhit/1.1' ||
    req.useragent.source === 'Facebot' ||
    req.useragent.source === 'Twitterbot'){
        res.redirect(301, `/robotonly/rbview/${req.params.categ}/${req.params.id}`)
    } else {
        res.render('view');
    }
})


router.post('/view/:categ/:id', authenticate, (req, res, next) => {
     if (!req.params.id || !req.params.categ) {
        res.redirect('/index/post')
        return
    }
    connectStatus.then((result) => {
        if (req.header && req.header('data-categ') === 'viewcnt') {
            let categ = req.params.categ;
            let model =  categ === 'post' ? posts : categ === 'question' ? questions :
            categ === 'advert' ? adverts : categ === 'qchat' ? qchat : poets;
            if (categ === 'post' || categ === 'advert') {
                model.findByIdAndUpdate(req.params.id,{$inc: {'view': 1}}).then(() =>{
                    return fetchCnt(model, categ, updateCnt, req.params.id);
                })
            } else {
                return fetchCnt(model, categ, updateCnt, req.params.id)
            }
            return;
        }

        if (req.header && req.header('data-categ') === 'createComment') {
            let id = req.body.id;
            let cnts = req.body.cnt;
            let categ = req.body.cntGrp;
            let model =  categ === 'post' ? posts : categ === 'question' ? questions :
            categ === 'advert' ? adverts : categ === 'qchat' ? qchat : poets;
            model.findByIdAndUpdate(id, {$inc: {'comment': 1}}).then(() => {
                let newComment = new comment({
                    authorID: req.user,
                    userType: req.userType,
                    commentID: id,
                    comment: cnts
                });
                newComment.save().then(result => {
                    let model = result.userType === 'authUser' ? authUser : user;
                    model.findById(result.authorID).then(userDet => {
                        let cnt = {
                            authorID: result.authorID,
                            username: userDet.username,
                            status: true,
                            offline: userDet.offline,
                            image: userDet.image,
                            comment: result.comment,
                            commentCreated: result.commentCreated,
                            _id: result._id,
                            like: false,
                            dislike: false,
                            liked: 0,
                            disliked: 0,
                            smile: false,
                            smiled: 0,
                            disabled: true
                        }
                        res.status(200).send(cnt)
                    })
                }).catch(err => {
                    res.status(500).send(err)
                })
            })
        }

        if (req.header && req.header('data-categ') === 'createReplyComment') {
            let id = req.body.id;
            let commentID = req.body.commentID;
            let cnts = req.body.cnt;
            let categ = req.body.cntGrp;
            let cnt = {
                authorID: req.user,
                userType: req.userType,
                comment: cnts,
                commentID
            }

            comment.findOneAndUpdate({_id: id}, {$push: {reply: cnt}}).then(result => {
                let model =  categ === 'post' ? posts : categ === 'question' ? questions : 
                categ === 'advert' ? adverts : categ === 'qchat' ? qchat : poets;
                model.findByIdAndUpdate(result.commentID, {$inc: {'comment': 1}}).then(() => {
                    comment.findById(id).then(commentRes => {
                        let replyFilter = commentRes.reply.filter(reply => reply.commentID === commentID);
                        let model = replyFilter[0].userType === 'authUser' ? authUser : user;
                        model.findById(replyFilter[0].authorID).then(result => {
                            let cnt = {
                                authorID: replyFilter[0].authorID,
                                username: result.username,
                                status: true,
                                offline: result.offline,
                                image: result.image,
                                comment: replyFilter[0].comment,
                                commentCreated: replyFilter[0].commentCreated,
                                _id: replyFilter[0]._id,
                                like: false,
                                dislike: false,
                                liked: 0,
                                disliked: 0,
                                smile: false,
                                smiled: 0,
                                disabled: true
                            }
                            res.status(200).send({cnts: cnt, id})
                        })
                    })
                })
            }).catch(err => {
                res.status(500).send(err)
             })  
        }

        if (req.header && req.header('data-categ') === 'related') {
            let categ = req.params.categ;
            let id = req.params.id;
            let model =  categ === 'post' ? posts : categ === 'question' ? questions : 
            categ === 'advert' ? adverts : categ === 'qchat' ? qchat : poets;
            model.findById(id).then(result => {
                if(result && result.title) {
                    let title = result.title;
                    checkText(title, posts, [], 'post').then(ptArray => {
                        checkText(title, questions, ptArray, 'question').then(queArray => {
                            checkText(title, poets, queArray, 'poet').then(qchatArray => {
                                checkText(title, qchat, qchatArray , 'qchat').then(filterArray => {
                                    res.send(filterArray).status(200);
                                })
                            });
                        });
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                    return ;
                }
            
                function checkText(searchCnt, collection, filterRes, categ) {
                    return new Promise((resolve, reject) => {
                        collection.find({$text: { $search: searchCnt },mode: 'publish',_isCompleted: true}).then(results => {
                            for (let result of results) {
                                let cnt = {
                                    category: 'Question',
                                    helpFull: result.helpFull,
                                    notHelpFull: result.notHelpFull,
                                    favorite: result.favorite,
                                }
                                if (categ === 'post') {
                                    cnt = {
                                        category: 'Post',
                                        view:  result.view,
                                        comment: result.comment,
                                        favorite: result.favorite,
                                    }
                                }

                                if (categ === 'qchat') {
                                    let model = result.access === 'friends' ? 
                                    result.userType === 'authUser' ? authUser : user : null;
                                    let fndAccess = false;
                                    let private =  false;
                                    if (model) {
                                        model.findById(result.authorID).then(fnd => {
                                            let friends = [...fnd.teacher, ...fnd.student, result.authorID]
                                            let checkFriend = friends.filter(id => id === req.user)[0];
                                            fndAccess = checkFriend !== null || checkFriend !== '';
                                        })
                                    }

                                    if (result.access && result.access.length) {
                                        let checkPrivate = [result.access, result.authorID].filter(id => id === req.user)[0];
                                        private =  checkPrivate !== null || checkPrivate !== ''
                                    }  
                                    
                                    cnt = {
                                        category: 'CBT',
                                        write : result.write,
                                        qchatTotal: result.qchatTotal,
                                        comment: result.comment,
                                        access: result.access === 'public' ? true : result.access === 'friends' ? fndAccess : private
                                    }
                                }

                                if (categ === 'poet') {
                                    cnt = {
                                        category: 'Poet/Writer',
                                        helpFull: result.helpFull,
                                        comment: result.comment,
                                        favorite: result.favorite,
                                    }
                                }
            
                                let isLiked = req.user ? result.liked.filter(userID => userID === req.user) : [];
                                if (isLiked.length > 0) {
                                    cnt['liked'] = true
                                } else {
                                    cnt['liked'] = false
                                }
            
                                let updateResult = {
                                    id: result._id,
                                    cntGrp: categ,
                                    title: String(result.title).substr(0, 100),
                                    ...cnt
                                }
                                filterRes.push(updateResult)
                            }
                            resolve(filterRes)
                        })
                    }).catch(err => {
                        reject(err)
                    })
                };
            })
            return;
        }

        function fetchCnt(model, categ, updateCnt, id) {
            model.findById(id).then(result => {
                if (result) {
                    user.findById(result.authorID).then(userCnt => {
                        if (!userCnt) {
                            authUser.findById(result.authorID).then(authCnt => {
                                if (authCnt) {
                                    comment.find({commentID: id}).sort({commentCreated: -1}).then(comments => {
                                       updateComment(comments).then(commentArray => {
                                            return updateCnt(result, authCnt, commentArray, categ).then(cntRes => {
                                                res.status(200).send(cntRes);
                                            })
                                       })
                                    })
                                }
                            })
                        } else {
                            comment.find({commentID: id}).sort({commentCreated: -1}).then(comments => {
                                updateComment(comments).then(commentArray => {
                                     return updateCnt(result, userCnt, commentArray, categ).then(cntRes => {
                                         res.status(200).send(cntRes);
                                     })
                                })
                             })
                        }
                    })
                } else {
                    res.redirect('/index/post');
                }
            }).catch(err =>{
                // res.redirect('/index/post');
                res.status(500).send(err)
            })
        }

        function updateComment(comments) {
            return new Promise((resolve, reject) => {
                let commentArray = [];
                let updated = 0;
                if (comments.length < 1) {
                    return resolve(commentArray)
                }

                for (let comment of comments) {
                    let updatedReply = 0;
                    let replyUpdate = [];
                    let model = comment.userType === 'authUser' ? authUser : user;
                    for (let reply of comment.reply) {
                        let replyModel = reply.userType === 'authUser' ? authUser : user;
                        updateAllcomment(replyModel, reply).then(replyRes => {
                            ++updatedReply;
                            replyUpdate.push(replyRes)
                            if (comment.reply.length === updatedReply) {
                                updateAllcomment(model, comment).then(result => {
                                    commentArray.push({...result, reply: replyUpdate});
                                    ++updated
                                    if (updated === comments.length) {
                                        resolve(commentArray)
                                    }
                                
                                })
                            }
                        })
                    }

                    if (comment.reply.length < 1) {
                        updateAllcomment(model, comment).then(result => {
                            ++updated;
                            commentArray.push(result);
                            if (updated === comments.length) {
                                resolve(commentArray)
                            }
                        })
                    }
                }
                function updateAllcomment(model, comment) {
                    return new Promise((resolve, reject) => {
                        model.findById(comment.authorID).then(result => {
                            let checkLike = comment.like.filter(userID => userID === req.user);
                            let checkDislike = comment.dislike.filter(userID => userID === req.user);
                            let checkSmile = comment.smile.filter(userID => userID === req.user);
                            let cnt = {
                                authorID: comment.authorID,
                                username: result.username,
                                status: result.status,
                                offline: result.offline,
                                image: result.image,
                                comment: comment.comment,
                                commentCreated: comment.commentCreated,
                                like: checkLike.length > 0,
                                dislike: checkDislike.length > 0,
                                smile: checkSmile.length > 0,
                                liked: comment.liked,
                                disliked:comment.disliked,
                                smiled:comment.smiled,
                                disabled: comment.authorID === req.user,
                                _id: comment._id
                            }
                            resolve(cnt)
                        })
                    })
                }
            })
        }

        function updateCnt(cnt, user, comment, modelType) {
            return new Promise((resolve, reject) => {
                let isLiked = req.user ? cnt.liked.filter(userID => userID === req.user) : [];
                let update ={};
                    if (isLiked.length > 0) {
                        update['liked'] = true
                    } else {
                        update['liked'] = false
                    }

                    if (modelType === 'post') {
                        update['postCreated'] = cnt.postCreated;
                        update['view'] = cnt.view;
                    }

                    if (modelType === 'advert') {
                        update['created'] = cnt.created;
                        update['view'] = cnt.view;
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

                    if (modelType === 'qchat') {
                        update['write'] = cnt.write;
                        update['hour'] = cnt.hour;
                        update['minute'] = cnt.minute;
                        update['second'] = cnt.second;
                        update['qchatTotal'] = cnt.qchatTotal;
                        update['contentID'] = cnt.contentID;
                        let model = cnt.access === 'friends' ? 
                        cnt.userType === 'authUser' ? authUser : user : null;
                        let fndAccess = false;
                        let private =  false;
                        if (model) {
                            model.findById(cnt.authorID).then(fnd => {
                                let friends = [...fnd.teacher, ...fnd.student, cnt.authorID]
                                let checkFriend = friends.filter(id => id === req.user)[0];
                                fndAccess = checkFriend !== null || checkFriend !== '';
                            })
                        }

                        if (cnt.access && cnt.access.length) {
                            let checkPrivate = [cnt.access, cnt.authorID].filter(id => id === req.user)[0];
                            private =  checkPrivate !== null || checkPrivate !== ''
                        }  
                        update['access'] = cnt.access === 'public' ? true : cnt.access === 'friends' ? fndAccess : private;
                    }
                   
                    update['username'] = user.username;
                    update['userImage'] = user.image;
                    update['userOpt'] = cnt.authorID === req.user;
                    update['authorID'] = cnt.authorID;
                    update['category'] = cnt.category;
                    update['comment'] = cnt.comment;
                    update['commentcnt'] = comment;
                    update['favorite'] = cnt.favorite;
                    update['offline'] = user.offline;
                    update['status'] = user.status;
                    update['edit']= cnt.edit
                    update['image'] = cnt.image;
                    update['video'] = cnt.video;
                    update['snapshot'] = cnt.snapshot;
                    update['desc'] = cnt.desc;
                    update['mode'] = cnt.mode;
                    update['title'] = cnt.title;
                    update['_id'] = cnt._id;
                    resolve(update)
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send(err);
    })
})


router.patch('/view', authenticate, (req, res, next) => {
    if (req.header && req.header('data-categ') === 'viewcnt') {
        let id = req.body.id;
        let categ = req.body.cntGrp;
        let cnt = req.body.cnt;
        let model =  categ === 'post' ? posts : categ === 'question' ? questions : 
        categ === 'advert' ? adverts : categ === 'qchat' ? qchat : poets;;
        model.findByIdAndUpdate(id, {$inc: {'comment': 1}}).then(() => {
            let newComment = new comment({
                authorID: req.user,
                userType: req.userType,
                commentID: req.body.id,
                comment: req.body.cnt
            });
            newComment.save().then(result => {
                let model = result.userType === 'authUser' ? authUser : user;
                model.findById(result.authorID).then(userDet => {
                    let cnt = {
                        authorID: result.authorID,
                        username: userDet.username,
                        status: true,
                        offline: userDet.offline,
                        image: userDet.image,
                        comment: result.comment,
                        commentCreated: result.commentCreated,
                        _id: result._id,
                        like: false,
                        dislike: false,
                        liked: 0,
                        disliked: 0,
                        smile: false,
                        smiled: 0,
                        disabled: true
                    }
                    res.status(200).send(cnt)
                })
            }).catch(err => {
                res.status(200).send(err);
            })
        })
    }

    if (req.header && req.header('data-categ') === 'reply') {
        let id = req.body.id;
        let cnt = {
            authorID: req.user,
            userType: req.userType,
            comment: req.body.cnt,
            commentID: req.body.commentID
        }
        comment.findOneAndUpdate({_id: id}, {$push: {reply: cnt}}).then(result => {
            let categ = req.body.cntGrp;
            let model =  categ === 'post' ? posts : categ === 'question' ? questions : 
            categ === 'advert' ? adverts : categ === 'qchat' ? qchat : poets;
            model.findByIdAndUpdate(result.commentID, {$inc: {'comment': 1}}).then(() => {
                comment.findById(id).then(commentRes => {
                    let replyFilter = commentRes.reply.filter(reply => reply.commentID === req.body.commentID);
                    let model = replyFilter[0].userType === 'authUser' ? authUser : user;
                    model.findById(replyFilter[0].authorID).then(result => {
                        let cnt = {
                            authorID: replyFilter[0].authorID,
                            username: result.username,
                            status: true,
                            offline: result.offline,
                            image: result.image,
                            comment: replyFilter[0].comment,
                            commentCreated: replyFilter[0].commentCreated,
                            _id: replyFilter[0]._id,
                            like: false,
                            dislike: false,
                            liked: 0,
                            disliked: 0,
                            smile: false,
                            smiled: 0,
                            disabled: true
                        }
                        res.status(200).send(cnt)
                    })
                })
            })
        }).catch(err => {
            res.status(200).send(err);
        })
        return
    }

    if (req.header && req.header('data-categ') === 'answercorrect') {
        let id = req.body.id;
        comment.findOneAndUpdate({_id: id, like: {$ne: req.user}, authorID: {$ne: req.user}}, {$inc: {'liked': 1}, $push: {like: req.user} }).then(result => {
            if (result) {
                comment.findOneAndUpdate({_id: id, dislike: {$in: req.user}}, {$inc: {'disliked': -1}, $pull: {dislike: req.user}}).then(commentRes => {
                    let checkDislike = commentRes ? {'notHelpFull': -1} : {}
                    questions.findByIdAndUpdate(result.commentID, {$inc: {'helpFull': 1, ...checkDislike}}).then(() => {
                        res.sendStatus(200)
                    })
                })
            } else {
                res.sendStatus(200)
            }
        })
        return 
    }

    if (req.header && req.header('data-categ') === 'answercorretreply') {
        let id = req.body.id;
        let replyID = req.body.replyID;
        let indexPos;
        comment.findById(id).then(commentRes => {
            let isDisliked = {};
            let reply = commentRes.reply.filter((replyRes, index) => {
                if (replyRes._id.toHexString() === replyID) {
                    indexPos = index;
                    return true
                }
                return false
            });
            let likeFilter = reply[0].like.filter(userID => userID === req.user);
            if (likeFilter.length < 1 && reply[0].authorID !== req.user) {
                reply[0].like.push(req.user);
                reply[0].liked = reply[0].liked + 1;
                let dislike = reply[0].dislike.filter(userID => userID === req.user);
                if (dislike.length > 0) {
                    reply[0].dislike = reply[0].dislike.filter(userID => userID !== req.user);
                    reply[0].disliked = reply[0].disliked - 1;
                    isDisliked = {'notHelpFull': -1}
                }
                commentRes.reply[indexPos] = reply[0];
                comment.findByIdAndUpdate({_id: id,}, {reply: commentRes.reply}).then(result => {
                    questions.findByIdAndUpdate(result.commentID, {$inc: {'helpFull': 1, ...isDisliked}}).then(() => {
                        res.sendStatus(200)
                    })
                })
            } else {
                res.sendStatus(200)
            }
        })
        return 
    }

    if (req.header && req.header('data-categ') === 'answerwrong') {
        let id = req.body.id;
        comment.findOneAndUpdate({_id: id, dislike: {$ne: req.user}, authorID: {$ne: req.user}}, {$inc: {'disliked': 1}, $push: {dislike: req.user} }).then(result => {
            if (result) {
                comment.findOneAndUpdate({_id: id, like: {$in: req.user}}, {$inc: {'liked': -1}, $pull: {like: req.user}}).then(commentRes => {
                    let checkLike = commentRes ? {'helpFull': -1} : {}
                    questions.findByIdAndUpdate(result.commentID, {$inc: {'notHelpFull': 1, ...checkLike}}).then(() => {
                        res.sendStatus(200)
                    })
                })
            } else {
                res.sendStatus(200)
            }
        })
        return 
    }
   
    if (req.header && req.header('data-categ') === 'answerwrongreply') {
        let id = req.body.id;
        let replyID = req.body.replyID;
        let indexPos;
        comment.findById(id).then(commentRes => {
            let isDisliked = {};
            let reply = commentRes.reply.filter((replyRes, index) => {
                if (replyRes._id.toHexString() === replyID) {
                    indexPos = index;
                    return true
                }
                return false
            });
            let dislikeFilter = reply[0].dislike.filter(userID => userID === req.user);
            if (dislikeFilter.length < 1 && reply[0].authorID !== req.user) {
                reply[0].dislike.push(req.user);
                reply[0].disliked = reply[0].disliked + 1;
                let like = reply[0].like.filter(userID => userID === req.user);
                if (like.length > 0) {
                    reply[0].like = reply[0].like.filter(userID => userID !== req.user);
                    reply[0].liked = reply[0].liked - 1;
                    isLiked = {'helpFull': -1}
                }
                commentRes.reply[indexPos] = reply[0];
                comment.findByIdAndUpdate({_id: id,}, {reply: commentRes.reply}).then(result => {
                    questions.findByIdAndUpdate(result.commentID, {$inc: {'notHelpFull': 1, ...isLiked}}).then(() => {
                        res.sendStatus(200)
                    })
                })
            } else {
                res.sendStatus(200)
            }
        })
        return 
    }

    if (req.header && req.header('data-categ') === 'smile') {
        let id = req.body.id;
        comment.findOneAndUpdate({_id: id, smile: {$ne: req.user}, authorID: {$ne: req.user}}, {$inc: {'smiled': 1}, $push: {smile: req.user} }).then(result => {
            if (result) {
                poets.findByIdAndUpdate(result.commentID, {$inc: {'helpFull': 1}}).then(() => {
                    res.sendStatus(200)
                })
            } else {
                comment.findOneAndUpdate({_id: id, smile: {$in: req.user}, authorID: {$ne: req.user}}, {$inc: {'smiled': -1}, $pull: {smile: req.user}}).then(commentRes => {
                   if (commentRes) {
                        poets.findByIdAndUpdate(commentRes.commentID, {$inc: {'helpFull': -1}}).then(() => {
                            res.sendStatus(200)
                        })
                    return 
                   }
                   res.sendStatus(200)
                })
            }
        })
        return 
    }

    if (req.header && req.header('data-categ') === 'smilereply') {
        let id = req.body.id;
        let replyID = req.body.replyID;
        let indexPos;
        comment.findById(id).then(commentRes => {
            let isDisliked = {};
            let reply = commentRes.reply.filter((replyRes, index) => {
                if (replyRes._id.toHexString() === replyID) {
                    indexPos = index;
                    return true
                }
                return false
            });
            let smileFilter = reply[0].smile.filter(userID => userID === req.user);
            if (reply[0].authorID !== req.user) {
                if (smileFilter.length < 1) {
                    reply[0].smile.push(req.user);
                    reply[0].smiled = reply[0].smiled + 1;
                    commentRes.reply[indexPos] = reply[0];
                    comment.findByIdAndUpdate({_id: id,}, {reply: commentRes.reply}).then(result => {
                        poets.findByIdAndUpdate(result.commentID, {$inc: {'helpFull': 1}}).then(() => {
                            res.sendStatus(200)
                        })
                    })
                } else {
                    reply[0].smile = reply[0].smile.filter(userID => userID !== req.user);
                    reply[0].smiled = reply[0].smiled - 1;
                    commentRes.reply[indexPos] = reply[0];
                    comment.findByIdAndUpdate({_id: id,}, {reply: commentRes.reply}).then(result => {
                        poets.findByIdAndUpdate(result.commentID, {$inc: {'helpFull': -1}}).then(() => {
                            res.sendStatus(200)
                        })
                    })
                }
            } else {
                res.sendStatus(200)
            }
        })
        return
    }
})

module.exports = router

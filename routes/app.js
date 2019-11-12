let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let authenticate = require('../serverDB/middleware/authenticate');
const {category, posts, questions, poets, postnotifies, quenotifies, pwtnotifies, connectStatus} = require('../serverDB/serverDB');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/view', (req, res, next) => {
    res.render('view');
});

router.post('/header', authenticate, (req, res, next) => {
    if(req.header('data-categ') === 'headerfilter') {
        checkText(req.body.filterCnt, posts, [], 'post').then(ptArray => {
            checkText(req.body.filterCnt, questions, ptArray, 'question').then(queArray => {
                checkText(req.body.filterCnt, poets, queArray, 'poet').then(filterArray => {
                    res.send(filterArray).status(200);
                });
            });
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    function checkText(searchCnt, collection, filterRes, grp) {
        return new Promise((resolve, reject) => {
            collection.find({$text: { $search: searchCnt },mode: 'publish',_isCompleted: true}).then(result => {
                for (let filter of result) {
                    filterRes.push({id: filter._id, grp, title: filter.title})
                }
                resolve(filterRes)
            }).catch(err => {
                reject(err)
            })
        });
    }

    if(req.header('data-categ') === 'notification') {
        checkActive(req.body.userID, postnotifies, 0).then(ptActive => {
            checkActive(req.body.userID, quenotifies, ptActive).then(queActive => {
                checkActive(req.body.userID, pwtnotifies, queActive).then(active =>{
                    res.send(new String(active)).status(200);
                })
            })
        }).catch(err =>{
            res.status(500).send(err)
        })
        return ;
    }

    function checkActive(userID, model, active) {
        return new Promise((resolve, reject) =>{
            model.findOne({userID}).then(result => {
                let checkRes = result ? result.notifications : 0;
                resolve(checkRes + active)
            }).catch(err => {
                reject(err)
            })
        })
    }

    if (req.header('data-categ') === 'category') {
        category.findOne({}).then(result => {
            let categ = req.body.categ;
            res.send(result[categ]).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }

    if(req.header('data-categ') === 'share') {
        let model = req.body.model === 'post' ? postnotifies :
        req.body.model === 'question' ? quenotifies : pwtnotifies;
        model.findOne({userID: req.body.userID}).then(active => {
            res.send(new String(active.notifications)).status(200);
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    if (req.header('data-categ') === 'trend') {
        trends(posts, 'post', []).then(ptArray => {
            trends(questions, 'question', ptArray).then(queArray => {
                trends(poets, 'poet', queArray).then(trend =>{
                    res.send(trend).status(200)
                });
            });
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    function trends(model, categ, trend) {
        return new Promise((resolve, reject) => {
            let sort = categ === 'post' ? {comment: -1} : 
            categ == 'question' ? {view: -1}: {comment: -1};
            model.find({mode: 'publish', _isCompleted: true}).sort(sort).limit(3).then(results => {
                for(let result of results) {
                    let cnt = {
                        category: 'Question',
                        helpFull: result.view,
                        notHelpFull: result.comment,
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
                    
                    if (categ === 'poet') {
                        cnt = {
                            category: 'Poet/Writer',
                            helpFull: 11100000,
                            comment: result.comment,
                            favorite: result.favorite,
                        }
                    }

                    let updateResult = {
                        id: result._id,
                        cntGrp: categ,
                        title: String(result.title).substr(0, 100),
                        ...cnt,
                        liked: result.liked
                    }
                    trend.push(updateResult);
                }
                resolve(trend)
            }).catch(err => {
                reject(err)
            })
        })
    }
});


router.patch('/header', authenticate, (req, res, next) => {
    if(req.header('data-categ') === 'share') {
        let model = req.body.model === 'post' ? postnotifies :
         req.body.model === 'question' ? quenotifies : pwtnotifies;
        model.findOneAndUpdate({userID: req.body.userID}, {notifications: 0}).then(result => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }
    
    if (req.header('data-categ') === 'shareuser') {
        let notification = require('./utility/notifications');
        let modelNotifies = req.body.model === 'post' ? postnotifies :
        req.body.model === 'question' ? quenotifies : pwtnotifies;
        let model = req.body.model === 'post' ? posts :
        req.body.model === 'question' ? questions : poets;
        let shareMe = JSON.parse(req.body.users);
        notification(shareMe, modelNotifies).then(() =>{
            model.findByIdAndUpdate(req.body.id, {$addToSet: { shareMe: { $each: shareMe } }}).then((result) => {
                res.sendStatus(200);
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }
});

router.get('/post', authenticate, (req, res, next) => {
    if (req.header('data-categ') === 'post') {
        return fetchPost({});
    }

    if (req.header('data-categ').startsWith('shared')) {
        return fetchPost({shareMe: req.header('data-categ').split('-')[1]});
    }

    function fetchPost(conditions, meta) {
        let condition = {mode: 'publish', _isCompleted: true, ...conditions}
        connectStatus.then(() => {
            let isMeta = meta ? meta : {};
            let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {postCreated: -1};
            let curLimit = parseInt(req.header('limit'));
            let skip = parseInt(req.header('skip'));
            posts.find(condition, isMeta).countDocuments({}).then((ptTotal) => {
                posts.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
                    let ptArray= [];
                    for (let pt of result) {
                        let desc = JSON.parse(pt.desc).blocks[0].text;
                        pt.desc = desc;
                        ptArray.push(pt);
                    }
                    res.send({pt: ptArray, ptTotal}).status(200)
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
    
    if (req.header('data-categ') === 'postCateg') {
        category.findOne({}).then(result => {
            let checkRes =  result ? result.post : []
            res.send(checkRes).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }

    if (req.header('data-categ').startsWith('filter')) { 
        let filter =  filterPost(JSON.parse(req.header('data-categ').split('==')[1]));
        return fetchPost({$text: { $search: filter.searchCnt }, ...filter.comment, ...filter.view, ...filter.favorite,  ...filter.category},{ score: { $meta: "textScore" } })
    }

    if(req.header('data-categ').startsWith('postSearch')) {
        let filter = filterPost(JSON.parse(req.header('data-categ').split('==')[1]));
        posts.find({$text: { $search: filter.searchCnt }, ...filter.comment, ...filter.view, ...filter.favorite,  ...filter.category, mode: 'publish', _isCompleted: true}).then(result => {
            let resultCount = new String(result.length);
            res.send(resultCount).status(200);
        }).catch(err => {
            res.status(500).send(err);
        })
        return ;
    }

    function filterPost(filter) {
        let comment = {};
        let favorite = {};
        let view = {};
        for (let filterOpt of filter.filterSelect) {
            let filterRanges = String(filterOpt.rangeValue).split('-');
            if (filterOpt.filterGrp === 'comment') {
                comment = filterRanges.length === 1 ? {comment: {[filterOpt.rangeType] : filterOpt.rangeValue}} :
                {comment: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            } else if (filterOpt.filterGrp === 'view') {
                view = filterRanges.length === 1 ? {view: {[filterOpt.rangeType] : filterOpt.rangeValue}} : 
                {view: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            } else {
                favorite = filterRanges.length === 1 ?{favorite: {[filterOpt.rangeType] : filterOpt.rangeValue}} :
                {favorite: {[filterOpt.rangeType] : filterRanges[0], '$lt' : filterRanges[1]}}
            }
        }
        let filterCateg = filter.category.length > 0 ? {category: { $all: filter.category }} : {};
        return {searchCnt: filter.searchCnt,comment, view, favorite, category: filterCateg}
    }
    
    if (req.header('data-categ')) {     
        return fetchPost({category: req.header('data-categ')});
    }

    res.render('post')
});

router.delete('/post', authenticate, (req, res, next) => {
    if (req.header('data-categ').startsWith('deletePt')) {
        let id = req.header('data-categ').split('-')[1];
        posts.findByIdAndRemove(id).then(() =>{
            res.send('deleted').status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }
});

router.patch('/post', authenticate ,(req, res, next) => {
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

router.get('/media', authenticate, (req, res, next) => {
    connectStatus.then(() => {
        let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'media'
        });
        
        if (req.header('data-categ') === 'media') {
            let mediaID = req.header('mediaID');
            let media = bucket.openDownloadStream(mongoose.mongo.ObjectId(mediaID));
            let base64data = '';
            
            media.on('data', function(media) {
                base64data += Buffer.from(media, 'binary').toString('base64');
            });
            
            media.on('end', function() {
                let mediaDataUrl = 'data:' + 'video/mp4' + ';base64,' +  base64data;
                return res.send(mediaDataUrl).status(200)
            });

            media.on('error', function(err) {
                return res.status(500).send(err)
            });
        }
        return
    }).catch(err => {
        res.sendStatus(500);
    })
})

router.get('/poet', (req, res, next) => {
    if (req.header('data-categ') === 'category') {
        category.findOne({}).then(result => {
            let checkRes =  result ? result.poet : []
            res.send(checkRes).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }
    res.render('poetwriter');
});

router.get('/group', (req, res, next) => {
    res.render('group');
});


router.get('/question', (req, res, next) => {
    if (req.header('data-categ') === 'category') {
        category.findOne({}).then(result => {
            let checkRes =  result ? result.question : []
            res.send(checkRes).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    }
    res.render('question');
});

router.get('/onlineexam', (req, res, next) => {
    res.render('onlineexam');
});

router.get('/chat', (req, res, next) => {
    res.render('groupchat');
});

router.get('/community', (req, res, next) => {
    res.render('community');
});

router.get('/conversations', (req, res, next) => {
    res.render('conv');
});

router.get('/add/question', (req, res, next) => {
    res.render('queform');
});

router.get('/add/post', authenticate, (req, res, next) => {
    res.render('postform');
});

router.get('/add/group', (req, res, next) => {
    res.render('groupform'); 
});

router.get('/add/onlineexam', (req, res, next) => {
    res.render('onlineexamform'); 
});

router.get('/add/poet', (req, res, next) => {
    res.render('poetwriterform'); 
});

router.get('/examtab', (req, res, next) => {
    res.render('examtab');
});

router.get('/users', (req, res, next) => {
    res.render('users');
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});

router.get('/favorite', (req, res, next) => {
    res.render('favorite');
});

router.get('/acc/shared', (req, res, next) => {
    res.render('accshared'); 
});

router.get('/acc/user', (req, res, next) => {
    res.render('accuser'); 
});

router.get('/acc/published', (req, res, next) => {
    res.render('accpub'); 
});

router.get('/acc/draft', (req, res, next) => {
    res.render('accdft'); 
});

router.get('/acc/profile', (req, res, next) => {
    res.render('accprf'); 
});

router.get('/acc/help', (req, res, next) => {
    res.render('acchelp'); 
});

router.get('/acc/set', (req, res, next) => {
    res.render('accset'); 
});

router.get('/login', (req, res, next) => {
    res.render('loginform'); 
});

router.get('/signup', (req, res, next) => {
    res.render('signupform'); 
});

router.get('/signup/profile', (req, res, next) => {
    res.render('signprfform'); 
});

router.get('/forget/password', (req, res, next) => {
    res.render('forgetpwd'); 
});

router.get('/forget/reset', (req, res, next) => {
    res.render('forgetpwd'); 
});

module.exports = router;

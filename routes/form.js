const express = require('express');
const path = require('path');
const fs = require('fs'); 
const {post, page, question, group, writeup, feed, advert, qchat, qcontent, connectStatus, user} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let submit = require('./utility/submit');
let edit = require('./utility/edit');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
let deleteMedia = require('./utility/deletemedia');
const router = express.Router();
let formidable = require('formidable');

fs.mkdir('./tmp', err => { 
    if (err && err.code != 'EEXIST') throw err
})

router.post('/add/post', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'post', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID
                }
                submit(post, cnt, tempFileID, 'post').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/post', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            post.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'post', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                uploadedMedia.push(...media);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    uploadedMedia.push(...tempFileID[1]);
                }
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage, edited: Date.now(),
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media: uploadedMedia, tempFileID: tempFileID[2]
                }
                edit(post, cnt, tempFileID[2], fields.cntID, 'post').then(id => {
                    return res.status(201).send(id);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/question', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'question', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID
                }
                submit(question, cnt, tempFileID, 'question').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/question', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            question.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'question', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                uploadedMedia.push(...media);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    uploadedMedia.push(...tempFileID[1]);
                }
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage, edited: Date.now(),
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media: uploadedMedia, tempFileID: tempFileID[2]
                }
                edit(question, cnt, tempFileID[2], fields.cntID, 'question').then(id => {
                    return res.status(201).send(id);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/writeup', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'writeup', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media, tempFileID
                }
                submit(writeup, cnt, tempFileID, 'writeup').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/writeup', authenticate,(req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            writeup.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'writeup', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                uploadedMedia.push(...media);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    uploadedMedia.push(...tempFileID[1]);
                }
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,edited: Date.now(),
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media: uploadedMedia, tempFileID: tempFileID[2]
                }
                edit(writeup, cnt, tempFileID[2], fields.cntID, 'writeup').then(id => {
                    return res.status(201).send(id);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/chatRoom', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        let askQuestion = JSON.parse(fields.cbt);
        savetemp(mediaList, askQuestion ? 'qcontent' : 'group', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let groupMedia = []
                for (let cnt of media){
                    if (cnt.filename && (cnt.filename.split('--')[0] === fields.id)) {
                        groupMedia.push(cnt);
                    }
                }
                let questionMedia = [];
                let updateQuestion = [];
                for (let question of JSON.parse(fields.question)) {
                    questionMedia = []
                    for (let cnt of media){
                        if (cnt.filename && (cnt.filename.split('--')[0] === question.id)) {
                            questionMedia.push(cnt);
                        }
                    }
                    delete question.id;
                    question.media = questionMedia;
                    updateQuestion.push(question);
                }
                Promise.all([askQuestion ? 
                    submit(qcontent, {question: updateQuestion, totalOption: fields.totalOption, tempFileID}, tempFileID, null) : 
                        Promise.resolve(null)]).then(id => {
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                        autoJoin: JSON.parse(fields.autoJoin), enableCbt: JSON.parse(fields.cbt),
                        enableRule: JSON.parse(fields.rule), roomType: fields.roomType,passMark: fields.passMark,
                        hour: fields.hour, minute: fields.minute, second: fields.second, 
                        duration: fields.duration, qchatTotal: fields.questionTotal, media: groupMedia, 
                        question: id[0], tempFileID
                    }
                    submit(group, cnt, tempFileID, 'createGroup').then(id => {
                        return res.status(201).send(id);
                    })
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/chatRoom', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        let askQuestion = JSON.parse(fields.cbt);
        Promise.all([
            group.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve(result.question):Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList,  askQuestion ? 'qcontent' : 'group', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                let groupMedia = []
                for (let cnt of media){
                    if (cnt.filename && (cnt.filename.split('--')[0] === fields.id)) {
                        groupMedia.push(cnt);
                    }
                }
                groupMedia.unshift(...uploadedMedia);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    groupMedia.push(...tempFileID[1]);
                }
                let questionMedia = [];
                let updateQuestion = [];
                for (let question of JSON.parse(fields.question)) {
                    questionMedia = []
                    for (let cnt of media){
                        if (cnt.filename && (cnt.filename.split('--')[0] === question.id)) {
                            questionMedia.push(cnt);
                        }
                    }
                    questionMedia.unshift(...question.uploadedMedia)
                    delete question.id;
                    delete question.uploadedMedia;
                    question.media = questionMedia;
                    updateQuestion.push(question);
                }
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    autoJoin: JSON.parse(fields.autoJoin), enableCbt: JSON.parse(fields.cbt),
                    enableRule: JSON.parse(fields.rule), roomType: fields.roomType,passMark: fields.passMark,
                    hour: fields.hour, minute: fields.minute, second: fields.second, edited: Date.now(),
                    duration: fields.duration, qchatTotal: fields.questionTotal, media: groupMedia,
                    tempFileID: tempFileID[2]
                }
                Promise.all([askQuestion ?
                    edit(qcontent, {question: updateQuestion, totalOption: fields.totalOption, tempFileID: tempFileID[2]}, 
                            tempFileID[2], tempFileID[0], null) : Promise.resolve(null), 
                        edit(group, cnt, tempFileID[2], fields.cntID, 'createGroup')]).then(id => {
                    return res.status(201).send(id[1]);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/advert', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'advert', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, button: JSON.parse(fields.button),
                    enableComment: JSON.parse(fields.comment), media, tempFileID
                }
                submit(advert, cnt, tempFileID, 'advert').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/advert', authenticate,(req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            advert.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'advert', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                uploadedMedia.push(...media);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    uploadedMedia.push(...tempFileID[1]);
                }
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,edited: Date.now(),
                    content: fields.content, title: fields.title, button: JSON.parse(fields.button),
                    enableComment: JSON.parse(fields.comment), media: uploadedMedia, tempFileID: tempFileID[2]
                }
                edit(advert, cnt, tempFileID[2], fields.cntID, 'advert').then(id => {
                    return res.status(201).send(id);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/feed', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'feed', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media, tempFileID
                }
                submit(feed, cnt, tempFileID, 'feed').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/feed', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            feed.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'feed', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                uploadedMedia.push(...media);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    uploadedMedia.push(...tempFileID[1]);
                }
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,edited: Date.now(),
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media: uploadedMedia, tempFileID: tempFileID[2]
                }
                edit(feed, cnt, tempFileID[2], fields.cntID, 'feed').then(id => {
                    return res.status(201).send(id);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/contest', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let mediaCnt = {
                        video: media.videos,
                        snapshot: media.images,
                        image
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        submitContest(content, contest, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, [], tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/contest', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editContest(content, contest, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, [], tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/cbt', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'qcontent', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cbtMedia = []
                for (let cnt of media){
                    if (cnt.filename && (cnt.filename.split('--')[0] === fields.id)) {
                        cbtMedia.push(cnt);
                    }
                }
                let questionMedia = [];
                let updateQuestion = [];
                for (let question of JSON.parse(fields.question)) {
                    questionMedia = []
                    for (let cnt of media){
                        if (cnt.filename && (cnt.filename.split('--')[0] === question.id)) {
                            questionMedia.push(cnt);
                        }
                    }
                    delete question.id;
                    question.media = questionMedia;
                    updateQuestion.push(question);
                }
                submit(qcontent, {question: updateQuestion, totalOption: fields.totalOption, tempFileID}, tempFileID, null).then(id => {
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                        enableComment: JSON.parse(fields.comment), enableDelete: JSON.parse(fields.delete),
                        showResult: JSON.parse(fields.result), participant: fields.participant,
                        hour: fields.hour, minute: fields.minute, second: fields.second, 
                        duration: fields.duration, qchatTotal: fields.questionTotal, media: cbtMedia, 
                        question: id, tempFileID
                    }
                    submit(qchat, cnt, tempFileID, 'qchat').then(id => {
                        return res.status(201).send(id);
                    })
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/cbt', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
    
        Promise.all([
            qchat.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve(result.question):Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList,  'qcontent', req.user)]).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cbtMedia = [];
                let uploadedMedia = JSON.parse(fields.uploadedMedia);
                for (let cnt of media){
                    if (cnt.filename && (cnt.filename.split('--')[0] === fields.id)) {
                        cbtMedia.push(cnt);
                    }
                }
                cbtMedia.unshift(...uploadedMedia);
                if (tempFileID[1] && tempFileID[1].length > 0) {
                    cbtMedia.push(...tempFileID[1]);
                }
                let questionMedia = [];
                let updateQuestion = [];
                for (let question of JSON.parse(fields.question)) {
                    questionMedia = []
                    for (let cnt of media){
                        if (cnt.filename && (cnt.filename.split('--')[0] === question.id)) {
                            questionMedia.push(cnt);
                        }
                    }
                    questionMedia.unshift(...question.uploadedMedia)
                    delete question.id;
                    delete question.uploadedMedia;
                    question.media = questionMedia;
                    updateQuestion.push(question);
                }

    
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), enableDelete: JSON.parse(fields.delete),
                    showResult: JSON.parse(fields.result), participant: fields.participant,
                    hour: fields.hour, minute: fields.minute, second: fields.second,  edited: Date.now(),
                    duration: fields.duration, qchatTotal: fields.questionTotal, media: cbtMedia, tempFileID: tempFileID[2]
                }
                Promise.all([edit(qcontent, {question: updateQuestion, totalOption: fields.totalOption, tempFileID: tempFileID[2]}, 
                            tempFileID[2], tempFileID[0], null),edit(qchat, cnt, tempFileID[2], fields.cntID,  'qchat')]).then(id => {
                    return res.status(201).send(id[1]);
                })
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.post('/add/page', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let mediaCnt = {
                        snapshot: media.images,
                        image
                    }
                    const content = form.fields;
                    connectStatus.then((result) => {
                        create(content, page, mediaCnt, req.user, 'page', '/page', 'pageInvite', tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


module.exports = router

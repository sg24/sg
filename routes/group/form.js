const express = require('express');
const router = express.Router();
let formidable = require('formidable');
const path = require('path');
const fs = require('fs'); 

const {appError, grouppost, page, groupquestion, group, groupwriteup, groupfeed, advert, groupcbt, qcontent, connectStatus, user} = require('../../serverDB/serverDB');
const authenticate = require('../../serverDB/middleware/authenticate');
let formInit = require('../utility/forminit');
let submit = require('../utility/submit');
let edit = require('../utility/edit');
let uploadToBucket = require('../utility/upload');
let savetemp = require('../utility/savetemp');
let deleteMedia = require('../utility/deletemedia');


fs.mkdir('./tmp', err => { 
    if (err && err.code != 'EEXIST') throw err
})

router.post('/add/grouppost', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'groupPost', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID,
                    groupID: fields.groupID
                }
                group.findById(fields.groupID).then(doc => {
                    if (doc) {
                        submit(grouppost, cnt, tempFileID, 'groupPost', doc.member).then(id => {
                            return res.status(201).send(id);
                        })
                    }
                });
            });
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/grouppost', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            grouppost.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'groupEditPost', req.user)]).then(tempFileID => {
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
                edit(grouppost, cnt, tempFileID[2], fields.cntID, 'groupEditPost').then(id => {
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

router.post('/add/groupquestion', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'groupQuestion', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID,
                    groupID: fields.groupID
                }
                submit(groupquestion, cnt, tempFileID, 'groupQuestion').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/groupquestion', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            groupquestion.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'groupEditQuestion', req.user)]).then(tempFileID => {
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
                edit(groupquestion, cnt, tempFileID[2], fields.cntID, 'groupEditQuestion').then(id => {
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

router.post('/add/groupfeed', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'groupFeed', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media, tempFileID,
                    groupID: fields.groupID
                }
                submit(groupfeed, cnt, tempFileID, 'groupFeed').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/groupfeed', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            groupfeed.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'groupFeed', req.user)]).then(tempFileID => {
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
                edit(groupfeed, cnt, tempFileID[2], fields.cntID, 'groupFeed').then(id => {
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

router.post('/add/groupwriteup', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'groupWriteup', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media, tempFileID,
                    groupID: fields.groupID
                }
                submit(groupwriteup, cnt, tempFileID, 'groupWriteup').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/groupwriteup', authenticate,(req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            groupwriteup.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'groupwriteup', req.user)]).then(tempFileID => {
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
                edit(groupwriteup, cnt, tempFileID[2], fields.cntID, 'groupWriteup').then(id => {
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

router.post('/add/groupcbt', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'groupQcontent', req.user).then(tempFileID => {
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
                        question: id, tempFileID, groupID: fields.groupID
                    }
                    submit(groupcbt, cnt, tempFileID, 'groupCbt').then(id => {
                        return res.status(201).send(id);
                    })
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/groupcbt', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
    
        Promise.all([
            groupcbt.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve(result.question):Promise.reject('Not Found')),
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
                            tempFileID[2], tempFileID[0], null),edit(groupcbt, cnt, tempFileID[2], fields.cntID,  'groupCbt')]).then(id => {
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

module.exports = router

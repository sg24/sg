const express = require('express');
const router = express.Router();
let formidable = require('formidable');
const path = require('path');
const fs = require('fs'); 

const {appError, grouppost, page, question, group, writeup, feed, advert, qchat, qcontent, connectStatus, user} = require('../../serverDB/serverDB');
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
        savetemp(mediaList, 'grouppost', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID,
                    groupID: fields.groupID
                }
                group.findById(fields.groupID).then(doc => {
                    if (doc) {
                        submit(grouppost, cnt, tempFileID, 'grouppost', doc.member).then(id => {
                            return res.status(201).send(id);
                        })
                    }
                });
            });
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send(err);
    })
})

router.post('/edit/grouppost', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields;
        Promise.all([
            grouppost.findOne({_id: fields.cntID, authorID: req.user}).then(result => result ? Promise.resolve():Promise.reject('Not Found')),
            deleteMedia(JSON.parse(fields.removeMedia)), savetemp(mediaList, 'grouppost', req.user)]).then(tempFileID => {
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
                edit(grouppost, cnt, tempFileID[2], fields.cntID, 'grouppost').then(id => {
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

module.exports = router

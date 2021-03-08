let express = require('express');
let router = express.Router();
let arraySort = require('array-sort');
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');
const webpush = require('web-push');

let formidable = require('formidable');
let uploadStream = require('./utility/uploadStream')
let savetemp = require('./utility/savetemp');
let authenticate = require('../serverDB/middleware/authenticate');
let filterCnt = require('./utility/filtercnt');
let formInit = require('./utility/forminit');
let deleteMedia = require('./utility/deletemedia');
const {mediachat, post,  connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    let model = req.body.page === 'post' ? post : post;
    if (req.header !== null && req.header('data-categ') === 'mediaInfo') {
        let chat = JSON.parse(req.body.chat);
        mediachat.find({_id: {$in: chat}}).then(result => {
            let media = null;
            if (result.length > 0) {
                media = [];
                for (let cnt of result) {
                    media.push({_id: cnt._id, like: cnt.like.length, chatTotal: cnt.chat.length, dislike: cnt.dislike.length,
                        isLiked: cnt.like.filter(userID => JSON.parse(JSON.stringify(userID))  === req.user)[0] ? true : false,
                        isDisliked: cnt.dislike.filter(userID => JSON.parse(JSON.stringify(userID))  === req.user)[0] ? true : false })
                }
            }
            res.status(200).send(media);
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'mediaLike') {
        model.findById(req.body.pageID).then(doc => {
          if (doc) {
            let media = doc.media.filter(media => JSON.parse(JSON.stringify(media.id)) === req.body.mediaID)[0];
            let mediaIndex = doc.media.findIndex(media => JSON.parse(JSON.stringify(media.id)) === req.body.mediaID);
            if (media) {
                if (media.chat) {
                    mediachat.findOneAndUpdate({_id: media.chat, like: {$in: [req.user]}}, {$pull: {like: req.user}}).then(result => {
                        if (result) {
                            return res.status(200).send({isLiked: false, like: result.like.length - 1})
                        } else {
                            mediachat.findOneAndUpdate({_id: media.chat, like: {$nin: [req.user]}}, {$push: {like: req.user}}).then(cnt => {
                                if (cnt) {
                                    return res.status(200).send({isLiked: true, like: cnt.like.length + 1})
                                }
                            })
                        }
                    })
                } else {
                    let newDoc = new mediachat({
                        like: [req.user]
                    });
                    newDoc.save().then(result => {
                        media.chat = result._id;
                        let updateMedia = doc.media;
                        updateMedia[mediaIndex] = media;
                        doc.updateOne({media: updateMedia}).then(() => {
                            return res.status(200).send({isLiked: true, like: 1, mediaInfo: {_id : req.body.pageID, media: updateMedia}});
                        })
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                }
            }
          }
        }).catch(e => {
            res.status(404).send(e)
        })
        return
    }

    if (req.header !== null && req.header('data-categ') === 'getChat') {
        model.findById(req.body.pageID).then(doc => {
            if (doc) {
                let media = doc.media.filter(media => JSON.parse(JSON.stringify(media.id)) === req.body.cntID)[0];
                let mediaIndex = doc.media.findIndex(media => JSON.parse(JSON.stringify(media.id)) === req.body.cntID);
                if (media) {
                    if (media.chat) {
                        mediachat.aggregate([{
                            $match: {_id: objectID(media.chat)}}, 
                            {$unwind: "$chat"}, 
                            {$sort: {"chat.created": -1}},
                            {$skip: req.body.start},
                            {$limit: req.body.limit},
                            {"$group": {"_id": "$_id", "chat": {"$push": "$chat"}}}]).then(chat => {
                                return res.status(200).send({chat, username: req.username, userImage: req.userImage, userID: req.user})
                        })
                    } else {
                        let newDoc = new mediachat({
                            chat: []
                        });
                        newDoc.save().then(result => {
                            media.chat = result._id;
                            let updateMedia = doc.media;
                            updateMedia[mediaIndex] = media;
                            doc.updateOne({media: updateMedia}).then(() => {
                                return res.status(200).send({chat: [], mediaInfo: {_id : req.body.pageID, media: updateMedia},
                                    username: req.username, userImage: req.userImage, userID: req.user});
                            })
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }
                } 
            } else {
               return Promise.reject('Not found');
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

});

module.exports = router

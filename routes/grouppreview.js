let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
let fs = require('fs');

let formidable = require('formidable');
let savetemp = require('./utility/savetemp');
let sequence = require('./utility/sequence');
let deleteMedia = require('./utility/deletemedia');
let authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let search = require('./utility/search');
let notifications = require('./utility/notifications');
const {group, qcontent, advert, user, connectStatus} = require('../serverDB/serverDB');

router.post('/', authenticate, (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'getGroupInfo') {
        let pageID = req.body.searchCnt;
        group.findOne({member: {$in: [req.user]}, _id: pageID}).then(doc => {
            if (doc) {
                let imageMedia = doc.media.filter(cnt => cnt.bucket == 'image');
                res.status(200).send({page: [{_id: pageID, name: doc.title, member: doc.member.length, settings: doc.settings, authorID: doc.authorID,
                    media: doc.media, defaultImage: imageMedia.length > 0 ? imageMedia[Math.round(Math.random(imageMedia.length-1))].id : null}]})
            }
        }).catch(err => {
            res.status(500).send(err)
        })
        return
    }

});

module.exports = router

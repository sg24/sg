let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../serverDB/serverDB');

router.post('/', (req, res, next) => {
    connectStatus.then(() => {
        let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'media'
        });
        
        if (req.header('data-categ') === 'media') {
            let mediaID = req.body.mediaID;
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

module.exports = router
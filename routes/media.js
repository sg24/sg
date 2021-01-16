let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../serverDB/serverDB');

router.get('/:bucket/:id', (req, res, next) => {
    let bucketName = req.params.bucket;
    let id = req.params.id.split('.')[0];

    if (!bucketName || !id) {
        res.sendStatus(404);
        return

    }
    connectStatus.then(() => {
        let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName
        });
        
        var FILES_COLL = `${bucketName}.files`;
        var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: mongoose.mongo.ObjectId(id) });
        filesQuery.toArray(function(error, docs) {
            if (!docs || docs.length < 1) {
                return res.sendStatus(404);
            }
            let ext = docs[0].filename.split('.').pop();
            let mediaType = `${bucketName}/${ext}`;
            if(req.headers['range']) {
                var parts = req.headers['range'].replace(/bytes=/, "").split("-");
                var partialstart = parts[0];
                var partialend = parts[1];
                var start = parseInt(partialstart, 10);
                var end = partialend ? parseInt(partialend, 10) : docs[0].length - 1;
                let chunksize = (end-start)+1;

                if (start >= docs[0].length || end >= docs[0].length) {
                    res.header('Content-Range', 'bytes */' + docs[0].length);
                    res.sendStatus(416);
                    return 
                }
                
                res.writeHead(206, {
                    'Content-disposition': 'filename=xyz',
                    'Accept-Ranges': 'bytes',
                    'Content-Type': mediaType,
                    'Content-Range': 'bytes ' + start + '-' + end + '/' + docs[0].length,
                    'Content-Length':  start === end ? 0 : chunksize
                });

                let media = bucket.openDownloadStream(mongoose.mongo.ObjectId(id)).start(start);
              
                media.on('data', function(buff) {
                    res.write(buff);
                });
                
                media.on('end', function() {
                    res.end();
                });

                media.on('error', function(err) {
                    return res.status(500).send(err)
                });
            } else {
                res.header('Content-Type', mediaType);
                res.header('Content-Length', docs[0].length);
                var stream = bucket.openDownloadStream(mongoose.mongo.ObjectId(id));;
                stream.pipe(res);
            }
        });
    }).catch(err => {
        res.sendStatus(500);
    })
})

module.exports = router
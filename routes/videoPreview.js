let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let fs = require('fs')
const {connectStatus} = require('../serverDB/serverDB');

router.get('/:bucket/:id', (req, res, next) => {
    let bucketName = req.params.bucket;
    let id = req.params.id.split('.')[0];

    if (!bucketName || !id) {
        res.sendStatus(404);
        return

    }
    console.log('videoPreview')
    // var FILES_COLL = `${bucketName}.chunks`;
    // mongoose.connection.db.collection(FILES_COLL).findOne({ files_id: mongoose.mongo.ObjectId(id) }).then((doc) => {
    //     fs.writeFile('tmp/data.mp4', doc.data, (err) => {
    //         if (!err) {
    //             require('child_process').exec(('ffmpeg -ss 00:00:1 -i ' + `tmp/data.mp4` + ' -vframes 1 -q:v 2 ' + `tmp/data.png`), function (err, stdout, stderr) {
    //             if (err) {
    //                 console.log(err)
    //             }
    //          })
    //         }
    //     })
    // }).catch(err => {
    //     console.log(err)
    // })
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName
    });
    var FILES_COLL = `${bucketName}.files`;
    var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: mongoose.mongo.ObjectId(id) });
    filesQuery.toArray(function(error, docs) {
        if (!docs || docs.length < 1) {
            return res.sendStatus(404);
        }
        console.log(docs[0])
        let media = bucket.openDownloadStream(mongoose.mongo.ObjectId(id), {start: 0, end: docs[0].length})
          console.log(media.read(2))
            media.on('data', function(buff) {
                res.write(buff);
            });
            
            media.on('end', function() {
            });

            media.on('error', function(err) {
                console.log(err)
            });
    });
})

module.exports = router
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');
const fs = require('fs');

let uploadMedia = (video) => {
    return new Promise((resolve, reject) => {
        let uploaded = 0;
        
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'media'
            });
            var FILES_COLL = 'media.files';
            let readStream = fs.createReadStream(video.path);
            let uploadStream = bucket.openUploadStream(video.filename);
            let id = uploadStream.id;
            uploadStream.once('finish', function() {
                var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: id });
                filesQuery.toArray(function(error, docs) {
                    fs.unlink(video.path, function(err) {
                        if (!err) {
                            resolve(docs[0])
                        }
                    })
                });
            })
            readStream.pipe(uploadStream);
                
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = uploadMedia
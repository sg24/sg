let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');
const fs = require('fs');

let uploadMedia = (file) => {
    return new Promise((resolve, reject) => {
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: file.type ? file.type.split('/')[0] : 'unknown'
            });
            var FILES_COLL = `${file.type ? file.type.split('/')[0]: 'unknown'}.files`;
            let readStream = fs.createReadStream(file.path);
            let uploadStream = bucket.openUploadStream(file.name);
            let id = uploadStream.id;
            uploadStream.once('finish', function() {
                var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: id });
                filesQuery.toArray(function(error, docs) {
                    fs.unlink(file.path, function(err) {
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
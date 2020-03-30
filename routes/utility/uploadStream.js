let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');
const fs = require('fs');

let uploadStream = (doc) => {
    return new Promise((resolve, reject) => {
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: doc.bucketName
            });
            var FILES_COLL = `${doc.bucketName}.files`;
            let readStream = fs.createReadStream(doc.path);
            let uploadStream = bucket.openUploadStream(doc.filename);
            let id = uploadStream.id;
            uploadStream.once('finish', function() {
                var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: id });
                filesQuery.toArray(function(error, docs) {
                    fs.unlink(doc.path, function(err) {
                        if (!err) {
                            return resolve(docs[0])
                        }
                        return reject(err)
                    })
                });
            })
            readStream.pipe(uploadStream);
                
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = uploadStream
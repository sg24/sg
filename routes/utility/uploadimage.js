let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');
const fs = require('fs');

let uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        let uploaded = 0;
        
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'image'
            });
            var FILES_COLL = 'image.files';
            let readStream = fs.createReadStream(image.path);
            let uploadStream = bucket.openUploadStream(image.filename);
            let id = uploadStream.id;
            uploadStream.once('finish', function() {
                var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: id });
                filesQuery.toArray(function(error, docs) {
                    fs.unlink(image.path, function(err) {
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

module.exports = uploadImage
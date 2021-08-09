let express = require('express');
let router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;
const {connectStatus} = require('../../serverDB/serverDB');
const fs = require('fs');
const cloudinary = require('cloudinary');

let uploadMedia = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
        cloudinary.v2.uploader.upload_large(file.path, {resource_type: "auto", public_id: JSON.parse(JSON.stringify(objectID()))}, (error, result) => {
            if (!error) {
                fs.unlink(file.path, function(err) {
                    if (!err) {
                        result['filename'] = file.name;
                        result['_id'] = result.public_id;
                        resolve(result);
                    }
                })
            } else {
                fs.unlink(file.path, function(err) {
                    reject(error)
                })
            }
        })
        // connectStatus.then(() => {
        //     let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        //         bucketName: file.type ? file.type.split('/')[0] : 'unknown'
        //     });
        //     var FILES_COLL = `${file.type ? file.type.split('/')[0]: 'unknown'}.files`;
        //     let readStream = fs.createReadStream(file.path);
        //     let uploadStream = bucket.openUploadStream(file.name);
        //     let id = uploadStream.id;
        //     uploadStream.once('finish', function() {
        //         var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({ _id: id });
        //         filesQuery.toArray(function(error, docs) {
        //             fs.unlink(file.path, function(err) {
        //                 if (!err) {
        //                     resolve(docs[0])
        //                 }
        //             })
        //         });
        //     })
        //     readStream.pipe(uploadStream);
                
        // }).catch(err => {
        //    reject(err)
        // })
    })
}

module.exports = uploadMedia
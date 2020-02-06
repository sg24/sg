let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');

let deleteMedia = (medias, bucketName) => {
    return new Promise((resolve, reject) => {
        let deleted = 0;
        
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName
            });
            
            if (medias.length < 1) {
                resolve()
                return
            }
            
            for (let media of medias) {
                bucket.delete(mongoose.mongo.ObjectId(media.id)).then(() => {
                    ++deleted;
                    if (deleted === medias.length) {
                        resolve()
                    }
                }).catch(err=> {
                    reject(err)
                });
            }
                
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = deleteMedia
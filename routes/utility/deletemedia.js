let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus, mediachat } = require('../../serverDB/serverDB');

let deleteMedia = (medias) => {
    return new Promise((resolve, reject) => {
        let deleted = 0;
        
        connectStatus.then(() => {
            if (medias.length < 1) {
                resolve()
                return
            }
            
            for (let media of medias) {
                let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                    bucketName: media.bucket
                });
                Promise.all([bucket.delete(mongoose.mongo.ObjectId(media.id)),
                    media.chat ? mediachat.findByIdAndDelete(media.chat) : Promise.resolve()]).then(() => {
                    ++deleted;
                    if (deleted === medias.length) {
                        resolve()
                    }
                }).catch(err=> {
                    resolve()
                });
            }
                
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = deleteMedia
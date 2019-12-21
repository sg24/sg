let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');

let deleteMedia = (videos) => {
    return new Promise((resolve, reject) => {
        let deleted = 0;
        
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'media'
            });
            console.log(videos)
            if ( videos.length < 1) {
                resolve()
                return
            }
            
            for (let video of videos) {
                bucket.delete(mongoose.mongo.ObjectId(video.id)).then(() => {
                    ++deleted;
                    if (deleted === videos.length) {
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
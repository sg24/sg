let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus, mediachat } = require('../../serverDB/serverDB');

let deleteMedia = (medias) => {
    return new Promise((resolve, reject) => {
        let deleted = 0;
        let mediaChat = [];
        connectStatus.then(() => {
            if (medias.length < 1) {
                resolve()
                return
            }
            
            for (let media of medias) {
                let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                    bucketName: media.bucket
                });
                Promise.all([
                    media.chat ? Promise.resolve(media) : bucket.delete(mongoose.mongo.ObjectId(media.id))]).then(result => {
                    ++deleted;
                    if (result[0]) {
                        mediaChat.push(result[0]);
                    }
                    if (deleted === medias.length) {
                        resolve(mediaChat);
                    }
                }).catch(err=> {
                    resolve(mediaChat);
                });
            }
                
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = deleteMedia
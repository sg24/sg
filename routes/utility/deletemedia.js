let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const {connectStatus, mediachat } = require('../../serverDB/serverDB');

let deleteMedia = (medias) => {
    return new Promise((resolve, reject) => {
        let deleted = 0;
        let mediaChat = [];
        if (medias.length < 1) {
            resolve()
            return
        }
        
        for (let media of medias) {
            cloudinary.config({ 
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY, 
                api_secret: process.env.CLOUDINARY_API_SECRET 
            });
            Promise.all([
                media.chat ? Promise.resolve(media) : 
                cloudinary.v2.uploader.destroy(media.id, {resource_type: media.bucket})]).then(result => {
                ++deleted;
                if (result[0] && !result[0].result) {
                    mediaChat.push(result[0]);
                }
                if (deleted === medias.length) {
                    resolve(mediaChat);
                }
            }).catch(err => {
                reject(err);
            });
        }
            
    }).catch(err => {
        reject(err)
    })
}

module.exports = deleteMedia
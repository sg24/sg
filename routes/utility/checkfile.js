let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {connectStatus} = require('../../serverDB/serverDB');
const fs = require('fs');

let checkFile = (filename, bucketName, coll) => {
    return new Promise((resolve, reject) => {
        let uploaded = 0;
        
        connectStatus.then(() => {
            let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName
            });
            var FILES_COLL = coll;
            var filesQuery = mongoose.connection.db.collection(FILES_COLL).find({filename});
            filesQuery.toArray(function(error, docs) {
                resolve(docs)
            });
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = checkFile
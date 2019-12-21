const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const MediaFilesSchema = new Schema({
    length: {
        type: Number
    },
    chunkSize: {
        type: Number
    },
    uploadDate:{
        type: Date
    },
    filename: {
        type: String
    },
    md5: {
        type: String
    },
    contentType:{
        type: String
    }
})

const mediaFile = mongoose.model('media.files', MediaFilesSchema);



module.exports = mediaFile;
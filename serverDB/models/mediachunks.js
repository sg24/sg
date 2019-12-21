const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const MediaChunkSchema = new Schema({
    files_id: {
        type: String
    },
    n: {
        type: Number
    },
    data:{
        type: Buffer
    }
})

const mediaChunk = mongoose.model('media.chunks', MediaChunkSchema);



module.exports = mediaChunk;
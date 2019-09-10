const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mediaSchema = new Schema({
    id: ObjectId,
    media: {
        mediaType: String,
        mediaID: String,
        data: String
    }
})

const media = mongoose.model('media', mediaSchema);

module.exports = media;

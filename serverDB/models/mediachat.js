const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MediaChatSchema = new Schema({
    like: [{
        type: ObjectId
    }],
    dislike:  [{
        type: ObjectId
    }],
    chat: [{
        authorID: {
            type: ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        userImage: {
            type: String
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        media: [{
            id: ObjectId, 
            filename: String, 
            bucket: String,
            ext: String, 
            description: String
        }],
        created: { 
            type: Date, 
            default: Date.now,
            index: true 
        },
        tempFileID: String
    }],

})

const  mediaChat = mongoose.model('mediachats',  MediaChatSchema);
module.exports = mediaChat;

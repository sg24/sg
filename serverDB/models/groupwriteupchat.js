const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupWriteUpChatSchema = new Schema({
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
        reply: [{
            type: ObjectId
        }],
        correct: [{
            type: ObjectId
        }],
        wrong: [{
            type: ObjectId
        }],
        replyChat: {
            type: Boolean,
            default: false
        },
        replyChatID: {
            type: String
        },
        shared: {
            type: String
        },
        tempFileID: String
    }],
})

const  groupwriteupChat = mongoose.model('groupwriteupchats',  GroupWriteUpChatSchema);
module.exports = groupwriteupChat;

const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupCbtChatSchema = new Schema({
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
        verified: {
            type: Boolean,
            default: false
        },
        tempFileID: String
    }],
})

const  groupCbtChat = mongoose.model('groupcbtchats',  GroupCbtChatSchema);
module.exports = groupCbtChat;

const mongoose = require('mongoose');

const ChatSchema = new Schema({
    host: {
        type: String,
        required: true
    },
    reply: { 
        type: String,
        required: true
    },
    chat: [{
        ID: String,
        userType: String,
        msg: String,
        cntType: String,
        chatID: String,
        format: String,
        created: {
            type: Date,
            default: Date.now
        },
        block: {
            type: Array,
            default: []
        }
    }],
    lastMsg: [{
        userID: String,
        msgCnt: {
            msg: String,
            created: {
                type: Date,
                default: Date.now
            }
        }
    }],
    active: {
        type: Array,
        default: [String]
    },
    _isCompleted: {
        type: Boolean,
        default: false
    }
})

ChatSchema.index({title: 'text'});
const groups = mongoose.model('groups', ChatSchema);

module.exports = groups;

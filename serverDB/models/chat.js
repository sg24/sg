const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ChatSchema = new Schema({
    host: {
        type: String,
        required: true
    },
    reply: { 
        type: String,
        required: true
    },
    position: {
        type: Number,
        default: 0
    },
    chat: [{
        ID: String,
        userType: String,
        msg: String,
        cntType: String,
        chatID: String,
        format: String,
        position: {
            type: Number,
            default: 0
        },
        created: {
            type: Date,
            default: Date.now
        },
        block: {
            type: Array,
            default: []
        },
        delete: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        },
        reply: [{
            ID: String,
            userType: String,
            msg: String,
            cntType: String,
            chatID: String,
            format: String,
            mainID: String,
            position: {
                type: Number,
                default: 0
            },
            block: {
                type: Array,
                default: []
            },
            delete: {
                type: Boolean,
                default: false
            },
            edit: {
                type: Boolean,
                default: false
            },
            created: {
                type: Date,
                default: Date.now
            }}]
    }],
    lastID: {
        type: String,
        required: true
    }
})

const chat = mongoose.model('chat', ChatSchema);

module.exports = chat;

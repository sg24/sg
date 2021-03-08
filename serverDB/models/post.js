const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    authorID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userImage: {
        type: String
    },
    created: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    edited: { 
        type: Date
    },
    content: {
        type: String,
        trim: true
    },
    hashTag: {
        type: Array,
        default: [String]
    },
    media: [{
        id: ObjectId, 
        filename: String, 
        bucket: String,
        ext: String, 
        description: String,
        chat: String
    }],
    comment: {
        type: Array,
        default: [String]
    },
    share: {
        type: Array,
        default: [String]
    },
    mode: {
        type: String,
        default: 'publish'
    },
    view: {
        type: Number,
        default: 0
    },
    favorite: {
        type: Number,
        default: 0
    },
    liked: {
        type: Array,
        default: [String]
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
        image: String,
        username: String,
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
            image: String,
            username: String,
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
        type: String
    },
    _isCompleted: {
        type: Boolean,
        default: false
    },
    tempFileID: String
})

PostSchema.index({content: 'text'});
const post = mongoose.model('Posts', PostSchema);

module.exports = post;
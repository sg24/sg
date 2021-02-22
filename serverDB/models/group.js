const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupSchema = new Schema({
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
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    hashTag: {
        type: Array,
        default: [String]
    },
    duration: {
        type: Number
    },
    hour: {
        type: Number,
        default: 0
    },
    minute: {
        type: Number,
        default: 0
    },
    second: {
        type: Number,
        default: 0
    },
    roomType: {
        type: String,
        trim: true
    },
    passMark: {
        type: Number,
        trim: true,
        default: 0
    },
    autoJoin: {
        type: Boolean,
        default: false
    },
    enableCbt: {
        type: Boolean,
        default: false,
    },
    enableRule: {
        type: Boolean,
        default: false
    },
    media: [{
        id: ObjectId, 
        filename: String, 
        bucket: String,
        ext: String, 
        description: String
    }],
    liked: {
        type: Array,
        default: [String]
    },
    edit: {
        type: Date
    },
    question: {
    },
    qchatTotal: {
        type: Number
    },
    request: {
        type: Array,
        default: [String]
    },
    member: {
        type: Array,
        default: [String]
    },
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
    mode: {
        type: String,
        default: 'publish'
    },
    _isCompleted: {
        type: Boolean,
        default: false
    },
    tempFileID: String
})

GroupSchema.index({title: 'text'});
const groups = mongoose.model('groups', GroupSchema);

module.exports = groups;

const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupQuestionSchema = new Schema({
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
        description: String
    }],
    share: [{
        type: ObjectId
    }],
    favorite: [{
        type: ObjectId
    }],
    mode: {
        type: String,
        default: 'publish'
    },
    chat: {
        _id: {
            type: String
        },
        total: {
            type: Number,
            default: 0
        },
        correctTotal: {
            type: Number,
            default: 0
        },
        wrongTotal: {
            type: Number,
            default: 0
        },
        user: [{
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
            }
        }]
    },
    shareInfo: {
        authorID: {
            type: String
        },
        username: {
            type: String
        },
        userImage: {
            type: String
        },
        pageID: {
           type: String
        },
        pageTitle: {
            type: String
        },
        cntID: {
            type: String
        },
        created: { 
            type: Date, 
            default: Date.now
        }
    },
    groupID: {
        type: ObjectId
    },
    block: [{
        type: ObjectId
    }],
    report: [{
        type: String
    }],
    blacklisted: {
        type: String,
        default: false
    },
    _isCompleted: {
        type: Boolean,
        default: false
    },
    tempFileID: String
})

GroupQuestionSchema.index({content: 'text'});
const groupquestions = mongoose.model('groupquestions', GroupQuestionSchema);

module.exports = groupquestions;
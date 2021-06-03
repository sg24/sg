const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupWriteUpSchema = new Schema({
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
        default: Date.now
    },
    edited: { 
        type: Date
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
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
    enableComment: {
        type: Boolean,
        default: true
    },
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

GroupWriteUpSchema.index({title: 'text'});
const GroupWriteUps = mongoose.model('GroupWriteUps', GroupWriteUpSchema);

module.exports = GroupWriteUps;

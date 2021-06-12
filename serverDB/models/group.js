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
    question: {
        type: String
    },
    qchatTotal: {
        type: Number
    },
    request: [{
        authorID: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            index: 'text'
        },
        userImage: {
            type: String
        }
    }],
    member: [{
        authorID: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            index: 'text'
        },
        userImage: {
            type: String
        }
    }],
    mark: [{
        question: [{
            _id: {
                type: ObjectId,
                required: true
            },
            content: {
                type: String,
                required: true,
                trim: true
            },
            answer: {
                type: String,
                trim: true
            },
            correctAnswer: {
                type: String
            },
            media: [{
                id: ObjectId, 
                filename: String, 
                bucket: String,
                ext: String, 
                description: String
            }],
        }],
        score: {
            type: Number
        },
        questionTotal: {
            type: Number
        },
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
        }
    }],
    pendingApprove: [{
        _id: ObjectId,
        score: {
            type: Number
        },
        questionTotal: {
            type: Number
        },
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
        }
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
    settings: {
        enablePost: {
            type: Boolean,
            default: true
        },
        enableQuestion: {
            type: Boolean,
            default: true
        },
        enableWriteUp: {
            type: Boolean,
            default: true
        },
        enableFeed: {
            type: Boolean,
            default: true
        },
        enableCBT: {
            type: Boolean,
            default: true
        },
        enableChatroom: {
            type: Boolean,
            default: true
        }
    },
    tempFileID: String
})

GroupSchema.index({title: 'text'});
const groups = mongoose.model('groups', GroupSchema);

module.exports = groups;

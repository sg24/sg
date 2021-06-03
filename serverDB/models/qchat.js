const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QchatSchema = new Schema({
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
        required: true,
        trim: true
    },
    hashTag: {
        type: Array,
        default: [String]
    },
    duration: {
        type: Number,
        required: true
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
    participant: {
        type: String,
        required: true,
        trim: true
    },
    participate: [{
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
    }],
    showResult: {
        type: Boolean,
        default: true
    },
    enableDelete: {
        type: Boolean,
        default: false,
    },
    enableComment: {
        type: Boolean,
        default: true
    },
    media: [{
        id: ObjectId, 
        filename: String, 
        bucket: String,
        ext: String, 
        description: String
    }],
    allowedUser: [{
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
    }],
    request: [{
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
    question: {
        type: ObjectId
    },
    paid: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: 0
    },
    qchatTotal: {
        type: Number,
        required: true
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
QchatSchema.index({title: 'text'});
const qchat = mongoose.model('qchats', QchatSchema);

module.exports = qchat;

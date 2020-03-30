const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupSchema = new Schema({
    id: ObjectId,
    authorID: {
        type: String,
        required: true
    },
    groupCreated: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    category: {
        type: Array,
        required: true
    },
    image: {
        type: Object
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    request: {
        type: Array,
        default: [String]
    },
    member: {
        type: Array,
        default: [String]
    },
    online: {
        type: Array,
        default: [String]
    },
    memberTotal: {
        type: Number,
        default: 0
    },
    onlineTotal: {
        type: Number,
        default: 0
    },
    mode: {
        type: String,
        default: 'publish'
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

GroupSchema.index({title: 'text'});
const groups = mongoose.model('groups', GroupSchema);

module.exports = groups;

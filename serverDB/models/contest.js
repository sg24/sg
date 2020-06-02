const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const ContestSchema = new Schema({
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
    userType: {
        type: String
    },
    created: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    nickname: {
        type: String
    },
    bank: {
        type: String
    },
    account: {
        type: String
    },
    paypal: {
        type: String  
    },
    phone: {
        type: String  
    },
    video: {
        type: Array,
        default: [String]
    },
    image: {
        type: Array,
        default: [String]
    },
    snapshot: {
        type: Array
    },
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
    }
})

ContestSchema.index({nickname: 'text'});
const contest = mongoose.model('contests', ContestSchema);

module.exports = contest;

const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CommentSchema = new Schema({
    authorID: {
        type: String
    },
    userType: {
        type:String
    },
    commentID: {
        type: String
    },
    commentCreated: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String
    },
    reply: [{
        authorID: {
            type: String
        },
        userType: {
            type:String
        },
        commentID: {
            type: String
        },
        commentCreated: {
            type: Date,
            default: Date.now
        },
        comment: {
            type: String
        },
        like: [{
            type: String
        }],
        liked: {
            type: Number,
            default: 0
        },
        dislike: [{
            type: String
        }],
        disliked: {
            type: Number,
            default: 0
        },
        smile: [{
            type: String
        }],
        smiled: {
            type: Number,
            default: 0
        }
    }],
    like: [{
        type: String
    }],
    liked: {
        type: Number,
        default: 0
    },
    dislike: [{
        type: String
    }],
    disliked: {
        type: Number,
        default: 0
    },
    smile: [{
        type: String
    }],
    smiled: {
        type: Number,
        default: 0
    }
})

const comment = mongoose.model('comments', CommentSchema);



module.exports = comment;
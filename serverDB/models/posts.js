const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    id: ObjectId,
    authorID: {
        type: String,
        required: true
    },
    postCreated: { 
        type: Date, 
        default: Date.now 
    },
    category: {
        type: Array,
        required: true
    },
    mediaID: {
        type: Array
    },
    shareMe: {
        type: Array
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
    view: {
        type: Number,
        required: true,
        default: 0
    },
    comment: {
        type: Number,
        required: true,
        default: 0
    },
    favorite: {
        type: Number,
        required: true,
        default: 0
    },
    liked: {
        type: Array,
        required: true,
        default: [String]
    },
    mode: {
        type: String,
        required: true
    },
    _isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

const posts = mongoose.model('posts', PostSchema);

module.exports = posts;

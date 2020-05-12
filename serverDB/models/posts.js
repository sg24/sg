const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    id: ObjectId,
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
    postCreated: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    category: {
        type: Array,
        required: true
    },
    video: {
        type: Array,
        default: [String]
    },
    image: {
        type: Array,
        default: [String]
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
    snapshot: {
        type: Array
    },
    edit: {
        type: Date
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

PostSchema.index({title: 'text'});
const posts = mongoose.model('posts', PostSchema);

module.exports = posts;

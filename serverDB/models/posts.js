const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    id: ObjectId,
    author: {
        type: String,
        required: true
    },
    authorID: {
        type: String,
        required: true,
        unique: true
    },
    userImage: Buffer,
    postCreated: { 
        type: Date, 
        default: Date.now 
    },
    category: [String],
    postImage: Buffer,
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
        type: Boolean,
        required: true,
        user: [String]
    }
})

const posts = mongoose.model('posts', PostSchema);

module.exports = posts;

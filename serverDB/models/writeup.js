const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WriteUpSchema = new Schema({
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
        default: 'publish'
    },
    _isCompleted: {
        type: Boolean,
        default: false
    },
    tempFileID: String
})

WriteUpSchema.index({title: 'text'});
const WriteUps = mongoose.model('WriteUps', WriteUpSchema);

module.exports = WriteUps;

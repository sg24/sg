const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QuestionSchema = new Schema({
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
    content: {
        type: String,
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
    helpFull: {
        type: Number,
        required: true,
        default: 0
    },
    notHelpFull: {
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

QuestionSchema.index({content: 'text'});
const questions = mongoose.model('questions', QuestionSchema);

module.exports = questions;

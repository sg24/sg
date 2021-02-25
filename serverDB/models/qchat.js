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
    shareMe: {
        type: Array
    },
    write: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
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
QchatSchema.index({title: 'text'});
const qchat = mongoose.model('qchats', QchatSchema);

module.exports = qchat;

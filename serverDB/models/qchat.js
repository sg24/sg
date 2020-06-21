const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QchatSchema = new Schema({
    id: ObjectId,
    authorID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userType: {
        type: String
    },
    userImage: {
        type: String
    },
    created: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    category: {
        type: Array
    },
    video: {
        type: Array,
        default: []
    },
    image: {
        type: Array,
        default: []
    },
    shareMe: {
        type: Array
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    write: {
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
    duration: {
        type: Number
    },
    hour: {
        type: Number
    },
    minute: {
        type: Number
    },
    second: {
        type: Number
    },
    snapshot: {
        type: Array,
        default: []
    },
    edit: {
        type: Date
    },
    mode: {
        type: String,
        required: true
    },
    contentID: {
        type: String,
        required: true
    },
    access: {
    },
    qchatTotal: {
        type: Number,
        required: true
    },
    _isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})
QchatSchema.index({title: 'text'});
const qchat = mongoose.model('qchats', QchatSchema);

module.exports = qchat;

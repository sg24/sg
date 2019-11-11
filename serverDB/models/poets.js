const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PoetSchema = new Schema({
    id: ObjectId,
    authorID: {
        type: String,
        required: true
    },
    pwtCreated: { 
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

PoetSchema.index({desc: 'text'});
const poets = mongoose.model('poets', PoetSchema);

module.exports = poets;

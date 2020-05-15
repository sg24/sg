const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdvertsSchema = new Schema({
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
    shareMe: {
        type: Array
    },
    _isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

AdvertsSchema.index({title: 'text'});
const adverts = mongoose.model('adverts', AdvertsSchema);

module.exports = adverts;

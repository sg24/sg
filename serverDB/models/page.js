const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PageSchema = new Schema({
    id: ObjectId,
    authorID: {
        type: String,
        required: true
    },
    created: { 
        type: Date, 
        default: Date.now,
        index: true,
    },
    image: {
        type: Object
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    group: [{
        type: String
    }],
    request: {
        type: Array,
        default: [String]
    },
    member: {
        type: Array,
        default: [String]
    },
    _isCompleted: {
        type: Boolean,
        default: false
    }
})

PageSchema.index({title: 'text'}, { unique: true });
const page = mongoose.model('page', PageSchema);

module.exports = page;

const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GroupSchema = new Schema({
    id: ObjectId,
    authorID: {
        type: String,
        required: true
    },
    groupCreated: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    category: {
        type: Array,
        required: true
    },
    image: {
        type: Object
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
    member: {
        type: Array,
        default: [String]
    },
    _isCompleted: {
        type: Boolean,
        default: false
    }
})

GroupSchema.index({title: 'text'});
const groups = mongoose.model('groups', GroupSchema);

module.exports = groups;

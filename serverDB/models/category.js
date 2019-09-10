const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CategorySchema = new Schema({
    posts: {
        type: Array,
        unique: true,
        default: [String]
    },
    questions: {
        type: Array,
        unique: true,
        default: [String]
    },
    onlineQue: {
        type: Array,
        unique: true,
        default: [String]
    },
    poet: {
        type: Array,
        unique: true,
        default: [String]
    }
})

const category = mongoose.model('category', CategorySchema);



module.exports = category;
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CategorySchema = new Schema({
    posts: {
        type: Array,
        default: [String]
    },
    questions: {
        type: Array,
        default: [String]
    },
    onlineQue: {
        type: Array,
        default: [String]
    },
    poet: {
        type: Array,
        default: [String]
    }
})

const category = mongoose.model('category', CategorySchema);



module.exports = category;
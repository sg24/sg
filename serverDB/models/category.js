const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CategorySchema = new Schema({
    post: {
        type: Array,
        default: [String]
    },
    question: {
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
    },
    group: {
        type: Array,
        default: [String]
    },
    advert: {
        type: Array,
        default: [String]
    }
})

const category = mongoose.model('category', CategorySchema);



module.exports = category;
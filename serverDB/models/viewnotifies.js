const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    post: {
        type: Number,
        default: 0
    },
    question: {
        type: Number,
        default: 0
    },
    poet: {
        type: Number,
        default: 0
    },
    grp: {
        type: Number,
        default: 0
    },
})

const viewnotifies = mongoose.model('viewnotifies', NotificationsSchema);



module.exports = viewnotifies;
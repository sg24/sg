const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String
    },
    notifications: {
        type: Number
    },
    postID: [{
        type: String
    }]
})

const postnotifies = mongoose.model('postnotifies', NotificationsSchema);



module.exports = postnotifies;
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String
    },
    notifications: {
        type: Number
    }
})

const postnotifies = mongoose.model('postnotifies', NotificationsSchema);



module.exports = postnotifies;
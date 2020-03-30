const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String
    },
    notifications: {
        type: Number
    },
    member: [{
        type: String
    }]
})

const chatnotifies = mongoose.model('chatnotifies', NotificationsSchema);



module.exports = chatnotifies;
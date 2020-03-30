const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String
    },
    member: [{
        ID: String,
        notifications: {
            type: Number
        }
    }]
})

const chatnotifies = mongoose.model('chatnotifies', NotificationsSchema);



module.exports = chatnotifies;
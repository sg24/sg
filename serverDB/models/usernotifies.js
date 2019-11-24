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

const usernotifies = mongoose.model('usernotifies', NotificationsSchema);



module.exports = usernotifies;
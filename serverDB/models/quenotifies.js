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

const quenotifies = mongoose.model('quenotifies', NotificationsSchema);



module.exports = quenotifies;
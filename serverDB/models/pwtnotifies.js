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

const pwtnotifies = mongoose.model('pwtnotifies', NotificationsSchema);



module.exports = pwtnotifies;
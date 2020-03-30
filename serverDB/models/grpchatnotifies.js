const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String
    },
    grp: [{
        ID: String,
        notifications: {
            type: Number,
            default: 0
        },
    }],
})

const grpchatnotifies = mongoose.model('grpchatnotifies', NotificationsSchema);

module.exports = grpchatnotifies;
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const NotificationsSchema = new Schema({
    userID: {
        type: String
    },
    notifications: {
        type: Number
    },
    group: [{
        ID: {
            type: String
        },
        edit:{
            type: Boolean,
            default: false
        },
        view: {
            type: Boolean,
            default: false
        },
        request: {
            type: Number,
            default: 0
        },
        isMember: {
            type: Boolean,
            default: false
        }
    }]
})

const grpnotifies = mongoose.model('grpnotifies', NotificationsSchema);



module.exports = grpnotifies;
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const defaultContentSchema = {
    userID: {
        type: String
    },
    cntID: [String]
};

const NotificationsSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    post: [{
        ...defaultContentSchema
    }],
    question: [{
        ...defaultContentSchema
    }],
    poet: [{
        ...defaultContentSchema
    }],
    aroundme: [{
        ...defaultContentSchema
    }],
    cbt: [{
        ...defaultContentSchema
    }],
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
    }],
    chat: [{
        ...defaultContentSchema
    }],
    userRequest: [{
        userID: String
    }],
    userAccept: [{
        userID: String
    }],
    userReject: [{
        userID: String
    }],
    userUnfriend: [{
        userID: String
    }],
    pageInvite: [{
        ...defaultContentSchema
    }],
    pageGroupAdded: [{
        ...defaultContentSchema
    }],
    profileImage: [{
        userID: String
    }],
    profileName: [{
        userID: String
    }],
    advert: [{
        ...defaultContentSchema
    }]
})

const notifications = mongoose.model('notifications', NotificationsSchema);



module.exports = notifications;
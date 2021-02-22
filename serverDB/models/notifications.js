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
    writeup: [{
        ...defaultContentSchema
    }],
    feed: [{
        ...defaultContentSchema
    }],
    createGroup: [{
        ...defaultContentSchema
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
    }],
    qchat: [{
        ...defaultContentSchema
    }]
})

const notifications = mongoose.model('notifications', NotificationsSchema);



module.exports = notifications;
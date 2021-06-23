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
    postShare: [{
        ...defaultContentSchema
    }],
    question: [{
        ...defaultContentSchema
    }],
    questionShare: [{
        ...defaultContentSchema
    }],
    writeup: [{
        ...defaultContentSchema
    }],
    writeupShare: [{
        ...defaultContentSchema
    }],
    feed: [{
        ...defaultContentSchema
    }],
    feedShare: [{
        ...defaultContentSchema
    }],
    createGroup: [{
        ...defaultContentSchema
    }],
    groupShare: [{
        ...defaultContentSchema
    }],
    groupJoin: [{
        ...defaultContentSchema
    }],
    groupRequest: [{
        ...defaultContentSchema
    }],
    groupAccept: [{
        ...defaultContentSchema
    }],
    groupReject: [{
        ...defaultContentSchema
    }],
    groupPending: [{
        ...defaultContentSchema
    }],
    groupMark: [{
        ...defaultContentSchema
    }],
    groupUserRemove: [{
        ...defaultContentSchema
    }],
    groupPost: [{
        ...defaultContentSchema
    }],
    groupPostShare: [{
        ...defaultContentSchema
    }],
    groupQuestion: [{
        ...defaultContentSchema
    }],
    groupQuestionShare: [{
        ...defaultContentSchema
    }],
    groupFeed: [{
        ...defaultContentSchema
    }],
    groupFeedShare: [{
        ...defaultContentSchema
    }],
    groupWriteup: [{
        ...defaultContentSchema
    }],
    groupWriteupShare: [{
        ...defaultContentSchema
    }],
    groupCbt: [{
        ...defaultContentSchema
    }],
    groupCbtShare: [{
        ...defaultContentSchema
    }],
    groupCbtRequest: [{
        ...defaultContentSchema
    }],
    groupCbtAccept: [{
        ...defaultContentSchema
    }],
    groupCbtReject: [{
        ...defaultContentSchema
    }],
    groupCbtMark: [{
        ...defaultContentSchema
    }],
    groupCbtResult: [{
        ...defaultContentSchema
    }],
    chatRoomRequest: [{
        ...defaultContentSchema
    }],
    chatRoomJoin: [{
        ...defaultContentSchema
    }],
    chatRoomAccept: [{
        ...defaultContentSchema
    }],
    chatRoomReject: [{
        ...defaultContentSchema
    }],
    chatRoomPending: [{
        ...defaultContentSchema
    }],
    chatRoomMark: [{
        ...defaultContentSchema
    }],
    userChat: [{
        ...defaultContentSchema,
        counter: {
            type: Number,
            required: true
        }
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
    }],
    qchatShare: [{
        ...defaultContentSchema
    }],
    qchatRequest: [{
        ...defaultContentSchema
    }],
    qchatAccept: [{
        ...defaultContentSchema
    }],
    qchatReject: [{
        ...defaultContentSchema
    }],
    qchatMark: [{
        ...defaultContentSchema
    }],
    qchatResult: [{
        ...defaultContentSchema
    }],
})

const notifications = mongoose.model('notifications', NotificationsSchema);



module.exports = notifications;
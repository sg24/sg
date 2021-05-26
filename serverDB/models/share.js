const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const defaultContentSchema = {
    ID: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    cntID: {
        type: ObjectId,
        required: true
    }
};

const SharesSchema = new Schema({
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
    group: [{
        ...defaultContentSchema
    }],
    grouppost: [{
        ...defaultContentSchema
    }],
    qchat: [{
        ...defaultContentSchema
    }]
})

const shares = mongoose.model('shares', SharesSchema);

module.exports = shares;
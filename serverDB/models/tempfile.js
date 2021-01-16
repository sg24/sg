const mongoose = require('mongoose');

var tempFileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    tempFiles: [{
        id: {
            type: String,
            required: true
        },
        page: {
            type: String,
            required: true
        },
        check: {
            type: Boolean,
            default: false
        },
        files: [{
            type: String
        }],
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }]
}) ;


var tempFile = mongoose.model('tempFile', tempFileSchema);


module.exports = tempFile;
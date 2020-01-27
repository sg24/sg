const mongoose = require('mongoose');

var tempFileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    files: [{
        type: String
    }]
}) ;


var tempFile = mongoose.model('tempFile', tempFileSchema);


module.exports = tempFile;
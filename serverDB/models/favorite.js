const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const FavoriteSchema = new Schema({
    userID: {
        type: String
    },
    postID: [{
        type: String
    }],
    queID: [{
        type: String
    }],
    pwtID: [{
        type: String
    }]
})

const favorite = mongoose.model('favorite', FavoriteSchema);



module.exports = favorite;
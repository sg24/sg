const mongoose = require('mongoose');
const validator = require('validator'); 

var authUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    googleID: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}) ;

var authUser = mongoose.model('authUsers', authUserSchema);


module.exports = authUser
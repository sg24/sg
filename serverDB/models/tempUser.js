const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var tempUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    expiresIn: {
        type: String,
        default: Date.now
    }
}) ;


var tempUser = mongoose.model('tempUser', tempUserSchema);


module.exports = tempUser;
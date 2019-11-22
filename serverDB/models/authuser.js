const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');

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
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}) ;

authUserSchema.methods.generateAuthToken = function generateAuthToken() {
    return new Promise((resolve, reject) => {
     let authUser = this;
     let access = 'authentication';
     let token = jwt.sign({_id: authUser._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600}).toString();
     authUser.tokens.push({access, token});
     authUser.save().then(() => {
         resolve(token);
     });
    })
 };

authUserSchema.statics.findByToken = function findByToken (token) {
    let authUser = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject()
    }
   return authUser.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'authentication'
   })
};

let authUser = mongoose.model('authUsers', authUserSchema);

module.exports = authUser
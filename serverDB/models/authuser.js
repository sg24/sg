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
    comment:{
        type: Number,
        default: 0
    },
    subjectpost: {
        type: Array,
        default: [String]
    },
    subjectque: {
        type: Array,
        default: [String]
    },
    subjectpoet: {
        type: Array,
        default: [String]
    },
    student: {
        type: Array,
        default: [String]
    },
    teacher: {
        type: Array,
        default: [String]
    },
    status: {
        type: Boolean,
        default: false
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
     let token = jwt.sign({_id: authUser._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 60*60*24*7}).toString();
     authUser.tokens.push({access, token});
     authUser.save().then(() => {
         resolve(token);
     });
    })
 };

 authUserSchema.statics.updateAuthToken = function updateAuthToken(userID) {
    return new Promise((resolve, reject) => {
        let authUser = this;
        let access = 'authentication';
        let newToken = jwt.sign({_id: userID, access}, process.env.JWT_SECRET, { expiresIn: 3600*24*7}).toString();
        let tokens = [{access, token: newToken}];
        authUser.findByIdAndUpdate(userID, { tokens}).then((res) =>{
            resolve(newToken);
        }).catch(err =>{
            reject('Error');
        })
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
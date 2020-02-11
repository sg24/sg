const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const webpush = require('web-push');

var authUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    googleID: {
        type: String
    },
    facebookID: {
        type: String
    },
    temp: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
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
    student: [{
        type: String
    }],
    studenttotal: {
        type: Number,
        default: 0
    }, 
    teacher: [{
        type: String
    }],
    request: [{
        type: String
    }],
    block: [{
        type: String
    }],
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
    }],
    pushMsg: [{
        publickey: {
            type: String
        },
        privatekey: {
            type: String
        }
    }],
    subscription: {
        type: Array
    },
    enableNotification: {
        type: Boolean,
        default: false
    },
    statustoken: {
        type: String
    },
    about: {
        type: String
    },
    offline: {
        type: Date
    },
    postpub: {
        type:Number,
        default: 0
    },
    quepub: {
        type:Number,
        default: 0
    },
    pwtpub: {
        type:Number,
        default: 0
    },
    groups: {
        type:Number,
        default: 0
    }
}) ;

authUserSchema.methods.generateAuthToken = function generateAuthToken() {
    return new Promise((resolve, reject) => {
     let authUser = this;
     const vapidKeys = webpush.generateVAPIDKeys();
     let access = 'authentication';
     let token = jwt.sign({_id: authUser._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 60*60*24*7*4*3}).toString();
     authUser.tokens.push({access, token});
     authUser.pushMsg.push({publickey: vapidKeys.publicKey, privatekey: vapidKeys.privateKey});
     authUser.offline = Date.now()
     authUser.save().then(res => {
         resolve({token, pushMsg: res.pushMsg[0].publickey, id: res._id.toHexString()});
     });
    })
 };

 authUserSchema.statics.updateAuthToken = function updateAuthToken(userID) {
    return new Promise((resolve, reject) => {
        let authUser = this;
        let access = 'authentication';
        let newToken = jwt.sign({_id: userID, access}, process.env.JWT_SECRET, { expiresIn: 3600*24*7*4*3}).toString();
        let tokens = [{access, token: newToken}];
        authUser.findByIdAndUpdate(userID, { tokens, offline: Date.now()}).then((res) =>{
            resolve({token: newToken, pushMsg: res.pushMsg[0].publickey, id: res._id.toHexString()});
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
        return Promise.reject(e)
    }
   return authUser.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'authentication'
   })
};

authUserSchema.index({username: 'text'});
let authUser = mongoose.model('authUsers', authUserSchema);

module.exports = authUser
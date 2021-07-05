const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const webpush = require('web-push');
const uuid  = require('uuid/v4');
const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
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
    image: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now,
        index: true 
    },
    request: [{
        type: String
    }],
    block: [{
        type: String
    }],
    // status: {
    //     type: Boolean,
    //     default: false
    // },
    tokens: [{
        access: {
            type: String,
            required: true
            },
        token: {
            type: String,
            required: true
        },
        expiresIn: {
            type: String,
            required: true
        },
        deviceID: {
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
    deviceInfo: [
    ],
    enableNotification: {
        type: Boolean,
        default: false
    },
    // statustoken: {
    //     type: String
    // },
    visited: {
        type: Date
    },
    about: {
        type: String
    },
    pendingRequest: [{
        type: String
    }],
    friend: [{
        type: String
    }],
    chat: [{
        _id: {
            type: ObjectId,
            required: true
        },
        authorID: {
            type: ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        userImage: {
            type: String
        },
        content: {
            type: String,
            trim: true
        },
        media: [{
            id: ObjectId, 
            filename: String, 
            bucket: String,
            ext: String, 
            description: String
        }],
        created: { 
            type: Date, 
            default: Date.now,
            index: true 
        },
        shared: {
            type: String
        }
    }]
}) ;

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return {id: userObject._id, email:  userObject.email}
}

UserSchema.methods.generateAuthToken = function generateAuthToken(userAgent, deviceID) {
    return new Promise((resolve, reject) => {
        let User = this;
        const vapidKeys = webpush.generateVAPIDKeys();
        let access = 'authentication';
        let token = jwt.sign({_id: User._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600*24*7*4}).toString();
        User.tokens.push({access, token, expiresIn: Date.now() + (1000 * 3600 * 24 * 7 * 4), deviceID});
        User.visited = Date.now()
        let deviceInfo = {} 
        for (let ua in userAgent) {
            if (userAgent[ua]) {
                if (ua === 'geoIp' && Object.entries(userAgent[ua]).length === 0) {}
                else {}
            }
        }
        User.deviceInfo.push(deviceInfo)
        User.pushMsg.push({publickey: vapidKeys.publicKey, privatekey: vapidKeys.privateKey})
        User.save().then(res => {
            resolve({token, pushMsg: res.pushMsg[0].publickey, id: res._id.toHexString()});
        });
       })
};

UserSchema.statics.findByToken = function findByToken (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject(e)
    }

  return User.findOneAndUpdate({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'authentication'
   }, {visited: Date.now()})
};

UserSchema.statics.findByCredentials = function findByCredentials(email, password, userAgent, deviceID) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject('Check your Email and Password');
        };

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res ) => {
                if (res) {
                    let access = 'authentication';
                    let deviceInfo = {};
                    let uniqueID = uuid();
                    let newToken = null;
                    for (let ua in userAgent) {
                        if (userAgent[ua]) {
                            if (ua === 'geoIp' && Object.entries(userAgent[ua]).length === 0) {}
                            else {
                                deviceInfo[ua] = userAgent[ua]
                            }
                        }
                    }
                    user.deviceInfo.push(deviceInfo);
                    deviceInfo = user.deviceInfo;
                    let deviceFndIndex = user.tokens.findIndex(alltoken => alltoken.deviceID === deviceID);
                    if (deviceFndIndex !== -1) {
                        newToken = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600 * 24* 7 * 4}).toString();
                        user.tokens[deviceFndIndex].token = newToken;
                        user.tokens[deviceFndIndex].expiresIn = Date.now() + (1000 * 3600 * 24 * 7 * 4);
                        uniqueID = deviceID;
                    } else {
                        newToken = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600 * 24* 7 * 4}).toString();
                        let tokens = {access, token: newToken, expiresIn: Date.now() + (1000 * 3600 * 24 * 7 * 4), deviceID: uniqueID};
                        user.tokens.push(tokens)
                    }
                    let updateTokens = user.tokens.filter(allToken => allToken.expiresIn > Date.now())
                  User.findByIdAndUpdate(user._id, { tokens: updateTokens, visited: Date.now(), deviceInfo}).then((res) =>{
                    resolve({token: newToken, uniqueID, pushMsg: res.pushMsg[0].publickey, id: res._id.toHexString(), username: res.username, image: res.image});
                  }).catch(err =>{
                    reject('Error');
                  })
                } else {
                    reject('Check your Email and Password');
                }
                
            });
        })
    })
};
 
UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    })
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
               user.password = hash;
               next();
            });
        });
    } else {
        next()
    }
});

UserSchema.index({username: 'text'});
let user = mongoose.model('Users', UserSchema);


module.exports = user
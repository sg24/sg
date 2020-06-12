const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const webpush = require('web-push');

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
        default: Date.now
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
    offline: {
        type: Date
    },
    about: {
        type: String
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
    },
    advert: {
        type:Number,
        default: 0
    },
    contest: {
        type:Number,
        default: 0
    },
    aroundme: {
        type:Number,
        default: 0
    },
    qchat: {
        type:Number,
        default: 0
    }
}) ;

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return {id: userObject._id, email:  userObject.email}
}

UserSchema.methods.generateAuthToken = function generateAuthToken() {
    return new Promise((resolve, reject) => {
        let User = this;
        const vapidKeys = webpush.generateVAPIDKeys();
        let access = 'authentication';
        let token = jwt.sign({_id: User._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600*24*7*4*3}).toString();
        User.tokens.push({access, token});
        User.offline = Date.now()
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

   return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'authentication'
   })
};

UserSchema.statics.findByCredentials = function findByCredentials(email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject('No User found');
        };

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res ) => {
                if (res) {
                    let access = 'authentication';
                    let newToken = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600 * 24* 7 * 4 * 3}).toString();
                    let tokens = [{access, token: newToken}];
                  User.findByIdAndUpdate(user._id, { tokens, offline: Date.now()}).then((res) =>{
                    resolve({token: newToken, pushMsg: res.pushMsg[0].publickey, id: res._id.toHexString()});
                  }).catch(err =>{
                    reject('Error');
                  })
                } else {
                    reject('Password Incorrect');
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
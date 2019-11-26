const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return {id: userObject._id, email:  userObject.email}
}

UserSchema.methods.generateAuthToken = function generateAuthToken() {
    return new Promise((resolve, reject) => {
        let User = this;
        let access = 'authentication';
        let token = jwt.sign({_id: User._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600}).toString();
        User.tokens.push({access, token});
        User.save().then(() => {
            resolve(token);
        });
       })
};

UserSchema.statics.findByToken = function findByToken (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject()
    }

   return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'authentication'
   })
};

UserSchema.statics.findByCredentials = function findByCredentials(username, password) {
    var User = this;

    return User.findOne({username}).then((user) => {
        if (!user) {
            return Promise.reject('No User found');
        };

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res ) => {
                if (res) {
                    let access = 'authentication';
                    let newToken = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: 3600 * 24* 7}).toString();
                    let tokens = [{access, token: newToken}];
                  User.findByIdAndUpdate(user._id, { tokens}).then((res) =>{
                    resolve(newToken);
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

let user = mongoose.model('Users', UserSchema);


module.exports = user
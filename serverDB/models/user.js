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
    }
}) ;

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return {id: userObject._id, email:  userObject.email}
}

UserSchema.methods.generateAuthToken = function generateAuthToken() {
    var user = this;
    var access = 'authentication';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});
    return user.save().then((res) => {
        return token;
    });
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

UserSchema.statics.findByCredentials = function findByCredentials(email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject({message: 'No User found'});
        };

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res ) => {
                if (res) {
                    resolve(user);
                } else {
                    reject({message: 'Password Incorrect'});
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

var User = mongoose.model('Users', UserSchema);


module.exports = User
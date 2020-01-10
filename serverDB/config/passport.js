const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { authUser, user } = require('../serverDB');

module.exports = {
    auth: function(passport) {
        passport.use(new GoogleStrategy({
            clientID: process.env.googleClientID,
            clientSecret: process.env.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
          },
           (accessToken, refreshToken, profile, done) => {
            const image = profile.photos[0].value;
            let newUser = new authUser ({
                googleID: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                image
            })
            if (profile.emails) {
                let emails = [];
                for(let email of profile.emails) {
                    emails.push(email.value);
                }
                user.findOne({email: {$in: emails}}).then(result => {
                    if (result) {
                        done(null, false, {message: 'Email already taken'});
                    } else {
                        authUser.findOne({googleID: profile.id}).then(result => {
                            if (!result) {
                                newUser.generateAuthToken().then(token => {
                                    done(null, token)
                                });
                            } else {
                                authUser.updateAuthToken(result._id).then(token =>{
                                    done(null, token)
                                })
                            }
                            
                        })
                    }
                })
            }
          }
        ));
    },
    authFacebook: function(passport) {
        passport.use(new FacebookStrategy({
            clientID: process.env.facebookClientID,
            clientSecret: process.env.facebookClientSecret,
            callbackURL: "/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email'],
            proxy: true
          },
          (accessToken, refreshToken, profile, done) => {
            const image = profile.photos[0].value;
            let newUser = new authUser ({
                facebookID: profile.id,
                username: profile.displayName,
                image
            })
            authUser.findOne({facebookID: profile.id}).then(result => {
                if (!result) {
                    newUser.generateAuthToken().then(token => {
                        done(null, token)
                    });
                } else {
                    authUser.updateAuthToken(result._id).then(token =>{
                        done(null, token)
                    })
                }
                
            })
          }
        ));
    }
}
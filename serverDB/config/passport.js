const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { authUser } = require('../serverDB');

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
            authUser.findOne({googleID: profile.id}).then(result => {
                if (!result) {
                    newUser.generateAuthToken().then(token => {
                        done(null, token)
                    });
                } else {
                    let token = result.tokens[0].token;
                    done(null, token)
                }
                
            })
          }
        ));
    }
}
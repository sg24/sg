const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { authUser } = require('../../serverDB/serverDB');

module.exports = function(passport) {
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

        authUser.findOne({googleID: profile.id}).then(user => {
            if (!user) {
                newUser.save().then(user => done(null, user))
            } else {
                done(null, user)
            }
            
        })
      }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        authUser.findById(id).then(user => done(null, user))
    })
}
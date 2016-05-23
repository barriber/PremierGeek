const passport = require('passport');
const fbConfig = require('../fb');
const Strategy = require('passport-facebook').Strategy;
const User = require('../models/UserSchema').User;

module.exports = function(passport) {
    passport.use('facebook', new Strategy({
            clientID: fbConfig.appID,
            clientSecret: fbConfig.appSecret,
            callbackURL: fbConfig.callbackUrl,
            profileFields: ['id', 'emails', 'name', 'picture.type(large)']
        },

        // facebook will send back the tokens and profile
        function (access_token, refresh_token, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id
                User.findOne({'userId': profile.id}, function (err, user) {
                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.userId = profile.id;
                        newUser.provider = 'facebook';
                        newUser.imageUrl = profile.photos[0].value;
                        newUser.provider = profile.provider;// set the users facebook id
                        newUser.access_token = access_token; // we will save the token that facebook provides to the user
                        newUser.firstName = profile.name.givenName;
                        newUser.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function (err, x) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
}
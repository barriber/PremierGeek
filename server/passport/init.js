const facebook = require('./fbLogin');
const User = require('../models/UserSchema').User;

module.exports = function(passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user.userId);
    });

    passport.deserializeUser(function(id, done) {
        User.findById('573b772b19f323e010ecea5f', function(err, user) {
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Facebook and Twitter
    facebook(passport);
};
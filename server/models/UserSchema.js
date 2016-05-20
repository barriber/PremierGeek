const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        userId: String,
        access_token: String,
        lastName: String,
        firstName: String,
        email: String,
        logo: String
});

const User = mongoose.model('User', userSchema);

exports.User = User;
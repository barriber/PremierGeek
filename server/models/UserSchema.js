const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        userId: String,
        provider: String,
        access_token: String,
        lastName: String,
        firstName: String,
        email: String,
        imageUrl: String
});

const User = mongoose.model('User', userSchema);

exports.User = User;
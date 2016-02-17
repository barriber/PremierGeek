var mongoose = require('mongoose');

var TeamSchema = {
    name: String,
    id: String
};

var Team = mongoose.model('TeamSchema', TeamSchema, 'teams');

module.exports = Team;
var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String,
    logo: String
});

var Team = mongoose.model('Team', teamSchema);

exports.Team = Team;
exports.teamSchema = teamSchema
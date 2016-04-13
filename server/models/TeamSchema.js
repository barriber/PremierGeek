var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: String,
    logo: String
});

var Team = mongoose.model('Team', teamSchema);

exports.Team = Team;
exports.teamSchema = teamSchema
var teamSchema = require('./TeamSchema').teamSchema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NextRoundSchema = new Schema({
    roundNumber: Number,
    startTime: Date
});

var leagueSchema = new Schema({
    name: String,
    country: String,
    numberOfTeams: Number,
    nextRound: NextRoundSchema,
    lastUpdated: Date,
    football_data_id: Number
});

var League = mongoose.model('League', leagueSchema);

module.exports = League;
var mongoose = require('mongoose');


var matchSchema = new Schema({
    homeTeamId: Number,
    awayTeamId: Number,
    homeTeamName: String,
    awayTeamName: String,
    homeTeamPosition: Number,
    awayTeamPosition: Number,
    homeTeamPoints: Number,
    awayTeamPoints: Number,
    leagueId: Number,
    homeTeamScore: Number,
    awayTeamScore: Number,
    roundNumber: Number,
    seasonYear: Number,
    date: Date,
    played: Boolean
});

var Match = mongoose.model('League', matchSchema);

module.exports = Match;
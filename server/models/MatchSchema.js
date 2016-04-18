var mongoose = require('mongoose');


var matchSchema = new mongoose.Schema({
    homeTeamId: Number,
    awayTeamId: Number,
    homeTeamName: String,
    awayTeamName: String,
    homeTeamPosition: Number,
    awayTeamPosition: Number,
    homeTeamPoints: Number,
    awayTeamPoints: Number,
    leagueId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'League' }],
    homeTeamScore: Number,
    awayTeamScore: Number,
    roundNumber: Number,
    seasonYear: Number,
    date: Date,
    played: Boolean
});

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;
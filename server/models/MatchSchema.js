var mongoose = require('mongoose');


var matchSchema = new mongoose.Schema({
    homeTeamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    awayTeamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    homeTeamPosition: Number,
    awayTeamPosition: Number,
    homeTeamPoints: Number,
    awayTeamPoints: Number,
    leagueId: [{type: mongoose.Schema.Types.ObjectId, ref: 'League'}],
    roundNumber: Number,
    seasonYear: Number,
    date: {type: Date, default: Date.now},
    odds: [],
    results: {
        sideResult: '',
        homeScore: Number,
        awayScore: Number
    },
    played: Boolean
});

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;
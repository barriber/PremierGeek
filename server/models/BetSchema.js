const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    matchId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    updateTime: {type: Date, default: Date.now},
    bet: {
        betSide: Number, //Draw - 0 HomeTeam - 1 awayTeam - 2
        homeTeamScore: Number,
        awayTeamScore: Number
    }
});

var Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
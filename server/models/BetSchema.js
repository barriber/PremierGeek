const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    matchId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    bet: Number //Draw - 0 HomeTeam - 1 awayTeam - 2
});

var Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
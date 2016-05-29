const _ = require('lodash');
const Bet = require('../models/BetSchema');

module.exports = function(app) {
    app.route('/api/bet').post(function(req, res) {
        _.forEach(req.body, (bet) => {
            Bet.update({matchId: bet.matchId, userId: req.user.id}, bet , {upsert: true}, (err) => {
               if(err) {
                   res(500, 'No Bet persist')
               }
            });
        });

        res.send(true);
    });
};
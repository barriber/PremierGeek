var League = require('../models/LeagueSchema');
var moment = require('moment');

exports.createLeague = function (obj, country) {
    var entry = new League({
        name: obj.caption,
        country: country,
        numberOfTeams: obj.numberOfTeams,
        Teams: [],
        nextRound: {
            roundNumber: 0,
            startTime: moment().format()
        },
        football_data_id: obj.id
    });

    entry.save()
}
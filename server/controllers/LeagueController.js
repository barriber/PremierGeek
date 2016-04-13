var League = require('../models/LeagueSchema');

exports.createLeague = function (obj, country) {
    var entry = new League({
        name: obj.caption,
        country: country,
        numberOfTeams: obj.numberOfTeams,
        Teams: [],
        nextRound: {},
        lastUpdated: obj.lastUpdated
    });

    entry.save()
}
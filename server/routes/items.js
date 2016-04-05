require('isomorphic-fetch');
var _ = require('lodash');

var removeTeamNameOverHead = function(teamName) {
    var removedAfc = _.replace(teamName, 'AFC', '');
    return _.replace(removedAfc, 'FC', '');
}

var generateNextRoundObj = function(allGames) {
    var id = 0;
    var unplayedMatches = _.chain(allGames).groupBy('status').get('TIMED').groupBy('matchday').value();
    var nextRoundNumber = _.findKey(unplayedMatches, function(matchDay) {
        return matchDay.length === 10; //TODO Assume there are 10 games per league, need to be changed for Multiple leagues
    });

    var nexRoundFixtures = _.map(unplayedMatches[nextRoundNumber], fixtureObj => {
        return {
            id: ++id,
            homeTeam: removeTeamNameOverHead(fixtureObj.homeTeamName),
            awayTeam: removeTeamNameOverHead(fixtureObj.awayTeamName),
            date: fixtureObj.date,
            bet: 'x'
        }
    });
    
    return {
        fixtures: nexRoundFixtures,
        roundNumber: nextRoundNumber,
    }
}
module.exports = function (app) {
    app.route('/api/nextRound').get(function (req, res) {
        fetch('http://api.football-data.org/v1/soccerseasons/398/fixtures', {
            headers: { 'X-Auth-Token': '5aab4c2c6c8a4af188e5be626459fb78'},
        }).then(response => response.json())
            .then(json => {
                res.send(generateNextRoundObj(json.fixtures));
            })
    })
};
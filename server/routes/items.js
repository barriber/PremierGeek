require('isomorphic-fetch');
var _ = require('lodash');
var globals = require('../globals');
var leagueCtrl = require('../controllers/LeagueController');

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
        var leagueId = 398;
        // fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId + '/fixtures', {
        //     headers: { 'X-Auth-Token': globals.FOOTBALL_DATA_USER},
        // }).then(response => response.json())
        //     .then(json => {
        //         res.send(generateNextRoundObj(json.fixtures));
        //     })
        fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId, {
            headers: { 'X-Auth-Token': globals.FOOTBALL_DATA_USER},
        }).then(response => response.json())
            .then(json => {
                leagueCtrl.createLeague(json, 'england');
            });
    })
};
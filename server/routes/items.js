require('isomorphic-fetch');
var _ = require('lodash');
var globals = require('../globals');
var leagueCtrl = require('../controllers/LeagueController');
var League = require('../models/LeagueSchema');
var Match = require('../models/MatchSchema');
var moment = require('moment');

var removeTeamNameOverHead = function (teamName) {
    var removedAfc = _.replace(teamName, 'AFC', '');
    return _.replace(removedAfc, 'FC', '');
};

var getNextRoundLastBidTime = function (fixtures) {
    var firstMatch = _.minBy(fixtures, 'date');

    return moment(firstMatch.date).subtract(30, 'minutes').format();
}

var generateNextRoundObj = function (league) {
    var leagueId = league.football_data_id;

    var getLeagueFixtures = function (leagueId) {
        return fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId + '/fixtures', {
            headers: {'X-Auth-Token': globals.FOOTBALL_DATA_USER},
        }).then(response => response.json()).then(json => {
            var allGames = json.fixtures;
            var fixturesPerRound = league.numberOfTeams / 2;
            var unplayedMatches = _.chain(allGames).groupBy('status').get('TIMED').groupBy('matchday').value();
            var nextRoundNumber = _.findKey(unplayedMatches, function (matchDay) {
                return matchDay.length === fixturesPerRound;
            });

            return {
                nextRoundNumber: nextRoundNumber,
                fixtures: unplayedMatches[nextRoundNumber]
            };
        });
    };
    var getLeagueTable = function (leagueId) {
        return fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId + '/leagueTable', {
            headers: {'X-Auth-Token': globals.FOOTBALL_DATA_USER},
        }).then(response => response.json())
    };

    return Promise.all([getLeagueFixtures(leagueId), getLeagueTable(leagueId)]).then(function (result) {
        var nextRoundObj = result[0];
        var leagueTableObj = result[1].standing;

        var upcomingFixtures = _.map(nextRoundObj.fixtures, (fixture) => {
            var awayTeamPosion = _.find(leagueTableObj, {teamName: fixture.awayTeamName});
            var homeTeamPosion = _.find(leagueTableObj, {teamName: fixture.homeTeamName});

            return {
                homeTeamId: null,
                awayTeamId: null,
                homeTeamName: removeTeamNameOverHead(fixture.homeTeamName),
                awayTeamName: removeTeamNameOverHead(fixture.awayTeamName),
                homeTeamPosition: homeTeamPosion.position,
                awayTeamPosition: awayTeamPosion.position,
                homeTeamPoints: homeTeamPosion.points,
                awayTeamPoints: awayTeamPosion.points,
                leagueId: leagueId,
                homeTeamScore: -1,
                awayTeamScore: -1,
                roundNumber: fixture.matchday,
                seasonYear: 2015, //Fixme setgeneric number
                date: fixture.date,
                played: false
            }
        });
        var lastBidTime = getNextRoundLastBidTime(nextRoundObj.fixtures);
        league.nextRound = {
            roundNumber: nextRoundObj.nextRoundNumber,
            startTime: lastBidTime
        }

        Match.collection.insert(upcomingFixtures)
        league.save();

        return upcomingFixtures;
    });

    // return _.map(unplayedMatches[nextRoundNumber], fixtureObj => {
    //     return {
    //         id: ++id,
    //         homeTeam: removeTeamNameOverHead(fixtureObj.homeTeamName),
    //         awayTeam: removeTeamNameOverHead(fixtureObj.awayTeamName),
    //         date: fixtureObj.date,
    //         bet: 'x'
    //     }
    // });
}

var getNextRound = function (leagueId) {
    League.findOne({'football_data_id': leagueId}).then(function (league) {
        var now = moment().format();
        if (moment(now).isSameOrAfter(league.nextRound.startTime)) {
            generateNextRoundObj(league).then(function (result) {
                console.log(result)
            })
        }

        if (_.isUndefined(league.nextRound.roundNumber)) {
            var x = generateNextRoundObj(league).then(function (x) {
                console.log(x);
            });

        }
    })
}

module.exports = function (app) {
    app.route('/api/nextRound').get(function (req, res) {
        var leagueId = 398;
        getNextRound(leagueId);

    })

};


// var leagueId = 398;
// fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId + '/fixtures', {
//     headers: { 'X-Auth-Token': globals.FOOTBALL_DATA_USER},
// }).then(response => response.json())
//     .then(json => {
//         res.send(generateNextRoundObj(json.fixtures));
//     })
// })

// fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId, {
//     headers: { 'X-Auth-Token': globals.FOOTBALL_DATA_USER},
// }).then(response => response.json())
//     .then(json => {
//         leagueCtrl.createLeague(json, 'england');
//     });

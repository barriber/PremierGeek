'use strict';
require('isomorphic-fetch');
var _ = require('lodash');
var globals = require('../globals');
var leagueCtrl = require('../controllers/LeagueController');
var League = require('../models/LeagueSchema');
var Match = require('../models/MatchSchema');
var Team = require('../models/TeamSchema').Team;
var moment = require('moment');

var removeTeamNameOverHead = function (teamName) {
    var removedAfc = _.replace(teamName, 'AFC', '');
    return _.replace(removedAfc, 'FC', '');
};

var getNextRoundLastBidTime = function (fixtures) {
    var firstMatch = _.minBy(fixtures, 'date');

    return moment(firstMatch.date).subtract(30, 'minutes').format();
};

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
        }).then(response => response.json());
    };

    var verifyTeams = function (leagueId) {
        return fetch('http://api.football-data.org/v1/soccerseasons/' + leagueId + '/teams', {
            headers: {'X-Auth-Token': globals.FOOTBALL_DATA_USER},
        }).then((response => response.json())).then(function (result) {
            var x = _.map(result.teams, function (team) {
                var fixedTeamName = removeTeamNameOverHead(team.name);

                return Team.findOneAndUpdate({name: fixedTeamName}, {
                    name: fixedTeamName,
                    logo: team.crestUrl
                }, {upsert: true});
            });

            return Promise.all(x);
        });
    };

    return Promise.all([getLeagueFixtures(leagueId), getLeagueTable(leagueId), verifyTeams(leagueId)]).then(function (result) {
        var nextRoundObj = result[0];
        var leagueTableObj = result[1].standing;

        var upcomingFixtures = _.map(nextRoundObj.fixtures, (fixture) => {
            var homeTeamPosion = _.find(leagueTableObj, {teamName: fixture.homeTeamName});
            var awayTeamPosion = _.find(leagueTableObj, {teamName: fixture.awayTeamName});
            return Promise.all([Team.findOne({name: removeTeamNameOverHead(fixture.homeTeamName)}),
                Team.findOne({name: removeTeamNameOverHead(fixture.awayTeamName)})]).then(function (teams) {
                return {
                    homeTeamId: teams[0]._id,
                    awayTeamId: teams[1]._id,
                    homeTeamPosition: homeTeamPosion.position,
                    awayTeamPosition: awayTeamPosion.position,
                    homeTeamPoints: homeTeamPosion.points,
                    awayTeamPoints: awayTeamPosion.points,
                    leagueId: league._id,
                    homeTeamScore: -1,
                    awayTeamScore: -1,
                    roundNumber: fixture.matchday,
                    seasonYear: 2015, //Fixme setgeneric number
                    date: fixture.date,
                    played: false
                }
            });

        });

        return Promise.all(upcomingFixtures).then(function (fixtures) {
            var lastBidTime = getNextRoundLastBidTime(nextRoundObj.fixtures);
            league.nextRound = {
                roundNumber: nextRoundObj.nextRoundNumber,
                startTime: lastBidTime
            };

            Match.collection.insert(fixtures);
            league.save();

            return fixtures;
        });
    });
};

var getNextRound = function (leagueId) {
    return League.findOne({'football_data_id': leagueId}).then(function (league) {
        return (moment(moment().format()).isSameOrAfter(league.nextRound.startTime)) ?
            generateNextRoundObj(league) :
            Match.find({
                seasonYear: 2015,
                leagueId: league._id,
                roundNumber: league.nextRound.roundNumber
            }).lean();
    })
};

module.exports = function (app) {
    app.route('/api/nextRound').get(isLoggedIn, function (req, res) {
        var leagueId = 398;
        getNextRound(leagueId).then(function (upcomingFixtures) {
            Match.populate(upcomingFixtures, 'homeTeamId awayTeamId').then(function (populatedFixtures) {
                var fixtures = _.map(populatedFixtures, function (fixture) {
                    var homeTeam = fixture.homeTeamId.toObject();
                    var awayTeam = fixture.awayTeamId.toObject();
                    return {
                        id: fixture._id,
                        homeTeam: homeTeam,
                        awayTeam: awayTeam,
                        homeTeamPoints: fixture.homeTeamPoints,
                        awayTeamPoints: fixture.awayTeamPoints,
                        homeTeamPosition: fixture.homeTeamPosition,
                        awayTeamPosition: fixture.awayTeamPosition,
                        roundNumber: fixture.roundNumber,
                        date: fixture.date,
                        bet: 'x'
                    };
                });
                res.send(fixtures);
            });
        });
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


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

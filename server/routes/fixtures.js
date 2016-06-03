'use strict';
require('isomorphic-fetch');
const _ = require('lodash');
const globals = require('../globals');
const leagueCtrl = require('../controllers/LeagueController');
const League = require('../models/LeagueSchema');
const Match = require('../models/MatchSchema');
const Team = require('../models/TeamSchema').Team;
const Bet = require('../models/BetSchema');
const footballDataAPI = globals.FOOTBALL_DATA_API;

const moment = require('moment');

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
        return fetch(footballDataAPI + leagueId + '/fixtures', {
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
        return fetch(footballDataAPI + leagueId + '/teams', {
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
                    homeTeamPosition: homeTeamPosion ? homeTeamPosion.position : null,
                    awayTeamPosition: awayTeamPosion ? awayTeamPosion.position : null,
                    homeTeamPoints: homeTeamPosion ? homeTeamPosion.points : null,
                    awayTeamPoints: awayTeamPosion ? awayTeamPosion.points : null,
                    leagueId: league._id,
                    results: {
                        sideResult: null,
                        homeScore: null,
                        awayScore: null
                    },
                    odds: [0,0,0],
                    roundNumber: fixture.matchday,
                    seasonYear: 2016, //Fixme setgeneric number
                    date: moment(fixture.date).toDate(),
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

var getCurrentRound = function (league, userId) {
    return Match.find({
        seasonYear: 2016,
        leagueId: league._id,
        roundNumber: league.nextRound.roundNumber
    }).lean().then((fixtures) => {
        return Bet.find({userId: userId, matchId: {$in: _.map(fixtures, '_id')}}).then((userBets) => {
            _.forEach(userBets, (userBet) => {
                var fixture = _.find(fixtures, {_id: userBet.matchId});
                fixture.bet = userBet.bet
            });

            return fixtures;
        });
    });
};

var getNextRound = function (leagueId, userId) {
    return League.findOne({'football_data_id': leagueId}).then(function (league) {
        return (moment(moment().format()).isSameOrAfter(league.nextRound.startTime)) ?
            generateNextRoundObj(league) : getCurrentRound(league, userId);

    })
};

module.exports = function (app) {
    app.route('/api/nextRound').get(function (req, res) {
        var leagueId = 424;
        getNextRound(leagueId, req.user.id).then(function (upcomingFixtures) {
            Match.populate(upcomingFixtures, 'homeTeamId awayTeamId').then(function (populatedFixtures) {
                var fixtures = _.map(populatedFixtures, function (fixture) {
                    var homeTeam = fixture.homeTeamId.toObject();
                    var awayTeam = fixture.awayTeamId.toObject();
                    return {
                        id: fixture._id,
                        homeTeam,
                        awayTeam,
                        homeTeamPoints: fixture.homeTeamPoints,
                        awayTeamPoints: fixture.awayTeamPoints,
                        homeTeamPosition: fixture.homeTeamPosition,
                        awayTeamPosition: fixture.awayTeamPosition,
                        roundNumber: fixture.roundNumber,
                        date: fixture.date,
                        bet: fixture.bet || {homeTeamScore: null, awayTeamScore: null, betSide: null},
                        odds: fixture.odds
                    };
                });
                res.send(fixtures);
            });
        });
    });
    app.route('/api/createLeague').post(function (req, res) {
        fetch(footballDataAPI + '/424', {
            headers: {'X-Auth-Token': globals.FOOTBALL_DATA_USER},
        }).then(response => response.json())
            .then(json => {
                leagueCtrl.createLeague(json);
                res(true);
            });
    });
};
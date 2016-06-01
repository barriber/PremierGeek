require('isomorphic-fetch');
const _ = require('lodash');
const Bet = require('../models/BetSchema');
const globals = require('../globals');
const League = require('../models/LeagueSchema');
const Match = require('../models/MatchSchema');
const footballDataAPI = globals.FOOTBALL_DATA_API;
const moment = require('moment');

const generateUserPoints = function (user, bets) {
    const userBetResults = _.map(bets, (userBet) => {
        calculateUserMacthBet(userBet);
    });

    console.log(userBetResults);
};

const calculateUserMacthBet = function (userBet) {
    var points = 0;
    const exactMatch = 2;
    const goalDiffrence = 1.5;
    const matchResult = userBet.matchId.results;
    if (userBet.bet === matchResult.sideResult) {
        points += userBet.matchId.odds[userBet.bet];
        // if (matchResult.homeScore === bet.homeScore && matchResult.awayScore === bet.awayScore) {
        //     points *= 2;
        // } else {
        //     const matchGoalDiffrence = matchResult.homeScore - matchResult.awayScore;
        //     const userGoalDiffrence = bet.homeScore - bet.awayScore;
        //     if (matchGoalDiffrence === userGoalDiffrence) {
        //         points *= 1.5;
        //     }
        // }
    }

    return {
        points,
        matchId: userBet.matchId._id
    }
}

const updatePlayedMatches = function (leagueId) {
    return getPersistedFixtures(false, leagueId).then((missingFixtures) => {
        if (!_.isEmpty(missingFixtures)) {
            return getFinishedFixturesResults(leagueId).then((finishedFixtures) => {
                _.forEach(missingFixtures, (fixture) => {
                    const foundMatch = _.find(finishedFixtures, (finishedFixture) => {
                        return finishedFixture.matchday === fixture.roundNumber &&
                            _.includes(finishedFixture.homeTeamName, fixture.homeTeamId.name)
                    });

                    if (foundMatch) {
                        fixture.results.homeScore = foundMatch.result.goalsHomeTeam;
                        fixture.results.awayScore = foundMatch.result.goalsAwayTeam;
                        if (fixture.results.homeScore === fixture.results.awayScore) {
                            fixture.results.sideResult = 0;
                        } else {
                            fixture.results.sideResult = fixture.results.homeScore > fixture.results.awayScore ? 1 : 2;
                        }
                        fixture.played = true;
                    }
                });

                var updatePromise = _.map(missingFixtures, (match) => {
                    return Match.update({_id: match._id}, match);
                });

                return Promise.all(updatePromise);
            });
        }

        return;
    });
};

const getPersistedFixtures = function (isPlayed, leagueId) {
    return League.findOne({football_data_id: leagueId}).then((league) => {
        return Match.find({
            leagueId: league.id,
            seasonYear: 2016,
            played: isPlayed,
            date: {$lt: moment().format()}
        }).populate('homeTeamId').lean();
    });
};

const getFinishedFixturesResults = function (leagueId) {
    return fetch(footballDataAPI + leagueId + '/fixtures', {
        headers: {'X-Auth-Token': globals.FOOTBALL_DATA_USER},
    }).then(response => response.json()).then(result => {
        return _.filter(result.fixtures, {status: "FINISHED"})
    });
};

module.exports = function (app) {
    app.route('/api/bet').post(function (req, res) {
        _.forEach(req.body, (bet) => {
            Bet.update({matchId: bet.matchId, userId: req.user.id}, bet, {upsert: true}, (err) => {
                if (err) {
                    res(500, 'No Bet persist')
                }
            });
        });

        res.send(true);
    });

    app.route('/api/bet/results').put(function (req, res) {
        const leagueId = 424;
        updatePlayedMatches(leagueId).then(() => {
            getPersistedFixtures(true, leagueId).then((playedMatches) => {
                Bet.find({matchId: {$in: _.map(playedMatches, '_id')}}).populate('matchId userId').lean().then(bets => {
                    var groupedUsersBets = _.groupBy(bets, 'userId._id');
                    _.forOwn(groupedUsersBets, (betsArray) => {
                        const userPoints = generateUserPoints(betsArray[0].userId, betsArray)
                    });
                })
            });
            res.send(true);
        });
    });
};
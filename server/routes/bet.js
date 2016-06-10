require('isomorphic-fetch');
const _ = require('lodash');
const Bet = require('../models/BetSchema');
const globals = require('../globals');
const League = require('../models/LeagueSchema');
const Match = require('../models/MatchSchema');
const footballDataAPI = globals.FOOTBALL_DATA_API;
const moment = require('moment');


const generateUserPoints = function (user, bets, playedMatches) {
    const userBetResults = _.map(bets, (userBet) => {
        const match = _.find(playedMatches, {_id: userBet.matchId});
         return calculateUserMatchBet(userBet, match);
    });

    return {
        userBetResults,
        user: {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            image: user.imageUrl
        },
        totalScore: _.sumBy(userBetResults, 'points')
    }
};

const calculateUserMatchBet = function (userBet, match) {
    const utils = require('../utils/matchCalculations');
    var points = 0;
    const exactMatch = 2;
    const goalDifference = 1.5;
    const matchResult = match.results;
    const bet = userBet.bet;
    const userBetSide = utils.getSide(bet.homeTeamScore, bet.awayTeamScore);
    var isSideCorrect = false;
    var isGoalDifference = false;
    var isExactMatch = false;
    if (userBetSide === matchResult.sideResult) {
        isSideCorrect = true;
        points += match.odds[userBetSide];
        if (matchResult.homeScore === bet.homeTeamScore && matchResult.awayScore === bet.awayTeamScore) {
            isExactMatch = true;
            points *= exactMatch;
        } else {
            const matchGoalDifference = matchResult.homeScore - matchResult.awayScore;
            const userGoalDifference = bet.homeTeamScore - bet.awayTeamScore;
            if (matchResult.sideResult !== 0 && matchGoalDifference === userGoalDifference) {
                isGoalDifference = true;
                points *= goalDifference;
            }
        }
    }

    return {
        points: _.round(points, 3),
        matchResult,
        bet,
        isGoalDifference,
        isExactMatch,
        isSideCorrect,
        teams: {
            homeTeamLogo: match.homeTeamId.logo,
            awayTeamLogo: match.awayTeamId.logo
        }
    }
};

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
        }).populate('homeTeamId awayTeamId').lean();
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
        _.forEach(req.body, (userBetObj) => {
            userBetObj.updateTime = Date.now();
            if(_.isNumber(userBetObj.bet.homeTeamScore) && _.isNumber(userBetObj.bet.awayTeamScore)) // another validation
            Bet.update({matchId: userBetObj.matchId, userId: req.user.id}, userBetObj, {upsert: true}, (err) => {
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
                Bet.find({matchId: {$in: _.map(playedMatches, '_id')}}).populate('userId').lean().then(bets => {
                    var groupedUsersBets = _.groupBy(bets, 'userId._id');
                    const arr = _.map(groupedUsersBets, (betsArray) => {
                        return generateUserPoints(betsArray[0].userId, betsArray, playedMatches);
                    });
                    res.send(arr);
                    return;
                })
            });
        });
    });
};
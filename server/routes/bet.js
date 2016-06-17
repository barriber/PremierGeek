require('isomorphic-fetch');
const _ = require('lodash');
const Bet = require('../models/BetSchema');
const globals = require('../globals');
const League = require('../models/LeagueSchema');
const Match = require('../models/MatchSchema');
const footballDataAPI = globals.FOOTBALL_DATA_API;
const moment = require('moment');
const utils = require('../utils/matchCalculations');


const generateUserPoints = function (user, bets, matches) {
    const userBetResults = _.map(bets, (userBet) => {
        const match = _.find(matches, {_id: userBet.matchId});
        return calculateUserMatchBet(userBet, match);
    });

    return {
        userBetResults,
        user: {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            image: user.imageUrl
        },
        totalScore: _.chain(userBetResults).sumBy('points').round(2).value()
    }
};

const calculateUserMatchBet = function (userBet, match) {
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
        points: _.round(points, 2),
        matchResult,
        bet,
        isGoalDifference,
        isExactMatch,
        isSideCorrect,
        isEnded: match.played,
        startTime: match.date,
        teams: {
            homeTeamLogo: match.homeTeamId.logo,
            awayTeamLogo: match.awayTeamId.logo
        }
    }
};

const updatePlayedMatches = function (leagueId) {
    return getPersistedFixtures(false, leagueId).then((missingFixtures) => {
        if (!_.isEmpty(missingFixtures)) {
            return getFinishedFixturesResults(leagueId).then((result) => {
                _.forEach(missingFixtures, (fixture) => {
                    const foundFinishedMatch = getCorrespondingApiFixture(fixture, result.finished);
                    if (foundFinishedMatch) {
                        var fixtureObj = fixture.results;
                        fixtureObj.homeScore = foundFinishedMatch.result.goalsHomeTeam;
                        fixtureObj.awayScore = foundFinishedMatch.result.goalsAwayTeam;
                        fixtureObj.sideResult = utils.getSide(fixtureObj.homeScore, fixtureObj.awayScore);
                        fixture.played = true;
                    }
                });

                var updatePromise = _.map(missingFixtures, (match) => {
                    return Match.update({_id: match._id}, match);
                });

                return Promise.all(updatePromise).then(() => {
                    return result.inPlay;
                });
            });
        }

        return;
    });
};

const getPersistedFixtures = function (isPlayed, leagueId) {
    return League.findOne({football_data_id: leagueId}).then((league) => {
        var matchQuery = {
            leagueId: league.id,
            seasonYear: 2016,
            date: {$lt: moment().format()}
        };

        if (_.isBoolean(isPlayed)) {
            matchQuery.played = isPlayed;
        }

        return Match.find(matchQuery).populate('homeTeamId awayTeamId').lean();
    });
};

const getFinishedFixturesResults = function (leagueId) {
    return fetch(footballDataAPI + leagueId + '/fixtures', {
        headers: {'X-Auth-Token': globals.FOOTBALL_DATA_USER},
    }).then(response => response.json()).then(result => {
        const groupedFixtures = _.groupBy(result.fixtures, 'status');
        return {
            finished: groupedFixtures.FINISHED,
            inPlay: groupedFixtures.IN_PLAY
        }
    });
};

const getCorrespondingApiFixture = function (persistedFixture, apiFixtures) {
    return _.find(apiFixtures, (apiFixture) => {
        return apiFixture.matchday === persistedFixture.roundNumber &&
            _.includes(apiFixture.homeTeamName, persistedFixture.homeTeamId.name)
    });
};

const updateInPlayMatches = function (persistedFixtures, inPlayApiResults) {
   if(_.isArray(inPlayApiResults) && !_.isEmpty(persistedFixtures)) {
       _.forEach(persistedFixtures, (fixture) => {
           var correspondingFixture = getCorrespondingApiFixture(fixture, inPlayApiResults);
           if (correspondingFixture) {
               var resultObj = fixture.results;
               resultObj.homeScore = correspondingFixture.result.goalsHomeTeam;
               resultObj.awayScore = correspondingFixture.result.goalsAwayTeam;
               resultObj.sideResult = utils.getSide(resultObj.homeScore, resultObj.awayScore);
           }
       })
   }
};

module.exports = function (app) {
    app.route('/api/bet').post(function (req, res) {
        if(req.isAuthenticated()) {
            _.forEach(req.body, (userBetObj) => {
                userBetObj.updateTime = Date.now();
                if (_.isNumber(userBetObj.bet.homeTeamScore) && _.isNumber(userBetObj.bet.awayTeamScore)) { // score validation
                    Bet.update({
                        matchId: userBetObj.matchId,
                        userId: req.user.id
                    }, userBetObj, {upsert: true}, (err) => {
                        if (err) {
                            res(500, 'No Bet persist')
                        }
                    });
                }
            });

            res.send();
        } else {
            res.sendStatus(404);
        }
        return;
    });

    app.route('/api/bet/results').put(function (req, res) {
        const leagueId = 424;
        updatePlayedMatches(leagueId).then((onGoingMatches) => {
            getPersistedFixtures(null, leagueId).then((playedMatches) => {
                updateInPlayMatches(_.filter(playedMatches, {played: false}), onGoingMatches);
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
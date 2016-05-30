require('isomorphic-fetch');
const _ = require('lodash');
const Bet = require('../models/BetSchema');
const globals = require('../globals');
const League = require('../models/LeagueSchema');
const Match = require('../models/MatchSchema');
const footballDataAPI = globals.FOOTBALL_DATA_API;


const updatePlayedMathes = function () {
     return getMissingResultsFixtures().then((missingFixtures) => {
        if (!_.isEmpty(missingFixtures)) {
            return getFinishedFixturesResults().then((finishedFixtures) => {
                _.forEach(missingFixtures, (fixture) => {
                    const foundMatch = _.find(finishedFixtures, (finishedFixture) => {
                        return finishedFixture.matchday === fixture.roundNumber &&
                            _.includes(finishedFixture.homeTeamName, fixture.homeTeamId.name)
                    });

                    if(!foundMatch) {
                        console.log('MATCH NOT FOUND!!!!!'); //FIXME
                    }

                    fixture.awayTeamScore = foundMatch.result.goalsAwayTeam;
                    fixture.homeTeamScore = foundMatch.result.goalsHomeTeam;
                    fixture.played = true;
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

const getMissingResultsFixtures = function () {
    return League.findOne({football_data_id: 398}).then((league) => {
        return Match.find({
            leagueId: league.id,
            seasonYear: 2015,
            played: false
        }).populate('homeTeamId').lean();
    });
};

const getFinishedFixturesResults = function () {
    return fetch(footballDataAPI + '398' + '/fixtures', {
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
        updatePlayedMathes().then(() => {
            console.log('sada');
            res.send(true);
        });
    });
};
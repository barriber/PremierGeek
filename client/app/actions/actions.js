import fetch from 'isomorphic-fetch';
import _ from  'lodash';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_NEXT_ROUND = 'RECEIVE_NEXT_ROUND';
export const PLACE_BET = 'PLACE_BET';

function requestGames(currentRound) {
    return {
        type: REQUEST_GAMES,
        currentRound
    }
}

function receiveMatches(allGames) {
    var unplayedMatches = _.chain(allGames).groupBy('status').get('TIMED').groupBy('matchday').value();
    var nextRoundNumber = _.findKey(unplayedMatches, function (matchDay) {
        return matchDay.length === 10; //TODO Assume there are 10 games per league, need to be changed for Multiple leagues
    });

    var i = 0;
    var fixturesObj = _.map(unplayedMatches[nextRoundNumber], (fixture) => {
        return _.assign(fixture, {bet: 'x', id: ++i});
    });
    return {
        type: RECEIVE_NEXT_ROUND,
        nextRound: nextRoundNumber,
        matches: fixturesObj,
        receivedAt: Date.now()
    }
}

function fetchGames() {
    return dispatch => {
        dispatch(requestGames())
        return fetch('/api/nextRound').then(response => response.json())
            .then(result =>
                dispatch({
                type: RECEIVE_NEXT_ROUND,
                nextRound: result[0].roundNumber,
                fixtures: result,
                receivedAt: Date.now()
            })).catch(error => {
                console.log(error);
            });
    }
}

function shouldFetchGames(state, currentRound) {
    return true; //TODO add functionality
}

export function fetchPostsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchGames(getState())) {
            return dispatch(fetchGames());
        }
    }
}

export function placeBet(team, fixtureId) {
    return {
        type: PLACE_BET,
        team,
        fixtureId
    }
}

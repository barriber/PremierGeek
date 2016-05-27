import fetch from 'isomorphic-fetch';
import _ from  'lodash';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_NEXT_ROUND = 'RECEIVE_NEXT_ROUND';
export const PLACE_BET = 'PLACE_BET';
export const SEND_BETS = 'SEND_BET';
export const BETS_PERSISTED = 'BETS_PERSISTED';
export const BETS_PERSIST_ERROR = 'BETS_PERSIST_ERROR';


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
        dispatch(requestGames());
        return fetch('/api/nextRound', {
            credentials: 'include' //For cookie login!!!
        }).then(response => response.json())
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

export function betTeam(team, fixtureId) {
    return {
        type: PLACE_BET,
        team,
        fixtureId
    }
}

export function persistBets(bets) {
    return (dispatch) => {
        dispatch({type: SEND_BETS})
        return fetch('/api/bet', {
            method: 'POST',
            body: bets,
            credentials: 'include'
        }).then(response => response.json()).then(result => {
            dispatch({type: BETS_PERSISTED});
        }).catch(error => {
            dispatch({
                type: BETS_PERSIST_ERROR,
                error: error
            });
        });
    }
}

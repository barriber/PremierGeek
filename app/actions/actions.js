import fetch from 'isomorphic-fetch';
import _ from  'lodash';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_NEXT_ROUND = 'RECEIVE_NEXT_ROUND';

function requestGames(currentRound) {
    return {
        type: REQUEST_GAMES,
        currentRound
    }
}

function receiveMatches(allGames) {
    var unplayedMatches = _.chain(allGames).groupBy('status').get('TIMED').groupBy('matchday').value();
    var nextUnplayedRound = _.findKey(unplayedMatches, function(matchDay) {
        return matchDay.length === 10; //TODO Assume there are 10 games per league, need to be changed for Multiple leagues
    });

    return {
        type: RECEIVE_NEXT_ROUND,
        nextRound: nextUnplayedRound,
        matches: unplayedMatches[nextUnplayedRound],
        receivedAt: Date.now()
    }
}

function fetchGames() {
    return dispatch => {
        dispatch(requestGames())
        return fetch('http://api.football-data.org/v1/soccerseasons/398/fixtures', {
            headers: { 'X-Auth-Token': '5aab4c2c6c8a4af188e5be626459fb78'},
        }).then(response => response.json())
        .then(json => dispatch(receiveMatches(json.fixtures)));
    }
}

function shouldFetchGames(state, currentRound) {
    return true; //TODO add functionality
}

export function fetchPostsIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchGames(getState())) {
            return dispatch(fetchGames());
        }
    }
}
import fetch from 'isomorphic-fetch';
import _ from  'lodash';

export const REQUEST_GAMES = 'REQUEST_GAMES';

function requestGames(currentRound) {
    return {
        type: REQUEST_GAMES,
        currentRound
    }
}

function getNextRound(allGames) {
    var currentMatchDay = _.chain(allGames).groupBy('status').get('TIMED').groupBy('matchday')
        .keysIn().sort().head().parseInt().value();
    console.log('Nex Match Day - ' + currentMatchDay);
}
function fetchGames(currentRound) {
    return dispatch => {
        dispatch(requestGames(currentRound))
        return fetch('http://api.football-data.org/v1/soccerseasons/398/fixtures', {
            headers: { 'X-Auth-Token': '5aab4c2c6c8a4af188e5be626459fb78'},
        }).then(response => response.json())
        .then(json => {
            getNextRound(json.fixtures);
        })
    }
}

function shouldFetchGames(state, currentRound) {
    console.log('ENTER shouldFetchGames');
    return true; //TODO add functionality
}

export function fetchPostsIfNeeded(currentRound) {
    console.log('ENTER fetchPostsIfNeeded');
    return (dispatch, getState) => {
        if(shouldFetchGames(getState(), currentRound)) {
            console.log('ENTER IFFFFFF');
            return dispatch(fetchGames(currentRound));
        }
    }
}
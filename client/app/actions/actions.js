import fetch from 'isomorphic-fetch';

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
            body: JSON.stringify(bets),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }),
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

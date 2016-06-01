import fetch from 'isomorphic-fetch';

export const REQUEST_SCORES = 'REQUEST_SCORES';
export const SCORES_RECIEVE = 'SCORES_RECIEVE';
export const SCORES_FAILURE = ' SCORES_FAILURE';

export function getAllReults() {
    return (dispatch) => {
        dispatch({type: REQUEST_SCORES})
        return fetch('/api/bet/results', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }),
            credentials: 'include'
        }).then(response => response.json()).then(scores => {
            dispatch({
                type: SCORES_RECIEVE,
                scores
            });
        }).catch(error => {
            dispatch({
                type: SCORES_FAILURE,
            });
        });
    }
}
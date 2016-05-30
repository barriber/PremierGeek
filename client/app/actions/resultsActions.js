import fetch from 'isomorphic-fetch';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RESULTS_RECIEVE = 'RESULTS_RECIEVE';
export const RESULTS_FAILURE = 'VERIFY_LOGIN';

export function getAllReults() {
    return (dispatch) => {
        dispatch({type: REQUEST_RESULTS})
        return fetch('/api/bet/results', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }),
            credentials: 'include'
        }).then(response => response.json()).then(results => {
            dispatch({
                type: RESULTS_RECIEVE,
                results
            });
        }).catch(error => {
            dispatch({
                type: RESULTS_FAILURE,
            })
        });
    }
}
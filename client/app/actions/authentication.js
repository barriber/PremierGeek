import fetch from 'isomorphic-fetch';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function facebookLogin() {
    return (dispatch) => {
        dispatch({type: LOGIN_REQUEST});
        return fetch('/api/login').then(response => response.json())
            .then(result => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    data: result
                });
            }).catch((error) => {
                console.log(error)
            });
    }
}
import fetch from 'isomorphic-fetch';

export const SESSION_VERIFY_FAIL = 'SESSION_VERIFY_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SESSION_VERIFY_REQUEST = 'VERIFY_LOGIN';

function loginAction(userDetails) {
    return {
        type: LOGIN_SUCCESS,
        userDetails
    };
}

export function verifySession() {
    return (dispatch) => {
        dispatch({type: SESSION_VERIFY_REQUEST})
        return fetch('/api/session/verify', {
            credentials: 'include'
        }).then(response => response.json()).then(result => {
            dispatch(loginAction(result));

        }).catch(error => {
            dispatch({
                type: SESSION_VERIFY_FAIL,
            })
        });
    }
}
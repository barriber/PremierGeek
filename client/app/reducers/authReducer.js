import {SESSION_VERIFY_REQUEST, LOGIN_SUCCESS, SESSION_VERIFY_FAIL,
    LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../actions/authentication';

export default function authReducer(state = {isFetching: false}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.userDetails
            });
        case SESSION_VERIFY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
        case SESSION_VERIFY_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                user: null
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                logoutRequest: true
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                user: null
            });
        default:
            return state;
    }
}
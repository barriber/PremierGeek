import {SESSION_VERIFY_REQUEST, LOGIN_SUCCESS} from '../actions/authentication';

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: {
                    firstName: action.userDetails
                }
            });
        case SESSION_VERIFY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            });
        default:
            return state;
    }
}
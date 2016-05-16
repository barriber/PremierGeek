import {combineReducers} from 'redux';
import {LOGIN_REQUEST, LOGIN_SUCCESS} from '../actions/authentication';

export default function authReducer(state, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            });
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.creds
            });
        default:
            return state;
    }
}
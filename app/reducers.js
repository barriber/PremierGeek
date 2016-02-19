import {combineReducers} from 'redux';
import {REQUEST_GAMES} from './actions/actions';

function footballMatch(state = {
    isFetching: false,
    didInvalidate: false,
    matches: []
}, action) {
    switch (action.type) {
        case REQUEST_GAMES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
    }
}

function basicReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_GAMES:
            return Object.assign({}, state, {
                [action.currentRound]: footballMatch(state[action.currentRound], action)
            });
    }
    return state;
}

const rootReducer = combineReducers({
    basicReducer
});

export  default rootReducer;
import {combineReducers} from 'redux';
import {REQUEST_GAMES, RECEIVE_NEXT_ROUND} from './../actions/actions';

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
            });
        case RECEIVE_NEXT_ROUND:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                nextRound: action.nextRound,
                matches: action.matches,
                lastUpdated: action.receivedAt
            });
    }
}

function basicReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_GAMES:
        case RECEIVE_NEXT_ROUND:
            return Object.assign({}, state, {
               nextBetRound: footballMatch(state.nextBetRound, action)
            });

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    basicReducer
});

export  default rootReducer;
import {List, Map} from 'immutable';
import {combineReducers} from 'redux';
import {REQUEST_GAMES, RECEIVE_NEXT_ROUND, PLACE_BET} from './../actions/actions';

var initilState = Map({
    isFetching: false,
    didInvalidate: false,
    nextRound: 0,
    matches: List(),
    lastUpdated: 0
});

function footballMatch(state = initilState, action) {
    switch (action.type) {
        case REQUEST_GAMES:
            return state.withMutations(obj => {
                obj.set('isFetching', true).set('didInvalidate', false);
            });
        case RECEIVE_NEXT_ROUND:
            console.log(action.receivedAt);
            return state.withMutations(obj => {
                obj.set('isFetching', false).set('didInvalidate', false).set('nextRound', action.nextRound)
                .set('matches', action.matches).set('lastUpdated', action.receivedAt);
            });
    }
}

function basicReducer(state = initilState, action) {
    switch (action.type) {
        case REQUEST_GAMES:
        case RECEIVE_NEXT_ROUND:
            return footballMatch(state, action)
        case PLACE_BET:
            break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    basicReducer
});

export  default rootReducer;
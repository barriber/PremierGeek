import _ from 'lodash';
import immutable  from 'immutable';
import {combineReducers} from 'redux';
import {REQUEST_GAMES, RECEIVE_NEXT_ROUND, PLACE_BET} from './../actions/actions';

var initilState = immutable.fromJS({
    isFetching: false,
    didInvalidate: false,
    nextRound: 0,
    matches: immutable.List(),
    lastUpdated: 0
});

function footballMatch(state = initilState, action) {
    switch (action.type) {
        case REQUEST_GAMES:
            return state.withMutations(obj => {
                obj.set('isFetching', true).set('didInvalidate', false);
            });
        case RECEIVE_NEXT_ROUND:
            return state.withMutations(obj => {
                obj.set('isFetching', false).set('didInvalidate', false).set('nextRound', action.nextRound)
                .set('matches', immutable.fromJS(action.matches)).set('lastUpdated', action.receivedAt);
            });


    }
}

function basicReducer(state = initilState, action) {
    switch (action.type) {
        case REQUEST_GAMES:
        case RECEIVE_NEXT_ROUND:
            return footballMatch(state, action)
        case PLACE_BET:
            var matches = state.get('matches');
            var fixture = _.find(matches.toJS(), {id: action.fixtureId});
            var usetBet = fixture.bet === action.team ? 'x' : action.team;
            var index = matches.findIndex((fixture) => {
                return fixture.get('id') === action.fixtureId;
            })

            return state.setIn(['matches', index, 'bet'], usetBet);
            break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    basicReducer
});

export  default rootReducer;
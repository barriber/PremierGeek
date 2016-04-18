import _ from 'lodash';
import immutable  from 'immutable';
import {combineReducers} from 'redux';
import {REQUEST_GAMES, RECEIVE_NEXT_ROUND, PLACE_BET} from './../actions/actions';

var initilState = immutable.fromJS({
    isFetching: false,
    didInvalidate: false,
    nextRound: 0,
    fixtures: immutable.List(),
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
                .set('fixtures', immutable.fromJS(action.fixtures)).set('lastUpdated', action.receivedAt);
            });
    }
}

function basicReducer(state = initilState, action) {
    switch (action.type) {
        case REQUEST_GAMES:
        case RECEIVE_NEXT_ROUND:
            return footballMatch(state, action);
        case PLACE_BET:
            var fixtures = state.get('fixtures');
            var fixture = _.find(fixtures.toJS(), {_id: action.fixtureId});
            var usetBet = fixture.bet === action.team ? 'x' : action.team;
            var index = fixtures.findIndex((fixture) => {
                return fixture.get('_id') === action.fixtureId;
            });

            return state.setIn(['fixtures', index, 'bet'], usetBet);
            break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    basicReducer
});

export  default rootReducer;
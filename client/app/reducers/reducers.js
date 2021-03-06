import _ from 'lodash';
import immutable  from 'immutable';
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import scoresReducer from './scoresReducer';
import {
    REQUEST_GAMES, RECEIVE_NEXT_ROUND, PLACE_BET, SEND_BETS,
    BETS_PERSISTED, BETS_PERSIST_ERROR
} from '..//actions/actions';

let initilState = immutable.fromJS({
    isFetching: false,
    didInvalidate: false,
    nextRound: 0,
    fixtures: immutable.List(),
    lastUpdated: 0,
    sendBets: false,
    betsPersisted: false,
    betsPersistError: false,
    persistedAt: null
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

const getBetIndex = function (homeScore, awayScore) {
    if(_.isInteger(homeScore) && _.isInteger(awayScore)) {
        if(homeScore === awayScore) {
            return 0;
        } else {
            return homeScore > awayScore ? 1 : 2;
        }
    }

    return null;
};

function basicReducer(state = initilState, action) {
    switch (action.type) {
        case REQUEST_GAMES:
        case RECEIVE_NEXT_ROUND:
            return footballMatch(state, action);
        case PLACE_BET:
            let fixtures = state.get('fixtures');
            const teamSide = action.teamSide === 1 ? 'homeTeamScore' : 'awayTeamScore';
            var index = fixtures.findIndex((fixture) => {
                return fixture.get('id') === action.fixtureId;
            });

            return state.setIn(['fixtures', index, 'bet', teamSide], action.score);
            // const fixture = _.find(fixtures.toJS(), {id: action.fixtureId});
            // const betIndex = getBetIndex(fixture.bet.homeTeamScore, fixture.bet.awayTeamScore);
            // return state.setIn(['fixtures', index, 'bet', 'betSide'], betIndex);
        case SEND_BETS:
            return state.set('sendBets', true).set('betsPersisted', false);
        case BETS_PERSISTED:
            return state.set('sendBets', false).set('betsPersisted', true).set('persistedAt', Date.now());

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    basicReducer,
    authReducer,
    scoresReducer
});

export  default rootReducer;
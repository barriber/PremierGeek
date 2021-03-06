import {SCORES_FAILURE, SCORES_RECIEVE, REQUEST_SCORES} from '../actions/resultsActions';
import immutable  from 'immutable';

let initialScoresState = immutable.fromJS({
    scoresReceived: false,
    scoresRequest: false,
    scoresFailure: false,
    scores: immutable.List(),
    totalMatches: 0
});

export default function authReducer(state = initialScoresState, action) {
    switch (action.type) {
        case SCORES_RECIEVE:
            return state.set('scoresRequest', false).set('scoresReceived', true)
                .set('scores', immutable.fromJS(action.scores.usersBets)).set('scoresFailure', false)
                .set('totalMatches', action.scores.totalMatches);
        case REQUEST_SCORES:
            return state.set('scoresRequest', true).set('scoresReceived', false)
                .set('scoresFailure', false).set('scores', action.scores);
        case SCORES_FAILURE:
            return state.set('scoresRequest', false).set('scoresReceived', false).set('scoresFailure', true);
        default:
            return state;
    }
}
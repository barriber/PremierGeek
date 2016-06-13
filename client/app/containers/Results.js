import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchScores} from '../actions/resultsActions'
import {Col, Row} from 'react-bootstrap';

import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map'
import UserScore from '../components/UserScore';

class Results extends Component {
    componentDidMount() {
        this.props.dispatch(fetchScores());
    }

    render() {
        const {scores} = this.props;
        if (!isEmpty(scores)) {
            const orderedScores = orderBy(scores, ['totalScore'], ['desc']);
            let position = 0;
            return (
                <Col md={6} mdOffset={3} sm={10} smOffset={1} className="scores-section">
                    <Row>
                        <Col md={2} mdOffset={10} sm={2} smOffset={10} className="text-center scores-title">
                            Scores
                        </Col>
                    </Row>
                    {
                        map(orderedScores, (userScore) => {
                            return (
                                <UserScore points={userScore.totalScore} userName={userScore.user.name}
                                           position={++position} bets={userScore.userBetResults}
                                           image={userScore.user.image} key={userScore.user.name}/>
                            );
                        })
                    }
                </Col>
            );
        }

        return null;
    }
}

function mapStateToProps(state) {
    let scoresReducer = state.scoresReducer.toJS();
    return {scores: scoresReducer.scores}

}
export default connect(mapStateToProps)(Results);
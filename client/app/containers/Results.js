import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchScores} from '../actions/resultsActions'
import {Col, Row} from 'react-bootstrap';

import isArray from 'lodash/isArray';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map'
import UserScore from '../components/UserScore';

class Results extends Component {
    componentDidMount() {
        this.props.dispatch(fetchScores());
    }

    render() {
        const {scores} = this.props;
        if (isArray(scores)) {
            const orderedScores = orderBy(scores, ['points'], ['desc']);
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
                                <UserScore points={userScore.points} userName={userScore.user.name}
                                           position={++position}
                                           image={userScore.user.image} key={userScore.user.name}/>
                            );
                        })
                    }
                </Col>
            );
        }

        return (
            <h1>
                no results yet
            </h1>
        );
    }
}

function mapStateToProps(state) {
    let scoresReducer = state.scoresReducer.toJS();
    return {scores: scoresReducer.scores}

}
export default connect(mapStateToProps)(Results);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchScores} from '../actions/resultsActions';
import StatisticsGenerator from '../components/StatisticsGenerator';
import isEmpty from 'lodash/isEmpty';
import {Col, Row} from 'react-bootstrap';

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchScores());
    }

    render() {
        const {scores} = this.props;
        if (!isEmpty(scores)) {
            return (
                <Col md={12} className="scores-section">
                    <Row>
                        <Col md={5} mdOffset={3}>
                            <StatisticsGenerator statisticProp="isSideCorrect" bets={scores} title="hit percentage"
                                                 isPercentage={true}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <StatisticsGenerator statisticProp="isExactMatch" bets={scores} title="best sniper"/>
                        </Col>
                        <Col md={5} mdOffset={1}>
                            <StatisticsGenerator statisticProp="isGoalDifference" bets={scores} title="best shooter"/>
                        </Col>
                    </Row>
                </Col>
            )
        }
        return null;
    }
}

function mapStateToProps(state) {
    let scoresReducer = state.scoresReducer.toJS();
    return {scores: scoresReducer.scores}

}
export default connect(mapStateToProps)(Statistics);
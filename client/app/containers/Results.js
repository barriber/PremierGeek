import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchScores} from '../actions/resultsActions'
import {Col, Row, Checkbox} from 'react-bootstrap';

import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map'
import UserScore from '../components/UserScore';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPaidUsers: props.isPaid === true
        }

    }

    componentDidMount() {
        this.props.dispatch(fetchScores());
    }

    changePaidDisplay(e) {
        this.setState({
            showPaidUsers: !this.state.showPaidUsers
        })
    }

    paidFilterCheckBox(isPaid) {
        if (isPaid) {
            return (
                <Checkbox className="paid-checkbox" onChange={(e) => {this.changePaidDisplay(e)}}
                          checked={this.state.showPaidUsers}>
                    Paid Only
                </Checkbox>)
        } else {
            return null;
        }
    }

    generateUsersScore(scores) {
        let results = scores;
        if (this.state.showPaidUsers) {
            results = filter(results, (result) => {
                return result.user.isPaid;
            });
        }

        return orderBy(results, ['totalScore'], ['desc']);
    }

    render() {
        const {scores, isPaid} = this.props;
        if (!isEmpty(scores)) {
            let position = 0;
            return (
                <Col md={6} mdOffset={3} sm={10} smOffset={1} className="scores-section">
                    <Row>
                        <Col md={3} sm={3} className="text-center scores-title">
                            {this.paidFilterCheckBox(isPaid)}
                        </Col>
                        <Col md={2} mdOffset={7} sm={2} smOffset={7} className="text-center scores-title">
                            Scores
                        </Col>
                    </Row>
                    {
                        map(this.generateUsersScore(scores), (userScore) => {
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
    return {scores: scoresReducer.scores, isPaid: state.authReducer.user.isPaid}

}
export default connect(mapStateToProps)(Results);
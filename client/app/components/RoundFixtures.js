import React, {Component} from 'react';
import _ from 'lodash';
import Fixture from './Fixture';
import {betScore} from '../actions/actions';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded} from '../actions/actions';
import {persistBets} from '../actions/actions';
import {Col} from 'react-bootstrap';
import BetButton from './BetButton';

class RoundFixtures extends Component {
    constructor(props) {
        super(props);
        this.betAction = this.betAction.bind(this);
        this.persistBets = this.persistBets.bind(this);
    }

    componentDidMount() {
        const {dispatch, games} = this.props;
        dispatch(fetchPostsIfNeeded());
    }

    persistBets(persistObj) {
        this.props.dispatch(persistBets(persistObj));
    }

    betAction(teamSide, fixtureId, scoreInput) {
        this.props.dispatch(betScore(teamSide, fixtureId, scoreInput));
    }

    render() {
        const {nextRound, fixtures} = this.props;
        if (_.isEmpty(fixtures)) {
            return null;
        }

        return (
            <Col md={6} mdOffset={3} sm={10} smOffset={1} className="fixtures-section">
                <BetButton fixtures={fixtures} persistBets={this.persistBets}/>
                {
                    _.map(fixtures, (fixture) => {
                        return (
                            <Fixture homeTeam={fixture.homeTeam} awayTeam={fixture.awayTeam} fixtureId={fixture.id}
                                     key={fixture.id} betAction={this.betAction} userBet={fixture.bet}
                                     odds={fixture.odds} date={fixture.date}/>
                        );
                    })
                }
            </Col>
        );
    }
}

function mapStateToProps(state) {
    let basicReducerJsObj = state.basicReducer.toJS();
    const {isFetching, lastUpdated, nextRound, fixtures} = basicReducerJsObj || {
        isFetching: true,
        fixtures: [],
        nextRound: -1
    };

    return {isFetching, lastUpdated, nextRound, fixtures}
}

export default connect(mapStateToProps)(RoundFixtures);
import React, {Component} from 'react';
import Fixture from './Fixture';
import {placeBet} from '../actions/actions';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded} from '../actions/actions';

class RoundFixtures extends Component {
    constructor(props) {
        super(props);
        this.betAction = this.betAction.bind(this);
    }

    componentDidMount() {
        const {dispatch, games} = this.props;
        dispatch(fetchPostsIfNeeded());
    }

    betAction(bet, fixtureId) {
        this.props.dispatch(placeBet(bet, fixtureId));
    }

    render() {
        const {nextRound, fixtures} = this.props;

        return (
            <div>
                {/*<h1>
                    NextRound: {nextRound}
                </h1>*/}
                {
                    _.map(fixtures, (fixture) => {
                        return (
                            <Fixture homeTeam={fixture.homeTeam} awayTeam={fixture.awayTeam} fixtureId={fixture.id}
                                     key={fixture.id} betAction={this.betAction} userBet={fixture.bet}/>
                        );
                    })
                }
            </div>
        );
    }
};

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
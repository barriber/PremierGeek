import React from 'react';
import Fixture from './Fixture';
import {placeBet} from '../actions/actions';

var RoundFixtures = React.createClass({
    betAction: function(bet, fixtureId) {
        this.props.dispatch(placeBet(bet, fixtureId));
    },
    render: function () {
        const {nextRound, fixtures} = this.props;
        return (
            <div>
                <h1>
                    NextRound: {nextRound}
                </h1>
                {
                    _.map(fixtures, (fixture) => {
                        return (
                            <Fixture homeTeam={fixture.homeTeam} awayTeam={fixture.awayTeam} fixtureId={fixture.id}
                                     key={fixture.id} betAction={this.betAction} userBet={fixture.bet} />
                        );
                    })
                }
            </div>
        );
    }
});

export default RoundFixtures;
import React from 'react';
import Fixture from './Fixture';
import {placeBet} from '../actions/actions';

var RoundFixtures = React.createClass({
    betAction: function(bet, fixtureId) {
        this.props.dispatch(placeBet(bet, fixtureId));
    },
    render: function () {
        const {nextRound, matches} = this.props;
        return (
            <div>
                <h1>
                    NextRound: {nextRound}
                </h1>
                {
                    _.map(matches, (fixture) => {
                        return (
                            <Fixture homeTeam={fixture.homeTeamName} awayTeam={fixture.awayTeamName} fixtureId={fixture.id}
                                     key={fixture.homeTeamName + fixture.awayTeamName} betAction={this.betAction}
                            userBet={fixture.bet}/>)
                    })
                }
            </div>
        );
    }
});

export default RoundFixtures;
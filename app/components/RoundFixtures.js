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
                            <Fixture homeTeam={fixture.homeTeamName} awayTeam={fixture.awayTeamName} fixtureId={fixture._id}
                                     key={fixture._id} betAction={this.betAction} userBet={fixture.bet}
                            homeTeamLogo={fixture.homeTeamLogo} awayTeamLogo={fixture.awayTeamLogo} />
                        )
                    })
                }
            </div>
        );
    }
});

export default RoundFixtures;
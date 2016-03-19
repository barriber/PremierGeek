import React from 'react';
import Fixture from './Fixture';
var RoundFixtures = React.createClass({
    betAction: function(team) {
       console.log(team);
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
                            <Fixture homeTeam={fixture.homeTeamName} awayTeam={fixture.awayTeamName}
                                     key={fixture.homeTeamName + fixture.awayTeamName} betAction={this.betAction}/>)
                    })
                }
            </div>
        );
    }
});

export default RoundFixtures;
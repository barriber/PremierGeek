import React from 'react';
import Fixture from './Fixture';
var RoundBetList = React.createClass({
    render: function () {
        const {nextRound, matches} = this.props;
        return (
            <div>
                {
                    <h1>
                        NextRound: {nextRound}
                    </h1>
                }
                {_.map(matches, (fixture) => {
                    return (<Fixture homeTeam={fixture.homeTeamName} awayTeam={fixture.awayTeamName}/>)
                })}

            </div>
        );

    }
});


export default RoundBetList;
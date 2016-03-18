import  React from 'react';
import _ from 'lodash';

var Fixture = React.createClass({
    removeFC: function (teamName) {
        var removedAfc = _.replace(teamName, 'AFC', '');
        return _.replace(removedAfc, 'FC', '');
    },
    render: function () {
        const {homeTeam, awayTeam} = this.props;
        return (
            <div className='match'>
                {this.removeFC(homeTeam) + ' - ' + this.removeFC(awayTeam)}
            </div>
        )
    }
});

export default Fixture;
import  React from 'react';
import _ from 'lodash';
import {Button, Row, Col} from 'react-bootstrap'

var Fixture = React.createClass({
    styleBet: function(team, bet) {
        if(bet === 'x') {
            return 'info';
        }
        return team === bet ? 'success' : 'warning';
    },
    removeFC: function (teamName) {
        var removedAfc = _.replace(teamName, 'AFC', '');
        return _.replace(removedAfc, 'FC', '');
    },
    render: function () {
        const {homeTeam, awayTeam, betAction, fixtureId, userBet} = this.props;
        var homeTeamName = this.removeFC(homeTeam);
        var awayTeamName = this.removeFC(awayTeam);
        return (
            <Row className='fixture row'>
                <Col md={4} sm={4}>
                    <Button className="team_button" bsStyle={this.styleBet(1, userBet)} onClick={() => betAction(1, fixtureId)}>
                        {homeTeamName}
                    </Button>
                </Col>
                <Col className="vs" md={1} sm={2}>
                    vs
                </Col>
                <Col md={4} sm={4}>
                    <Button className="team_button" bsStyle={this.styleBet(2, userBet)} onClick={() => betAction(2, fixtureId)}>
                        {awayTeamName}
                    </Button>
                </Col>
            </Row>
        );
    }
});

export default Fixture;
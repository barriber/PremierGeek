import  React from 'react';
import _ from 'lodash';
import {Button, Row, Col} from 'react-bootstrap'

var Fixture = React.createClass({
    removeFC: function (teamName) {
        var removedAfc = _.replace(teamName, 'AFC', '');
        return _.replace(removedAfc, 'FC', '');
    },
    render: function () {
        const {homeTeam, awayTeam, betAction} = this.props;
        var homeTeamName = this.removeFC(homeTeam);
        var awayTeamName = this.removeFC(awayTeam);
        return (
            <Row className='fixture row'>
                <Col md={4}>
                    <Button className="team_button" bsStyle="info" onClick={() => betAction(homeTeamName)}>
                        {homeTeamName}
                    </Button>
                </Col>
                <Col className="vs" md={1}>
                    vs
                </Col>
                <Col md={4}>
                    <Button className="team_button" bsStyle="info" onClick={() => betAction(homeTeamName)}>
                        {awayTeamName}
                    </Button>
                </Col>
            </Row>
        );
    }
});

export default Fixture;
import  React from 'react';
import _ from 'lodash';
import {Button, Row, Col, Image} from 'react-bootstrap'

var Fixture = React.createClass({
    styleBet: function (team, bet) {
        if (bet === 'x') {
            return 'info';
        }
        return team === bet ? 'success' : 'warning';
    },

    render: function () {
        const {homeTeam, awayTeam, betAction, fixtureId, userBet, homeTeamLogo, awayTeamLogo} = this.props;
        return (
            <Row className='fixture'>
                <Col md={5} sm={4}>
                    <Row className='team home-team'>
                        <Col md={4} sm={4}>
                            <Image src={homeTeamLogo} responsive/>
                        </Col>
                        <Col md={8} sm={8}>
                            <Button className="team_button" bsStyle={this.styleBet(1, userBet)} bsSize="large"
                                    onClick={() => betAction(1, fixtureId)}>
                                {homeTeam}
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="vs" md={2} sm={2}>
                    vs
                </Col>
                <Col md={5} sm={4}>
                    <Row className='team away-team'>
                        <Col md={8} sm={8}>
                            <Button className="team_button" bsStyle={this.styleBet(2, userBet)} bsSize="large"

                                    onClick={() => betAction(2, fixtureId)}>
                                {awayTeam}
                            </Button>
                        </Col>
                        <Col md={4} sm={4}>
                            <Image src={awayTeamLogo} rounded responsive/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
});

export default Fixture;
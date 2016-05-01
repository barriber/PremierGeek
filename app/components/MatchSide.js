import React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'

function MatchSide(props) {
    const {team, isHomeTeam, fixtureId, betAction} = props;
    const styleBet = function(team, bet) {
        if (bet === 'x') {
            return 'info';
        }
        return team === bet ? 'success' : 'warning';
    };
    const getTeamLogo = function(team) {
        return (
            <Col md={4} sm={4} key={team.name + ' logo'} >
                <Image src={team.logo} responsive/>
            </Col>
        );
    };
    const getTeamBetButton = function() {
        const {team, userBet, betAction, isHomeTeam, fixtureId} = props;
        let teamIndex = isHomeTeam ? 1 : 2;

        return (
            <Col md={8} sm={8} key={team.name + ' button'}>
                <Button className="team_button" bsStyle={styleBet(teamIndex, userBet)}
                        onClick={() => betAction(teamIndex, fixtureId)} >
                    {team.name}
                </Button>
            </Col>
        );
    };
    
    const betSideElements = [getTeamLogo(team), getTeamBetButton()];
    const sideClass = isHomeTeam ? 'home-team' : 'away-team';

    return (
        <Row className={'team ' + sideClass} key={team.name}  >
            {isHomeTeam ? betSideElements : betSideElements.reverse()}
        </Row>
    );
}

export default MatchSide;
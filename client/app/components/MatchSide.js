import React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap';

export default function MatchSide(props) {
    const {team, isHomeTeam} = props;
    const styleBet = function (team, bet) {
        if (bet === '') {
            return 'info'
        }

        if (bet === 0) {
            return 'warning';
        }

        return team === bet ? 'success' : 'danger';
    };
    const getTeamLogo = function (team) {
        return (
            <Col md={4} sm={6} key={team.name + ' logo'}>
                <Image src={team.logo} responsive circle/>
            </Col>
        );
    };
    const getTeamBetButton = function () {
        const {team, userBet, betAction, isHomeTeam, fixtureId, odd} = props;
        let teamIndex = isHomeTeam ? 1 : 2;

        return (
            <Col md={8} sm={6} key={team.name + ' button'}>
                <div className="odd text-center">
                    {odd}
                </div>
                <Button className="team_button" bsStyle={styleBet(teamIndex, userBet)}
                        onClick={() => betAction(teamIndex, fixtureId)}>
                    {team.name}
                </Button>
            </Col>
        );
    };

    const betSideElements = [getTeamLogo(team), getTeamBetButton()];
    const sideClass = isHomeTeam ? 'home-team' : 'away-team';

    return (
        <div className="match-side">
            <Row className={'team ' + sideClass} key={team.name}>
                {isHomeTeam ? betSideElements : betSideElements.reverse()}
            </Row>
        </div>
    );
}
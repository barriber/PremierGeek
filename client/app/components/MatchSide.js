import React from 'react';
import {Button, Row, Col, Image, FormControl, FormGroup} from 'react-bootstrap';
import ScoreInput from './ScoreInput';

export default function MatchSide(props) {
    const {team, isHomeTeam} = props;
    const styleBet = function (team, betIndex) {
        if (betIndex === null) { // no bet
            return 'info'
        }

        if (betIndex === 0) { // draw
            return 'warning';
        }

        return team === betIndex ? 'success' : 'danger';
    };
    const getTeamLogo = function (team) {
        return (
            <Col md={4} sm={4} key={team.name + ' logo'}>
                <Image src={team.logo} responsive circle/>
            </Col>
        );
    };
    const getTeamBetButton = function () {
        const {team, betIndex, isHomeTeam, odd} = props;
        let teamIndex = isHomeTeam ? 1 : 2;

        return (
            <Col md={6} sm={6} key={team.name + ' button'} className="team-button-col">
                <div className="odd text-center">
                    {odd}
                </div>
                <Button className="team_button" bsStyle={styleBet(teamIndex, betIndex)}bsSize="large">
                    {/*onClick={() => betAction(teamIndex, fixtureId)}*/}
                    {team.name}
                </Button>
            </Col>
        );
    };

    const scoreInput = function () {
        return (
            <Col md={2} sm={2} key={team.name + 'score'}>
                <ScoreInput betAction={props.betAction} isHomeTeam={props.isHomeTeam}
                            fixtureId={props.fixtureId} score={props.score}/>
            </Col>
        )
    };

    const betSideElements = [getTeamLogo(team), getTeamBetButton(), scoreInput()];
    const sideClass = isHomeTeam ? 'home-team' : 'away-team';

    return (
        <div className={'team ' + sideClass + " match-side"} key={team.name}>
            {isHomeTeam ? betSideElements : betSideElements.reverse()}
        </div>
    );
}
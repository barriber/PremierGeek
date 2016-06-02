import React from 'react';
import {Button, Row, Col, Image, FormControl, FormGroup} from 'react-bootstrap';
import ScoreInput from './ScoreInput';

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
            <Col md={4} sm={4} key={team.name + ' logo'}>
                <Image src={team.logo} responsive circle/>
            </Col>
        );
    };
    const getTeamBetButton = function () {
        const {team, userBet, betAction, isHomeTeam, fixtureId, odd} = props;
        let teamIndex = isHomeTeam ? 1 : 2;

        return (
            <Col md={6} sm={6} key={team.name + ' button'} className="team-button-col">
                <div className="odd text-center">
                    {odd}
                </div>
                <Button className="team_button" bsStyle={styleBet(teamIndex, userBet)}
                        onClick={() => betAction(teamIndex, fixtureId)} bsSize="large">
                    {team.name}
                </Button>
            </Col>
        );
    };

    const scoreInput = function () {
        return (
            <Col md={2} sm={2} key={team.name + 'score'}>
                <ScoreInput betAction={props.betAction} isHomeTeam={props.isHomeTeam}
                            fixtureId={props.fixtureId}/>
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
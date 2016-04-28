import React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'

class MatchSide extends React.Component {
    styleBet(team, bet) {
        if (bet === 'x') {
            return 'info';
        }
        return team === bet ? 'success' : 'warning';
    }

    getTeamLogo(team) {
        return (
            <Col md={3} sm={3} key={team.name + ' logo'} >
                <Image src={team.logo} responsive/>
            </Col>
        );
    }

    getTeamBetButton() {
        const {team, userBet, betAction, isHomeTeam, fixtureId} = this.props;
        let teamIndex = isHomeTeam ? 1 : 2;

        return (
            <Col md={9} sm={9} key={team.name + ' button'}>
                <Button className="team_button" bsStyle={this.styleBet(teamIndex, userBet)} bsSize="large"
                        onClick={() => betAction(teamIndex, fixtureId)} >
                    {team.name}
                </Button>
            </Col>
        );
    }

    render() {
        const {team, isHomeTeam, fixtureId, betAction} = this.props;
        let betSideElements = [this.getTeamLogo(team), this.getTeamBetButton()];
        let sideClass = isHomeTeam ? 'home-team' : 'away-team';

        return (
            
                <Row className={'team ' + sideClass} key={team.name}  >
                    {isHomeTeam ? betSideElements : betSideElements.reverse()}
                </Row>
        );
    }
}

export default MatchSide;
import  React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'
import MatchSide from './MatchSide'

class Fixture extends React.Component {
    render() {
        const {homeTeam, awayTeam, userBet, fixtureId, betAction} = this.props;
        return (
            <Row className='fixture'>
                <Col md={4} sm={5} mdOffset={2} >
                    <MatchSide team={homeTeam} userBet={userBet} isHomeTeam={true} betAction={betAction}
                               fixtureId={fixtureId}/>
                </Col>
                <Col className="vs" md={1} sm={1}>
                    vs
                </Col>
                <Col md={4} sm={5}>
                    <MatchSide team={awayTeam} userBet={userBet} isHomeTeam={false} betAction={betAction}
                               fixtureId={fixtureId}/>
                </Col>
            </Row>

        );
    }
}
;

export default Fixture;
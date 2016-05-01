import  React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'
import MatchSide from './MatchSide'

function Fixture(props) {
    const {homeTeam, awayTeam, userBet, fixtureId, betAction} = props;
    
    return (
        <Row className='fixture'>
            <Col md={3} sm={6} mdOffset={3} smOffset={2}>
                <MatchSide team={homeTeam} userBet={userBet} isHomeTeam={true} betAction={betAction}
                           fixtureId={fixtureId}/>
            </Col>
            <Col className="vs" md={1} sm={1}>
                vs
            </Col>
            <Col md={3} sm={6}>
                <MatchSide team={awayTeam} userBet={userBet} isHomeTeam={false} betAction={betAction}
                           fixtureId={fixtureId}/>
            </Col>
        </Row>
    );
};

export default Fixture;
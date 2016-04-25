import  React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'
import MatchSide from './MatchSide'

class Fixture extends React.Component {
    render() {
        const {homeTeam, awayTeam, userBet, fixtureId, betAction} = this.props;
        return (
            <Row className='fixture'>
                <MatchSide team={homeTeam} userBet={userBet} isHomeTeam={true} betAction={betAction} fixtureId={fixtureId}/>
                <Col className="vs" md={2} sm={2}>
                    vs
                </Col>
                <MatchSide team={awayTeam} userBet={userBet} isHomeTeam={false} betAction={betAction} fixtureId={fixtureId}/>
            </Row>

        );
    }
};

export default Fixture;
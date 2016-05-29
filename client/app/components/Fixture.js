import  React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'
import MatchSide from './MatchSide'

function Fixture(props) {
    const {homeTeam, awayTeam, userBet, fixtureId, betAction} = props;

    return (
        <Row className='fixture'>
            <MatchSide team={homeTeam} userBet={userBet} isHomeTeam={true} betAction={betAction}
                       fixtureId={fixtureId}/>
            <div className="vs">
                {userBet === 0 ? 'draw' : 'vs'}
            </div>
            <MatchSide team={awayTeam} userBet={userBet} isHomeTeam={false} betAction={betAction}
                       fixtureId={fixtureId}/>
        </Row>
    );
};

export default Fixture;
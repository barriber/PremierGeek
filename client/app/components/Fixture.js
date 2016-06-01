import  React from 'react';
import moment from 'moment';
import {Button, Row, Col, Image} from 'react-bootstrap'
import MatchSide from './MatchSide'

function Fixture(props) {
    const {homeTeam, awayTeam, userBet, fixtureId, betAction, odds, date} = props;

    return (
        <div className="fixture-container">
            <Row className='fixture'>
                <MatchSide team={homeTeam} userBet={userBet} isHomeTeam={true} betAction={betAction}
                           fixtureId={fixtureId} odd={odds[1]}/>
                <div className="vs">
                    <div>
                        {odds[0]}
                    </div>
                    {userBet === 0 ? 'draw' : 'vs'}
                </div>
                <MatchSide team={awayTeam} userBet={userBet} isHomeTeam={false} betAction={betAction}
                           fixtureId={fixtureId} odd={odds[2]}/>
            </Row>
            <div className="text-center">
                {moment(date).format("MMMM Do, HH:mm")}
            </div>
        </div>
    );
};

export default Fixture;
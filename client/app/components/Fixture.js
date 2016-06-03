import  React from 'react';
import moment from 'moment';
import {Button, Row, Col, Image} from 'react-bootstrap'
import MatchSide from './MatchSide'

export default function Fixture({homeTeam, awayTeam, userBet, fixtureId, betAction, odds, date}) {
    const getBetIndex = function (homeScore, awayScore) {
        if(_.isInteger(homeScore) && _.isInteger(awayScore)) {
            if(homeScore === awayScore) {
                return 0;
            } else {
                return homeScore > awayScore ? 1 : 2;
            }
        }

        return null;
    };

    const betIndex = getBetIndex(userBet.homeTeamScore, userBet.awayTeamScore)
    return (
        <div className="fixture-container">
            <Row className='fixture'>
                <MatchSide team={homeTeam} betIndex={betIndex} isHomeTeam={true} betAction={betAction}
                           fixtureId={fixtureId} odd={odds[1]} score={userBet.homeTeamScore}/>
                <div className="vs">
                    <div>
                        {odds[0]}
                    </div>
                    {userBet === 0 ? 'draw' : 'vs'}
                </div>
                <MatchSide team={awayTeam} betIndex={betIndex} isHomeTeam={false} betAction={betAction}
                           fixtureId={fixtureId} odd={odds[2]} score={userBet.awayTeamScore}/>
            </Row>
            <div className="text-center match-date">
                {moment(date).format("MMMM Do, HH:mm")}
            </div>
        </div>
    );
};
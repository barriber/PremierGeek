import React from 'react';
import _ from 'lodash';
import {Button, Row} from 'react-bootstrap'

export default function ({fixtures, persistBets}) {
    const placeBet = function () {
        const userBets = _.filter(fixtures, (fixture) => {
            return fixture.bet.homeTeamScore !== null && fixture.bet.awayTeamScore !== null;
        });

        const persistObj = _.map(userBets, (userBet) => {
            return {matchId: userBet.id, bet: userBet.bet};
        });

        persistBets(persistObj);
    };

    return (
        <Row className="text-center">
            <Button bsStyle="primary" className="bet-button" bsSize="large" onClick={() => placeBet()}>
                submit bets
            </Button>
        </Row>
    )
}
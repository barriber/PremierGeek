import React from 'react';
import _ from 'lodash';
import {Button, Row} from 'react-bootstrap'
import moment from 'moment';

export default function ({fixtures, persistBets, persistedDate}) {
    const placeBet = function () {
        const userBets = _.filter(fixtures, (fixture) => {
            return fixture.bet.homeTeamScore !== null && fixture.bet.awayTeamScore !== null
                && moment().add(1, 'minute').isSameOrBefore(fixture.date);
        });

        const persistObj = _.map(userBets, (userBet) => {
            return {matchId: userBet.id, bet: userBet.bet};
        });

        persistBets(persistObj);
    };
    const submitMessage = function () {
        if (persistedDate) {
            const submitMessage = `bets Submitted at ${moment(persistedDate).format('HH:mm')}`
            return (
                <div className="submit-message">
                    {submitMessage}
                </div>
            )
        } else {
            return null;
        }
    }

    return (
        <Row className="text-center">
            <Button bsStyle="primary" className="bet-button" bsSize="large" onClick={() => placeBet()}>
                Submit your bets
            </Button>
            {submitMessage()}
        </Row>
    )
}
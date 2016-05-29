import React from 'react';
import _ from 'lodash';
import {Button, Row, Col, Image} from 'react-bootstrap'
import {persistBets} from '../actions/actions';

export default function (props) {
    const {fixtures, persistBets} = props;
    const placeBet = function () {
        const userBettings = _.filter(fixtures, (fixture) => {
            return fixture.bet !== '';
        });

        const persistObj = _.map(userBettings, (userBet) => {
            return {matchId: userBet.id, bet: userBet.bet};
        });

        persistBets(persistObj);
    };

    return (
        <Row className="text-center">
            <Button bsStyle="primary" className="bet-button" bsSize="large" onClick={() => placeBet()}>
                place your bet
            </Button>
        </Row>
    )
}
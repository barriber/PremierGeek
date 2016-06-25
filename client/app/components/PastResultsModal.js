import React from 'react';
import {Row, Col, Image, Modal} from 'react-bootstrap';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

export default function PastResultsModal({bets, showModal, closeModal, userName}) {
    const onGoingMatch = function (isEnded) {
        return (
            <Col md={3} sm={2} className="on-going-match">
                {!isEnded ? 'On Going' : null}
            </Col>
        );
    };

    const betResult = function (result, bet) {
        return (
            <Col md={2} sm={2} className="bet-result text-center" >
                <div>
                    Result
                    <div>
                        {result.homeScore} : {result.awayScore}
                    </div>
                </div>
                <div>
                    Bet
                    <div>
                        {bet.homeTeamScore} : {bet.awayTeamScore}
                    </div>
                </div>
            </Col>
        )
    }

    const showUserResults = function () {
        const orderedScores = orderBy(bets, ['startTime'], ['desc']);
        return (
            <div>
                {
                    map(orderedScores, (bet) => {
                        const teams = bet.teams;
                        return (
                            <Row className="historical-bet-row" key={teams.homeTeamLogo + teams.awayTeamLogo}>
                                <Col md={2} sm={3}>
                                    <Image src={teams.homeTeamLogo} responsive circle/>
                                </Col>
                                {betResult(bet.matchResult, bet.bet)}
                                <Col md={2} sm={3}>
                                    <Image src={teams.awayTeamLogo} responsive circle/>
                                </Col>
                                {onGoingMatch(bet.isEnded)}
                                <Col md={1} mdOffset={1} sm={2} className="text-center">
                                    {bet.points}
                                </Col>
                            </Row>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <Modal show={showModal} onHide={() => closeModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{userName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showUserResults()}
            </Modal.Body>

        </Modal>
    )
}
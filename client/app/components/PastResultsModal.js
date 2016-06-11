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

    const betResult = function (score, bet) {
        return (
            <Col md={1} sm={1}>
                {score}
                ({bet})
            </Col>
        )
    }

    const showUserResults = function () {
        const orderedScores = orderBy(bets, ['startTime'], ['desc']);
        return (
            <div>
                {
                    map(orderedScores, (bet) => {
                        return (
                            <Row className="historical-bet-row" key={bet.teams.homeTeamLogo}>
                                <Col md={2} sm={3}>
                                    <Image src={bet.teams.homeTeamLogo} responsive circle/>
                                </Col>
                                {betResult(bet.matchResult.homeScore, bet.bet.homeTeamScore)}
                                {betResult(bet.matchResult.awayScore, bet.bet.awayTeamScore)}
                                <Col md={2} sm={3}>
                                    <Image src={bet.teams.awayTeamLogo} responsive circle/>
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
import React from 'react';
import {Row, Col, Image, Modal} from 'react-bootstrap';
import map from 'lodash/map';

export default function PastResultsModal({bets, showModal, closeModal, userName}) {
    const teamLogo = function (src) {
        return (
            <Col md={3}>
                <Image src={src} responsive circle/>
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
        return (
            <div>
                {
                    map(bets, (bet) => {
                        return (
                            <Row className="historical-bet-row" key={bet.teams.homeTeamLogo}>
                                <Col md={2} sm={4}>
                                    <Image src={bet.teams.homeTeamLogo} responsive circle/>
                                </Col>
                                {betResult(bet.matchResult.homeScore, bet.bet.homeTeamScore)}
                                {betResult(bet.matchResult.awayScore, bet.bet.awayTeamScore)}
                                <Col md={2} sm={4}>
                                    <Image src={bet.teams.awayTeamLogo} responsive circle/>
                                </Col>

                                <Col md={1} mdOffset={4} sm={2} className="text-center">
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
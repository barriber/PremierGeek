import React from 'react';
import {Button, Row, Col, Image} from 'react-bootstrap'

export default function (porps) {
    return (
        <Row className="text-center">
            <Button bsStyle="primary bet-button"  bsSize="large" >
                place your bet
            </Button>
        </Row>
    )
}
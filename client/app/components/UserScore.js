import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default function UserScroe({points, userName, image, position}) {
    const firstPlaceClass = position === 1 ? 'first-place' : '';
    return (
        <Row className={`user-score ${firstPlaceClass}`}>
            <Col md={1} sm={1} >
                {position}
            </Col>
            <Col md={2} sm={3}>
                <Image src={image} responsive circle/>
            </Col>
            <Col md={4} sm={4} className="scores-user-name">
                {userName}
            </Col>
            <Col md={2} mdOffset={3} sm={2} smOffset={2} className="text-center">
                {points}
            </Col>
        </Row>
    )
}
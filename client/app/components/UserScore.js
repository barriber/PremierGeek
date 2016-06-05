import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default function UserScroe({points, userName, image, position}) {
    return (
        <Row>
            <Col md={1}>
                {position}
            </Col>
            <Col md={3}>
                <Image src={image} responsive circle/>
            </Col>
            <Col md={4}>
                {userName}
            </Col>
            <Col md={1}>
                {points}
            </Col>
        </Row>
    )
}
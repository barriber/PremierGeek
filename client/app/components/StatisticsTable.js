import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default function StatisticsTable({points, user, position}) {
    return (
        <div>
            <Row className={`user-score`}>
                <Col md={1} sm={1}>
                    {position}
                </Col>
                <Col md={2} sm={3}>
                    <Image src={user.image} responsive circle/>
                </Col>
                <Col md={4} sm={4} className="scores-user-name" >
                    {user.name}
                </Col>
                <Col md={2} mdOffset={3} sm={2} smOffset={2} className="text-center">
                    {points}
                </Col>
            </Row>
        </div>
    )
}
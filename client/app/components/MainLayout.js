import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default function (props) {
    return (
        <Grid fluid={true}>
            <Row className="main-header">
                <Col md={12} sm={12}>
                    <header >
                    </header>
                </Col>
            </Row>
            <Row className="main-row">
                <Col md={1} sm={1} className="left-pane">
                    <aside >
                    </aside>
                </Col>
                <Col md={9} sm={9} className="main-section">
                    <main >
                        {props.children}
                    </main>
                </Col>
            </Row>
        </Grid>
    );
}
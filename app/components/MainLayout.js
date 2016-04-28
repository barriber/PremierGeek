import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default function (props) {
    return (
        <Grid fluid={true}>
            <Row className="main-header">
                <Col md={12} sm={12}>
                    <header >
                        HEADER
                    </header>
                </Col>
            </Row>
            <Row className="main-row">
                <Col md={1} sm={1} className="left-pane">
                    <aside >
                        LEFT
                    </aside>
                </Col>
                <Col md={9} sm={9} className="main-section">
                    <main >
                        {props.children}
                    </main>
                </Col>
            </Row>
            <Row className="footer">
                <Col md={12} sm={12}>
                    <div className="main-footer">Footer</div>
                </Col>
            </Row>
        </Grid>
    );
}
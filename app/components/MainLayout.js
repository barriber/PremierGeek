import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default function (props) {
    return (
        <Grid fluid={true}>
            <Row>
                <header className="main-header">
                    HEADER
                </header>
            </Row>
            <Row className="main-row">
                <Col md={1}>
                    <aside className="left-pane">
                        LEFT
                    </aside>
                </Col>
                <Col md={11} sm={12}>
                    <main className="main-section">
                        MAIN
                        {props.children}
                    </main>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12} >
                    <footer className="main-footer">Footer</footer>
                </Col>
            </Row>
        </Grid>
    );
}
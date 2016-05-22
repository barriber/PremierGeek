import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {verifySession} from '../actions/authentication';


class Layout extends Component {
    componentDidMount() {
        this.props.dispatch(verifySession());
    }

    render() {
        return (
            <Grid fluid={true}>
                <Row className="main-header">
                    <Col md={12} sm={12}>
                        <header >
                        </header>
                    </Col>
                </Row>
                <Row className="main-row">
                    <Col md={12} sm={12} className="main-section">
                        <main >
                            {this.props.children}
                        </main>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    let basicReducerJsObj = state.basicReducer.toJS();
    const {isFetching, lastUpdated, nextRound, fixtures} = basicReducerJsObj || {
        isFetching: true,
        fixtures: [],
        nextRound: -1
    };

    return {isFetching, lastUpdated, nextRound, fixtures}
}


export default connect(mapStateToProps)(Layout);
import  React, {Component} from 'react';
import {Grid, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded} from '../actions/actions';
import RoundFixtures from './RoundFixtures';

class MainPage extends Component {
    componentDidMount() {
        const {dispatch, games} = this.props;
        dispatch(fetchPostsIfNeeded());
    }

    render() {
        const {isFetching, lastUpdated, nextRound, matches} = this.props;
        return (
            <Grid>
                <Row className="header">
                </Row>
                <Row className="body">
                    <Col className="left_pane" md={2}>
                    </Col>
                    <Col className="main_section" md={8} sm={12}>
                        <RoundFixtures nextRound={nextRound} matches={matches}/>
                    </Col>
                    <Col className="right_pane" md={2}>
                    </Col>
                </Row>
                <Row className="footer">
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const {basicReducer} = state;
    let basicReducerJsObj = basicReducer.toJS();
    const {isFetching, lastUpdated, nextRound, matches} = basicReducerJsObj || {
        isFetching: true,
        matches: [],
        nextRound: -1
    }

    return {isFetching, lastUpdated, nextRound, matches}
}

export default connect(mapStateToProps)(MainPage);
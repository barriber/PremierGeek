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
        const {isFetching, lastUpdated, nextRound, fixtures, dispatch} = this.props;
        return (
            <Grid>
                
                <Row className="body">
                    <Col className="left_pane" md={1}>
                    </Col>
                    <Col className="main_section" md={9} sm={12}>
                        <RoundFixtures nextRound={nextRound} fixtures={fixtures} dispatch={dispatch}/>
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
    let basicReducerJsObj = state.basicReducer.toJS();
    const {isFetching, lastUpdated, nextRound, fixtures} = basicReducerJsObj || {
        isFetching: true,
        fixtures: [],
        nextRound: -1
    };

    return {isFetching, lastUpdated, nextRound, fixtures}
}

export default connect(mapStateToProps)(MainPage);
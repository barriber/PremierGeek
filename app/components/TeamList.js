import  React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded} from '../actions/actions';
import RoundBetList from './RoundBetList';

class MainPage extends Component {
    componentDidMount() {
        const {dispatch, games} = this.props;
        dispatch(fetchPostsIfNeeded());
    }

    render() {
        const {isFetching, lastUpdated, nextRound, matches} = this.props;
        return (
            <div>
                <RoundBetList nextRound={nextRound} matches={matches}/>
            </div>
        );
    }
}

//var TeamList = React.createClass({
//    render: function () {
//        return (
//            <div>
//                MANCHESTER !!
//            </div>
//        );
//
//    }
//});

function mapStateToProps(state) {
    const {basicReducer} = state;

    const {isFetching, lastUpdated, nextRound, matches} = basicReducer.nextBetRound || {
        isFetching: true,
        matches: [],
        nextRound: -1
    }

    return {isFetching, lastUpdated, nextRound, matches}
}

export default connect(mapStateToProps)(MainPage);
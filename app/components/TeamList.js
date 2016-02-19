import  React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded} from '../actions/actions';

class MainPage extends Component {
    componentDidMount() {
        const {dispatch, games} = this.props;
        dispatch(fetchPostsIfNeeded(games));
    }
    render() {
        return (
            <div>
                Boris
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

    return basicReducer;
}

export default connect(mapStateToProps)(MainPage);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllReults} from '../actions/resultsActions'

export default class Results extends Component {
    componentDidMount() {
        this.props.dispatch(getAllReults());
    }

    render() {
            return (
                <h1>
                    Results
                </h1>
            );
    }
}

function mapStateToProps(state) {
    let authReducer = state.authReducer;
    const {isAuthenticated, isFetching, user} = authReducer || {
        isAuthenticated: false,
        isFetching: false,
        user: {
            userImage: ''
        }
    };

    return {isAuthenticated, isFetching, user}
}
export default connect(mapStateToProps)(Results);
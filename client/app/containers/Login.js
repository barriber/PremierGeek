import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {facebookLogin} from '../actions/authentication';

class Login extends Component {
    loginFaceBook() {
        this.props.dispatch(facebookLogin())
    }
    render() {
        return (
            <div>
                <a href="/api/login">FaceBook</a>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Login);
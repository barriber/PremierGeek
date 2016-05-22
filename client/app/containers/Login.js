import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-box">
                    <div className="login-welcome">
                        Welcome to Premier Geek!
                    </div>
                    <Row>
                        <Col md={12}>
                            <a href="/api/login" className="btn btn-block btn-social btn-lg btn-facebook">
                                <span className="fa fa-facebook"></span> Sign in with Facebook
                            </a>
                            <a href="/api/login" className="btn btn-block btn-social btn-lg btn-google">
                                <span className="fa fa-google"></span> Sign in with Google
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Login);
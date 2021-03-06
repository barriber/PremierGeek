import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {verifySession, logoutRequset} from '../actions/authentication';
import Header from '../components/Header';

class Layout extends Component {
    componentDidMount() {
        this.props.dispatch(verifySession());
    }
    
    logout() {
        this.props.dispatch(logoutRequset());
    }

    componentWillReceiveProps(nextProps) {
        const {isAuthenticated, isFetching, location} = nextProps;
        if (!isAuthenticated && !isFetching && location.pathname !== '/login') {
            this.context.router.push('/login');
        }
    }

    render() {
        if (this.props.isAuthenticated || location.pathname === '/login') {
            return (
                <div>
                    <Header user={this.props.user} logout={() => this.logout()}/>
                    <Grid fluid={true}>
                        {this.props.children}
                    </Grid>
                </div>
            );
        } else {
            return null;
        }
    }
}

Layout.contextTypes = {
    router: React.PropTypes.object.isRequired
};

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


export default connect(mapStateToProps)(Layout);
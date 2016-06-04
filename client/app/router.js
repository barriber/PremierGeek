import React from 'react';
import {Router, Route, hashHistory, IndexRoute, browserHistory, Redirect} from 'react-router';
import Layout from './containers/Layout';
import RoundFixtures from './components/RoundFixtures';
import Results from './containers/Results';
import Login from './containers/Login';
import Rules from './components/Rules';

export default (
    <Router history={hashHistory}>
        <Route component={Layout}>
            <Route path="/" component={RoundFixtures}/>
            <Redirect from="_=_" to="/"/> // facebook hack
            <Route path="results" component={Results}/>
            <Route path="rules" component={Rules}/>
        </Route>
        <Route path="login" component={Login}/>
    </Router>
);
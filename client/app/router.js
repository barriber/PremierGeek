import React from 'react';
import {Router, Route, hashHistory, IndexRoute, browserHistory, Redirect } from 'react-router';
import MainLayout from './components/MainLayout';
import RoundFixtures from './components/RoundFixtures';
import Login from './containers/Login';

export default (
    <Router history={hashHistory}>
        <Route component={MainLayout}>
             <Redirect from="_=_" to="/" /> // facebook hack
            <Route path="/" component={RoundFixtures}/>
            <Route path="results" component={RoundFixtures}/>
        </Route>
        <Route path="login" component={Login}/>
    </Router>
);
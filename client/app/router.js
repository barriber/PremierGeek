import React from 'react';
import {Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router';
import MainLayout from './components/MainLayout';
import RoundFixtures from './components/RoundFixtures';
import Login from './containers/Login';

export default (
    <Router history={browserHistory }>
        <Route component={MainLayout}>
            <Route path="/" component={RoundFixtures}/>
            <Route path="login" component={Login}/>
            <Route path="results" component={RoundFixtures}/>
        </Route>
    </Router>
);
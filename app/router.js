import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import MainLayout from './components/MainLayout';
import RoundFixtures from './components/RoundFixtures';

export default (
  <Router history={browserHistory}>
      <Route component={MainLayout}>
          <Route path="/" component={RoundFixtures} />
          <Route path="/login" component={RoundFixtures} />
          <Route path="/results" component={RoundFixtures} />
      </Route>
  </Router>
);
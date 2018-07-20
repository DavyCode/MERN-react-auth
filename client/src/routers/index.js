import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'
import HomePage from '../components/HomePage'
import NotFoundPage from '../components/NotFoundPage'
import Logout from '../components/Logout'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory();

export default () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PublicRoute path="/register" component={RegisterPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <Route path="/logout" component={Logout}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
);

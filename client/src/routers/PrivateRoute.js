import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/partials/Header';

export const PrivateRoute = (props) => {
  const { isAuthenticated, component: Component, ...rest} = props;

  return (
    <Route {...rest} component={(props) => (
      isAuthenticated? (
        <div>
          <Header/>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
      )
    )}/>
  )
};
  
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(PrivateRoute);




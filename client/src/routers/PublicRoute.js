import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/partials/Header'

export const PublicRoute = (props) => {
  const { isAuthenticated, component: Component, ...rest } = props;

  return (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <div>
            <Header />
            <Component {...props} />
          </div>
        )
      )}
    />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(PublicRoute);





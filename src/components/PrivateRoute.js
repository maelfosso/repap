import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated ? <Component {...props} /> : <Redirect to="/auth" />
    )}
  />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PrivateRoute;

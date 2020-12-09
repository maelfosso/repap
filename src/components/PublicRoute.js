import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable react/jsx-props-no-spreading */
const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated
        ? <Redirect to="/" />
        : (
          <Component {...props} />
        )
    )}
  />
);

PublicRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PublicRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route {...rest} render={ props => (
      authenticated ? <Redirect to="/" /> : <Component {...props} />      
    )}/>
  )
}

export default PublicRoute;

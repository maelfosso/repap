import React from 'react';
import {
  Route, Switch, Redirect, useRouteMatch,
} from 'react-router-dom';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';

const Auth = () => {
  const match = useRouteMatch();

  return (
    <div className="Auth">
      <Switch>
        <Route path={`${match.path}/sign-in`}>
          <SignIn />
        </Route>
        <Route path={`${match.path}/sign-up`}>
          <SignUp />
        </Route>
        <Redirect exact from={`${match.path}`} to={`${match.path}/sign-in`} />
      </Switch>
    </div>
  );
};

export default Auth;

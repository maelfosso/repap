import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { Spin } from 'antd';
import Header from '../containers/Header';
import { checkToken } from '../actions/auth';
import '../css/App.scss';
import 'antd/dist/antd.css';import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import RMap from '../containers/RMap';
import HotelDetails from './HotelDetails';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});
// const { path } = useRouteMatch();

class App extends React.Component {
  state = {
    isMobile,
    showShadow: false,
    loading: false
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });

    const { checkToken } = this.props;
    const jwtToken = localStorage.getItem('token');
    checkToken(jwtToken);
  }

  componentDidUpdate = (prevState, prevProps) => {
    const { isAuthenticated } = this.props;
    
  }

  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === 'leave' });
  }

  render() {

    // const { path } = useRouteMatch();
    const { isChecking, isAuthenticated } = this.props;

    if (isChecking) {
      console.log("is checking..");
      return (
        <div>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <Router>
      <div>
        <Header key="header" className={this.state.showShadow ? 'show-shadow' : ''} />
        {/* <Router>
          <Switch>
            <Route exact path="/">
              <RMap /> 
            </Route>
            <Route exact path="hotels/:hotelId">
              <HotelDetails />
            </Route>
          </Switch>
          
        </Router> */}
        { isAuthenticated ? 
            <RMap />
            : null 
          }
      </div>
      </Router>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  checkToken: (token) => dispatch(checkToken(token))
});

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isChecking: state.authReducer.isChecking
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

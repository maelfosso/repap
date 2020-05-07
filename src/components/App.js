import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { Spin } from 'antd';
import Header from '../containers/Header';
import { checkToken } from '../actions/auth';
import '../css/App.scss';
import 'antd/dist/antd.css';import {
  BrowserRouter as Router
} from "react-router-dom";
import RMap from '../containers/RMap';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

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
    const { isChecking, isAuthenticated } = this.props;

    if (isChecking) {
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

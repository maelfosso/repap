import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Header from '../containers/Header';
import { checkToken } from '../actions/auth';
import '../css/App.scss';
import RMap from '../containers/RMap';

class App extends React.Component {
  componentDidMount() {
    const { checkToken } = this.props;
    const jwtToken = localStorage.getItem('token');
    checkToken(jwtToken);
  }

  render() {
    const { isChecking, isAuthenticated } = this.props;

    if (isChecking) {
      return (
        <div>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <Router>
        <div>
          <Header key="header" />

          { isAuthenticated
            ? <RMap />
            : null}
        </div>
      </Router>
    );
  }
}


App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isChecking: PropTypes.bool.isRequired,

  checkToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  checkToken: token => dispatch(checkToken(token)),
});

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isChecking: state.authReducer.isChecking,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

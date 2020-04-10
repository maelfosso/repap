import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { Spin } from 'antd';
import Header from '../containers/Header';
import { checkToken } from '../actions/auth';
import '../App.scss';
import 'antd/dist/antd.css';
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
    // checkToken(jwtToken);
  }

  componentDidUpdate = (prevState, prevProps) => {
    const { isAuthenticated } = this.props;
    
  }

  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === 'leave' });
  }

  render() {
    const { isChecking } = this.props;

    if (isChecking) {
      console.log("is checking..");
      return (
        <div>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <div>
        <Header key="header" className={this.state.showShadow ? 'show-shadow' : ''} />
        <RMap />
      </div>
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

import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Button, Menu, Dropdown,
  Row, Col, Space
} from 'antd';

import { logout } from '../actions/auth';

const Header = (props) => {

  const { isAuthenticated } = props;

  const signOut = () => {
    const { logout, history } = props;
    history.push('/');
    logout();
  };

  const renderCurrentUser = () => {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Button type="link" onClick={() => signOut()}>Log out</Button>
        </Menu.Item>
      </Menu>
    );

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return <span />;
    }

    return <Dropdown overlay={menu}><span>{user.name}</span></Dropdown>;
  }
  
  return (
    <header>
      <Row>
        <Col span={4}>
          <span className="logo-wrapper">
            <i className="logo" />
            <span>Repap</span>
          </span>
        </Col>
        <Col span={20}>
          <Row justify="space-between">
            <Col>
              { isAuthenticated
                ? (
                  <ul>
                    <li>
                      <Link to="/hotels">All hotels</Link>
                    </li>
                    <li>
                      <Link to="/favorites">Favorites</Link>
                    </li>
                  </ul>
                )
                : null }
            </Col>
            <Col>
              { isAuthenticated
                ? (
                  <div className="button">
                    {renderCurrentUser()}
                  </div>
                )
                : (
                  <div className="button">
                    <Space>
                      <Button href="/auth/sign-in">Login</Button>
                      <Button href="/auth/sign-up">Registration</Button>
                    </Space>
                  </div>
                )}
            </Col>
          </Row>
        </Col>

      </Row>

    </header>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,

  history: PropTypes.object.isRequired,
  
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

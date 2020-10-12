import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  message, Button,
  Form, Input, Checkbox,
  Typography
} from 'antd';
import {
  UserOutlined, LockOutlined
} from '@ant-design/icons';

import { login } from '../actions/auth';

const { Title } = Typography;
const key = 'auth/sign-in';

const SignIn = (props) => {
  const loginForm = React.createRef();

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const {
        isLoginPending, isLoginFailed, isLoginSuccess
      } = props;

      if (isLoginPending) {
        onLoginPending();
      }
      if (isLoginSuccess) {
        onLoginSuccess();
      }
      if (isLoginFailed) {
        onLoginFailed();
      }
    }
  });

  const onLoginPending = () => {
    message.loading('Login in progress', 1, key);
  }

  const onLoginSuccess = () => {
    message.success({ content: 'Login successful!', key });
  }

  const onLoginFailed = () => {
    message.error({ content: 'Sorry login failed!', key });
  }

  const onSignInFinish = (values) => {
    const { login } = props;
    const { username, password } = values;

    login(username, password);
  }

  return (
    <div>
      <Title>Sign In</Title>
      <Form
        name="sign_in"
        ref={loginForm}
        className="sign-in-form"
        initialValues={{ remember: true }}
        onFinish={onSignInFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Email or Phone number!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email or Phone number'" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Button type="link" className="forgot">
            Forgot password
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            Log in
          </Button>
          Or
          <Button type="link" href="/auth/sign-up">Register now!</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

SignIn.propTypes = {
  isLoginFailed: PropTypes.bool.isRequired,
  isLoginSuccess: PropTypes.bool.isRequired,
  isLoginPending: PropTypes.bool.isRequired,

  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

const mapStateToProps = state => ({
  isLoginFailed: state.authReducer.isLoginFailed,
  isLoginSuccess: state.authReducer.isLoginSuccess,
  isLoginPending: state.authReducer.isLoginPending,

  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));


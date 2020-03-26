import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { message, Tooltip, Typography, Button, Modal, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { login } from '../actions/auth';

const key = 'auth';

class Header extends React.Component {

  state = {
    signInModalVisible: false,
    signUpModalVisible: false
  };

  formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  openSignInModal = (e) => {
    this.setState({
      signInModalVisible: !this.state.signInModalVisible,
      signUpModalVisible: false
    });
  }

  openSignUpModal = (e) => {
    this.setState({
      signInModalVisible: false,
      signUpModalVisible: !this.state.signUpModalVisible,
    });
  }

  onSignInFinish = values => {
    const { login } = this.props;
    const { username, password } = values;
    
    login(username, password);
  }

  onSignUpFinish = values => {
    console.log('Received values of form: ', values);
  }
  
  onLoginPending = () => {
    message.loading({ content: 'Login in progress', key});
  }

  onLoginSuccess = () => {
    message.success({ content: 'Login successful!', key });
  }

  onLoginFailed = () => {
    message.error({ content: 'Sorry login failed!', key });
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { isLoginPending, isLoginFailed, isLoginSuccess } = this.props;

    if (isLoginPending) {
      this.onLoginPending();
    }
    if (isLoginSuccess) {
      this.onLoginSuccess();
    }
    if (isLoginFailed) {
      this.onLoginFailed();
    }
  }

  render() {
    return (
      <header>
        <span className="logo-wrapper">
          <i className="logo" />
          <span>Repap</span>
        </span>
        <div className="button">
          <Button onClick={this.openSignInModal}>Login</Button>
          <Button onClick={this.openSignUpModal}>Registration</Button>
        </div>
        <Modal
          title="Login"
          centered
          visible={this.state.signInModalVisible}
          footer={null}
          onCancel={this.openSignInModal}
        >          
          <Form
            name="sign_in"
            className="sign-in-form"
            initialValues={{ remember: true }}
            onFinish={this.onSignInFinish}
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

              <a className="forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Log in
              </Button>
              Or <a onClick={() => {this.openSignInModal(); this.openSignUpModal();}}>Register now!</a>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Registration"
          centered
          visible={this.state.signUpModalVisible}
          footer={null}
          onCancel={this.openSignUpModal}
        > 
          <Form
            {...this.formItemLayout}
            name="sign_up"
            className="sign-up-form"
            onFinish={this.onSignUpFinish}
            initialValues={{
              
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="name"
              label={
                <span>
                  Name&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Register
              </Button>
              Or <a onClick={() => {this.openSignUpModal(); this.openSignInModal();}}>Login now!</a>
            </Form.Item>
          </Form>
        </Modal>
        
      </header>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))  
});
const mapStateToProps = state => ({
  isLoginFailed: state.authReducer.isLoginFailed,
  isLoginSuccess: state.authReducer.isLoginSuccess,
  isLoginPending: state.authReducer.isLoginPending
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

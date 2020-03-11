import React from 'react';
import { Row, Col, Typography, Button, Modal, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const { Title } = Typography;

export default class Header extends React.Component {

  state = {
    signInModalVisible: false,
    signUpModalVisible: false
  };

  openSignInModal = (e) => {
    this.setState({
      signInModalVisible: !this.state.signInModalVisible,
      signUpModalVisible: false
    });
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  onSignInFinish = values => {
    console.log('Received values of form: ', values);
  }

  render() {
    return (
      <header {...this.props}>
        <span className="logo-wrapper">
          <i className="logo" />
          <span>Repap</span>
        </span>
        <div className="button">
          <Button onClick={this.openSignInModal}>Sign in</Button>
        </div>
        <Modal
          title="Sign In"
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
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </Modal>
      </header>
    );
  }

}

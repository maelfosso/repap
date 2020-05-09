import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  message, Tooltip, Alert, Button,
  Modal, Form, Input, Checkbox, Menu, Dropdown,
  Row, Col,
} from 'antd';
import {
  UserOutlined, LockOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Link,
} from 'react-router-dom';

import { login, registration, logout } from '../actions/auth';

const key = 'auth';

class Header extends React.Component {
  registrationErrors = [];

  registrationForm = React.createRef();

  loginForm = React.createRef();

  currentUser = {};

  constructor(props) {
    super(props);

    this.state = {
      signInModalVisible: false,
      signUpModalVisible: false,
    };

    this.formItemLayout = {
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

    this.tailFormItemLayout = {
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
  }


  openSignInModal = () => {
    const { signInModalVisible } = this.state;

    if (this.loginForm.current) {
      this.loginForm.current.resetFields();
    }

    this.setState({
      signInModalVisible: !signInModalVisible,
      signUpModalVisible: false,
    });
  }

  openSignUpModal = () => {
    const { signUpModalVisible } = this.state;

    if (this.registrationForm.current) {
      this.registrationForm.current.resetFields();
      this.registrationErrors = [];
    }

    this.setState({
      signInModalVisible: false,
      signUpModalVisible: !signUpModalVisible,
    });
  }

  onSignInFinish = values => {
    const { login } = this.props;
    const { username, password } = values;

    login(username, password);
  }

  onSignUpFinish = values => {
    const { registration } = this.props;
    const {
      name, email, phone, password, passwordConfirmation,
    } = values;

    registration(name, email, phone, password, passwordConfirmation);
  }

  onLoginPending = () => {
    message.loading({ content: 'Login in progress', key });
  }

  onLoginSuccess = () => {
    message.success({ content: 'Login successful!', key });
    this.setState({
      signInModalVisible: false,
    });
  }

  onLoginFailed = () => {
    message.error({ content: 'Sorry login failed!', key });
  }

  onRegistrationPending = () => {
    message.loading({ content: 'Registration in progress', key });
  }

  onRegistrationSuccess = () => {
    message.success({ content: 'Registration successful!', key });
    this.setState({
      signUpModalVisible: false,
    });
    this.registrationForm.current.resetFields();
  }

  onRegistrationFailed = errors => {
    message.error({
      content: `Sorry registration failed!\n${errors}`,
      key,
    });
  }

  componentDidUpdate = () => {
    const {
      isLoginPending, isLoginFailed, isLoginSuccess,
      isRegistrationPending, isRegistrationFailed, isRegistrationSuccess, registrationErrors,
      isAuthenticated,
    } = this.props;
    const { signUpModalVisible, signInModalVisible } = this.state;

    if (signInModalVisible) {
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


    if (signUpModalVisible) {
      if (isRegistrationPending) {
        this.onRegistrationPending();
      }
      if (isRegistrationSuccess) {
        this.onRegistrationSuccess();
      }
      if (isRegistrationFailed) {
        this.onRegistrationFailed(registrationErrors);
      }
      this.registrationErrors = registrationErrors;
    }

    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.currentUser = user;
    }
  }

  toggleModal = m => {
    if (m === 0) {
      this.openSignUpModal();
      this.openSignInModal();
    } else {
      this.openSignInModal();
      this.openSignUpModal();
    }
  }

  logout = () => {
    const { logout } = this.props;
    logout();
  };

  renderCurrentUser() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Button type="link" onClick={this.logout}>Log out</Button>
        </Menu.Item>
      </Menu>
    );

    const user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = user;

    return <Dropdown overlay={menu}><span>{this.currentUser.name}</span></Dropdown>;
  }

  render() {
    const { isRegistrationFailed, registrationErrors, isAuthenticated } = this.props;
    const { signUpModalVisible, signInModalVisible } = this.state;

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
                      {this.renderCurrentUser()}
                    </div>
                  )
                  : (
                    <div className="button">
                      <Button onClick={this.openSignInModal}>Login</Button>
                      <Button onClick={this.openSignUpModal}>Registration</Button>
                    </div>
                  )}
              </Col>
            </Row>
          </Col>

        </Row>
        <Modal
          title="Login"
          centered
          visible={signInModalVisible}
          footer={null}
          onCancel={this.openSignInModal}
        >
          <Form
            name="sign_in"
            ref={this.loginForm}
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

              <Button type="link" className="forgot">
                Forgot password
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Log in
              </Button>
              Or
              <Button type="link" onClick={() => this.toggleModal(1)}>Register now!</Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Registration"
          centered
          visible={signUpModalVisible}
          footer={null}
          onCancel={this.openSignUpModal}
        >
          <Form
            {...this.formItemLayout}
            name="sign_up"
            className="sign-up-form"
            onFinish={this.onSignUpFinish}
            initialValues={{}}
            ref={this.registrationForm}
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

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="name"
              label={(
                <span>
                  Name&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              )}
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

            <div>
              { isRegistrationFailed
                && registrationErrors
                && registrationErrors.map(error => <Alert key={error.length} message={error} type="error" />) }
            </div>

            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>
                I have read the
                <Button type="link">agreement</Button>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Register
              </Button>
              Or
              <Button type="link" onClick={() => this.toggleModal(0)}>Login now!</Button>
            </Form.Item>
          </Form>
        </Modal>

      </header>
    );
  }
}

Header.propTypes = {
  isLoginFailed: PropTypes.bool.isRequired,
  isLoginSuccess: PropTypes.bool.isRequired,
  isLoginPending: PropTypes.bool.isRequired,

  isRegistrationFailed: PropTypes.bool.isRequired,
  isRegistrationSuccess: PropTypes.bool.isRequired,
  isRegistrationPending: PropTypes.bool.isRequired,
  registrationErrors: PropTypes.instanceOf(Array).isRequired,

  isAuthenticated: PropTypes.bool.isRequired,

  login: PropTypes.func.isRequired,
  registration: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: (username, password) => dispatch(login(username, password)),
  registration: (name, email, phone,
    password, passwordConfirmation) => dispatch(registration(name, email, phone,
    password, passwordConfirmation)),
});

const mapStateToProps = state => ({
  isLoginFailed: state.authReducer.isLoginFailed,
  isLoginSuccess: state.authReducer.isLoginSuccess,
  isLoginPending: state.authReducer.isLoginPending,

  isRegistrationFailed: state.authReducer.isRegistrationFailed,
  isRegistrationSuccess: state.authReducer.isRegistrationSuccess,
  isRegistrationPending: state.authReducer.isRegistrationPending,
  registrationErrors: state.authReducer.registrationErrors,

  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

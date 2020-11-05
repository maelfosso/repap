import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  message, Tooltip, Alert, Button,
  Form, Input,
  Typography,
} from 'antd';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { registration } from '../actions/auth';

const { Title } = Typography;
const key = 'auth/sign-in';

const formItemLayout = {
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

const SignUp = props => {
  const {
    isRegistrationPending, isRegistrationFailed, isRegistrationSuccess, registrationErrors,
  } = props;

  const registrationForm = React.createRef();

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (isRegistrationPending) {
        onRegistrationPending();
      }
      if (isRegistrationSuccess) {
        onRegistrationSuccess();
      }
      if (isRegistrationFailed) {
        onRegistrationFailed(registrationErrors);
      }
    }
  });

  const onRegistrationPending = () => {
    message.loading({ content: 'Registration in progress', key });
  };

  const onRegistrationSuccess = () => {
    message.success({ content: 'Registration successful!', key });
    this.setState({
      signUpModalVisible: false,
    });
    this.registrationForm.current.resetFields();
  };

  const onRegistrationFailed = errors => {
    message.error({
      content: `Sorry registration failed!\n${errors}`,
      key,
    });
  };

  const onSignUpFinish = values => {
    const { registration } = props;
    const {
      name, email, phone, password, passwordConfirmation,
    } = values;

    registration(name, email, phone, password, passwordConfirmation);
  };

  return (
    <div>
      <Title>Sign Up</Title>

      <Form
        {...formItemLayout}
        name="sign_up"
        className="sign-up-form"
        onFinish={onSignUpFinish}
        initialValues={{}}
        ref={registrationForm}
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            Register
          </Button>
          Or
          <Button type="link" href="/auth/sign-in">Login now!</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

SignUp.propTypes = {
  isRegistrationFailed: PropTypes.bool.isRequired,
  isRegistrationSuccess: PropTypes.bool.isRequired,
  isRegistrationPending: PropTypes.bool.isRequired,
  registrationErrors: PropTypes.instanceOf(Array).isRequired,

  history: PropTypes.object.isRequired,

  registration: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  registration: (name, email, phone,
    password, passwordConfirmation) => dispatch(registration(name, email, phone,
    password, passwordConfirmation)),
});

const mapStateToProps = state => ({
  isRegistrationFailed: state.authReducer.isRegistrationFailed,
  isRegistrationSuccess: state.authReducer.isRegistrationSuccess,
  isRegistrationPending: state.authReducer.isRegistrationPending,
  registrationErrors: state.authReducer.registrationErrors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));

import React from 'react';
import { Row, Col, Typography, Button, Modal } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const { Title } = Typography;

export default class Header extends React.Component {

  state = {
    signInModalVisible: false
  };

  openSignInModal = (e) => {
    this.setState({
      signInModalVisible: !this.state.signInModalVisible
    });
  }

  responseFacebook = (response) => {
    console.log(response);
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
          title={null}
          centered
          visible={this.state.signInModalVisible}
          footer={null}
          onCancel={this.openSignInModal}
        >
          <Row justify="center">
            <Title>Sign In With</Title>
          </Row>
          <Row>
            <Col>
              <FacebookLogin
                appId="1088597931155576"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={this.responseFacebook}
                render={renderProps => (
                  <FacebookLoginButton onClick={renderProps.onClick} />
                )}
              />
            </Col>
            <Col>
              <GoogleLoginButton onClick={() => alert("Not yet implemented")} />
            </Col>
          </Row>
        </Modal>
      </header>
    );
  }

}

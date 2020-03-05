import React from 'react';
import { Button, Modal } from 'antd';

export default class Header extends React.Component {

  state = {
    signInModalVisible: false
  };

  openSignInModal = (e) => {
    this.setState({
      signInModalVisible: !this.state.signInModalVisible
    });
  }

  render() {
    return (
      <header {...this.props}>
        <a className="logo-wrapper" href="https://antv.alipay.com/zh-cn/index.html" target="_blank">
          <i className="logo" />
          <span>Repap</span>
        </a>
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
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </header>
    );
  }

}

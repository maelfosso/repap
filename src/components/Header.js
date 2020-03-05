import React from 'react';
import { Button } from 'antd';

export default function Header(props) {
  return (
    <header {...props}>
      <a className="logo-wrapper" href="https://antv.alipay.com/zh-cn/index.html" target="_blank">
        <i className="logo" />
        <span>Repap</span>
      </a>
      <div className="button">
        <Button>Sign in</Button>
      </div>
    </header>
  );
}

import React from 'react';
import { enquireScreen } from 'enquire-js';
import Header from './Header';
import '../App.scss';
import 'antd/dist/antd.css';


let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});



class App extends React.Component {
  state = {
    isMobile,
    showShadow: false,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === 'leave' });
  }

  render() {
    return (
      <Header key="header" className={this.state.showShadow ? 'show-shadow' : ''} />
    );
  }

}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { List, Typography, Spin, Row, Col, Rate, Button } from 'antd';
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import {
  withRouter
} from "react-router-dom";

import { all, waitABit, favorites } from '../actions/hotels';

const { Text } = Typography;

class HotelList extends React.Component {
  state = {
    hotels: undefined,
    isLoading: true
  }

  componentDidMount = () => {
    const { all, favorites, location } = this.props;
    
    if (location.pathname === '/hotels') {
      all();
    } else if (location.pathname === '/favorites') {
      favorites();
    } 
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { all, favorites, location } = nextProps;

      if (location.pathname === '/hotels') {
        all();
      } else if (location.pathname === '/favorites') {
        favorites();
      }
    }

  }

  _goToHotel = (id) => {
    const { waitABitFunc } = this.props;

    waitABitFunc();
    this.props.history.push(`/hotels/${id}`);
  }

  _renderItem = (item) => {
    return (
      <List.Item
        actions={[<Button type="link" icon={<RightOutlined />} size="small" onClick={() => this._goToHotel(item.id)}/>]}
      >
        <Col flex="auto">
          <Row>
            <Text strong>{item.name}</Text> 
            <Text>&nbsp;<HeartTwoTone twoToneColor="#eb2f96" hidden={!item.favorite} /></Text>
          </Row>
          <Row justify="space-between">
            <Col><Rate value={+item.rating} allowHalf={true} disabled={true}/></Col>
          </Row>
        </Col>
        <Col>
          <Text style={{textAlign: 'right'}}>${item.price}<br/>per night (min price)</Text>
        </Col>
      </List.Item>
    );
  }

  render = () => {
    const { hotels, waitABit, timestamp } = this.props;
    
    if (waitABit) {
      return <Spin />
    }
    
    return (
      <div className="HotelList">
        <List 
          itemLayout="horizontal"
          dataSource={hotels}
          renderItem={this._renderItem}
          pagination={{
            onChange: page => {}
          }}
        />
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  all: () => dispatch(all()),
  favorites: () => dispatch(favorites()),
  waitABitFunc: () => dispatch(waitABit())
});

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotels: state.hotelsReducer.hotels,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelList));
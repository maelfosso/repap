import React from 'react';
import { connect } from 'react-redux';
import { List, Typography, Spin, Row, Col, Rate, Button } from 'antd';
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import {
  withRouter
} from "react-router-dom";

import { list } from '../actions/hotels';
import HotelsAPI from '../api/Hotels';

const { Text } = Typography;

class HotelList extends React.Component {
  state = {
    hotels: undefined,
    isLoading: true
  }

  _fetchHotels = () => {
    this.setState({ ...this.state, isLoading: true });

    HotelsAPI.all()
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      this.setState({
        ...this.state,
        isLoading: false,
        hotels: responseJson
      });
      
    });
  }

  componentDidMount = () => {
    const { list } = this.props;
    list();
  }

  _goToHotel = (id) => {
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
            <Text>&nbsp;<HeartTwoTone twoToneColor="#eb2f96" hidden={item.favorite} /></Text>
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
    const { hotels, waitABit } = this.props;
    
    if (waitABit) {
      return <Spin />
    }

    return <div className="HotelList">
      <List 
        itemLayout="horizontal"
        dataSource={hotels}
        renderItem={this._renderItem}
        pagination={{
          onChange: page => {}
        }}
      />
    </div> 
  }

}

const mapDispatchToProps = dispatch => ({
  list: () => dispatch(list()),
});

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotels: state.hotelsReducer.hotels,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelList));
import React from 'react';
import { List, Typography, Spin, Row, Col, Rate, Button } from 'antd';
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import {
  withRouter
} from "react-router-dom";

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

      this.setState({
        ...this.state,
        isLoading: false,
        hotels: responseJson
      });
      
    });
  }

  componentDidMount = () => {
    this._fetchHotels();
  }

  _goToHotel = (id) => {
    this.props.history.push(`/hotels/${id}`);
  }

  _renderItem = (item) => {
    console.log(item);

    return (
      <List.Item
        actions={[<Button type="link" icon={<RightOutlined />} size="small" onClick={() => this._goToHotel(item.id)}/>]}
      >
        <Col flex="auto">
          <Row justify="space-between">
            <Text strong>{item.name}</Text>
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
    const { hotels } = this.state;

    if (!hotels) {
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

export default withRouter(HotelList);
import React from 'react';
import { List, Typography, Spin, Row, Col } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import HotelsAPI from '../api/Hotels';

const { Text } = Typography;

class HotelList extends React.Component {
  state = {
    hotels: undefined,
    isLoading: true
  }

  _fetchHotels = () => {
    console.log('[fetchHotels]', this.props);

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

  renderItem = (item) => {
    console.log(item);

    return (
      <List.Item>
        <Col>
          <Row justify="space-between">
            <Text strong>{item.name}</Text>
            <Text>{item.price}</Text>
          </Row>
          <Row justify="space-between">
            <Text>{item.address}</Text>
            <HeartTwoTone twoToneColor={ item.favorite ? "#eb2f96" : "" } />
          </Row>
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
      {/* { hotels.map(item => renderItem(item))} */}
      <List 
        itemLayout="horizontal"
        dataSource={hotels}
        renderItem={this.renderItem}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
      />
    </div> 
  }

}

export default HotelList;
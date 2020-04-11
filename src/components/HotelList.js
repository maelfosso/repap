import React from 'react';
import { List, Typography, Divider, Row, Col } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

const { Text } = Typography;

const HotelList = (props) => {
  console.log(props);
  const { hotels } = props;
  console.log(hotels);

  const renderItem = (item) => {
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

  return <div className="HotelList">
    {/* { hotels.map(item => renderItem(item))} */}
    <List 
      itemLayout="horizontal"
      dataSource={hotels}
      renderItem={renderItem}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
    />
  </div> 
}
// { hotels.map(item => renderItem(item))}

export default HotelList;
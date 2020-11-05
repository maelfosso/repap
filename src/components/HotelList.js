import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  List, Typography, Spin, Row, Col, Rate,
} from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import {
  withRouter,
} from 'react-router-dom';

import { all, waitABit, favorites } from '../actions/hotels';

const { Text } = Typography;

class HotelList extends React.Component {
  componentDidMount = () => {
    const { all, favorites, location } = this.props;

    if (location.pathname === '/hotels') {
      all();
    } else if (location.pathname === '/favorites') {
      favorites();
    }
  }

  componentDidUpdate(prevProps) {
    const { all, favorites, location } = this.props;

    if (prevProps.location.pathname !== location.pathname) {
      if (location.pathname === '/hotels') {
        all();
      } else if (location.pathname === '/favorites') {
        favorites();
      }
    }
  }

  goToHotel = id => {
    const { waitABitFunc, history } = this.props;

    waitABitFunc();
    history.push(`/hotels/${id}`);
  }

  renderItem = item => (
    <List.Item
      key={item.id}
      onClick={() => this.goToHotel(item.id)}
    >
      <Col flex="auto">
        <Row>
          <Text strong>{item.name}</Text>
          <Text>
            &nbsp;
            <HeartTwoTone twoToneColor="#eb2f96" hidden={!item.favorite} />
          </Text>
        </Row>
        <Row justify="space-between">
          <Col><Rate value={+item.rating} allowHalf disabled /></Col>
        </Row>
      </Col>
      <Col>
        <Text style={{ textAlign: 'right' }}>
          $
          {item.price}
          <br />
          per night (min price)
        </Text>
      </Col>
    </List.Item>
  )

  render = () => {
    const { hotels, waitABit } = this.props;

    if (waitABit) {
      return <Spin />;
    }

    return (
      <div className="HotelList">
        <List
          itemLayout="horizontal"
          dataSource={hotels}
          renderItem={this.renderItem}
          pagination={{
            onChange: page => page,
          }}
        />
      </div>
    );
  }
}

HotelList.propTypes = {
  waitABit: PropTypes.bool.isRequired,
  hotels: PropTypes.instanceOf(Array).isRequired,

  all: PropTypes.func.isRequired,
  favorites: PropTypes.func.isRequired,
  waitABitFunc: PropTypes.func.isRequired,

  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = dispatch => ({
  all: () => dispatch(all()),
  favorites: () => dispatch(favorites()),
  waitABitFunc: () => dispatch(waitABit()),
});

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotels: state.hotelsReducer.hotels,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelList));

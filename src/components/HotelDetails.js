import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import { EnvironmentOutlined, PhoneOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {
  Carousel, Typography, Spin, Row, Col, Button, Empty,
} from 'antd';

import { details, favorite, unfavorite } from '../actions/hotels';

const { Title, Paragraph } = Typography;

class HotelDetails extends React.Component {
  componentDidMount = () => {
    const { details, match } = this.props;
    const { hotelId } = match.params;

    details(hotelId);
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  toggleFavorite = () => {
    const { hotel, favorite, unfavorite } = this.props;

    if (hotel.favorite) {
      unfavorite(hotel.favorite);
    } else {
      favorite(hotel.id);
    }
  }

  render = () => {
    const { hotel, waitABit } = this.props;

    if (waitABit || !hotel) {
      return <Spin />;
    }

    return (
      <div className="HotelDetails">
        <div className="infos">
          <Button icon={<ArrowLeftOutlined />} type="link" onClick={this.goBack} />
          { hotel.photos.length > 0
            ? (
              <Carousel>
                { hotel.photos.map(photo => <div key={photo.id}><img alt="Hotel photos" src={`http://localhost:4000/${photo.url}`} /></div>) }
              </Carousel>
            ) : <Empty description={false} /> }
          <Title>{hotel.name}</Title>
          <Row justify="space-between">
            <Col>
              <h3>
                <EnvironmentOutlined />
                {' '}
                {hotel.address}
              </h3>
              <h3>
                <PhoneOutlined />
                {' '}
                {hotel.phone}
              </h3>
            </Col>
            <Col>
              <h3 style={{ textAlign: 'right' }}>
                $
                {hotel.price}
                <br />
                per night (min price)
              </h3>
            </Col>
          </Row>

          <Paragraph>
            <h3>Informations</h3>
            {hotel.infos}
          </Paragraph>
        </div>
        <div className="favorite">
          <Button type={hotel.favorite ? 'danger' : 'primary'} block onClick={this.toggleFavorite}>
            {hotel.favorite ? 'UNFAVORITE' : 'MARK AS FAVORITE' }
          </Button>
        </div>
      </div>
    );
  }
}

HotelDetails.propTypes = {
  waitABit: PropTypes.bool.isRequired,
  hotel: PropTypes.objectOf(PropTypes.object).isRequired,

  details: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  unfavorite: PropTypes.func.isRequired,

  history: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  details: id => dispatch(details(id)),
  favorite: id => dispatch(favorite(id)),
  unfavorite: id => dispatch(unfavorite(id)),
});

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotel: state.hotelsReducer.hotel,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelDetails));

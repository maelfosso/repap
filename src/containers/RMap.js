import React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography, Col,
} from 'antd';
import {
  Map, Marker, Popup, TileLayer, ZoomControl,
} from 'react-leaflet';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import HotelList from '../components/HotelList';
import HotelDetails from '../components/HotelDetails';
import AddHotel from '../components/AddHotel';

import '../css/RMap.scss';

const { Text } = Typography;

const center = [3.844119, 11.501346];

class RMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latlngNewHotel: null,
    };
  }

  onHotelCreationClick = () => {
    const { history } = this.props;
    history.push('/add');
  }

  /* eslint-disable consistent-return */
  renderMarkers = () => {
    const { location } = this.props;
    const { pathname } = location;
    const { waitABit, hotel, hotels } = this.props;
    const { latlngNewHotel } = this.state;

    if (waitABit) {
      return;
    }

    if (pathname === '/') {
      return (
        <Marker position={center}>
          <Popup>The center is here!</Popup>
        </Marker>
      );
    } if (pathname === '/add') {
      return latlngNewHotel ? (
        <Marker position={latlngNewHotel.split(', ')}>
          <Popup>Hotel position</Popup>
        </Marker>
      ) : null;
    } if (pathname.startsWith('/hotels/')) {
      if (!hotel) return;

      return (
        <Marker position={hotel.latlng.split(', ')}>
          <Popup><Text strong>{hotel.name}</Text></Popup>
        </Marker>
      );
    }
    return hotels.map(hotel => (
      <Marker key={hotel.id} position={hotel.latlng.split(', ')}>
        <Popup><Text strong>{hotel.name}</Text></Popup>
      </Marker>
    ));
  }

  onMapClick = values => {
    const { latlng } = values;
    const { location } = this.props;
    const { pathname } = location;

    if (pathname === '/add') {
      const { lat, lng } = latlng;


      this.setState({
        latlngNewHotel: `${lat}, ${lng}`,
      });
    }
  }

  render() {
    const { latlngNewHotel } = this.state;

    return (
      <div>
        <div className="RMap">
          <Col xs={24} md={12} className="search">
            <Switch>
              <Route exact path="/favorites">
                <HotelList />
              </Route>
              <Route exact path="/hotels">
                <HotelList />
              </Route>
              <Route exact path="/hotels/:hotelId">
                <HotelDetails />
              </Route>
              <Route exact path="/add">
                <AddHotel latlngNewHotel={latlngNewHotel} />
              </Route>
            </Switch>
          </Col>
          <Map
            center={center}
            zoom={12}
            whenReady={this.onMapReady}
            onClick={this.onMapClick}
          >
            <ZoomControl position="topright" />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            { this.renderMarkers() }
          </Map>
          <Fab
            icon={<span>+</span>}
            mainButtonStyles={{ backgroundColor: '#e74c3c' }}
            onClick={this.onHotelCreationClick}
            event={null}
          />
        </div>
      </div>
    );
  }
}

RMap.defaultProps = {
  hotel: undefined,
};

RMap.propTypes = {
  waitABit: PropTypes.bool.isRequired,
  hotel: PropTypes.objectOf(PropTypes.object),
  hotels: PropTypes.instanceOf(Array).isRequired,

  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotel: state.hotelsReducer.hotel,
  hotels: state.hotelsReducer.hotels,
});

export default connect(mapStateToProps, null)(withRouter(RMap));

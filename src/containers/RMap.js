import React, { useState } from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography, Col, Button,
} from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
  Map, Marker, Popup, TileLayer, ZoomControl,
} from 'react-leaflet';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import HotelList from '../components/HotelList';
import HotelDetails from '../components/HotelDetails';
import AddHotel from '../components/AddHotel';

const { Text } = Typography;

const center = [3.844119, 11.501346];

const RMap = props => {
  const {
    history, location,
    waitABit, hotel, hotels,
  } = props;

  const [latlngNewHotel, setLatLng] = useState();
  const [sideUI, setSideUI] = useState(false);

  const onHotelCreationClick = () => {
    setSideUI(true);
    history.push('/add');
  };

  /* eslint-disable consistent-return */
  const renderMarkers = () => {
    const { pathname } = location;

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
  };

  const onMapClick = values => {
    const { latlng } = values;
    const { pathname } = location;

    if (pathname === '/add') {
      const { lat, lng } = latlng;

      setLatLng(`${lat}, ${lng}`);
    }
  };

  const isSidebarOK = () => {
    const { pathname } = location;

    return pathname === '/' ? false : sideUI;
  };

  const toggleSideBar = () => {
    const { pathname } = location;

    if (pathname === '/') {
      return;
    }
    setSideUI(!sideUI);
  };

  return (
    <div>
      <div className="RMap">
        <div className="side-ui">
          <Col xs={24} md={12} className="search">
            <Button
              onClick={() => toggleSideBar()}
              icon={isSidebarOK() ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            />
            <div className={`content ${sideUI ? 'open' : 'closed'}`}>
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
                  <AddHotel init latlngNewHotel={latlngNewHotel} />
                </Route>
              </Switch>
            </div>
          </Col>
        </div>
        <Map
          center={center}
          zoom={12}
          onClick={onMapClick}
        >
          <ZoomControl position="topright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          { renderMarkers() }
        </Map>
        <Fab
          icon={<span>+</span>}
          mainButtonStyles={{ backgroundColor: '#e74c3c' }}
          onClick={() => onHotelCreationClick()}
          event={null}
        />
      </div>
    </div>
  );
};

RMap.defaultProps = {
  hotel: undefined,
};

RMap.propTypes = {
  waitABit: PropTypes.bool.isRequired,
  hotel: PropTypes.objectOf(PropTypes.any),
  hotels: PropTypes.instanceOf(Array).isRequired,

  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotel: state.hotelsReducer.hotel,
  hotels: state.hotelsReducer.hotels,
});

export default connect(mapStateToProps, null)(withRouter(RMap));

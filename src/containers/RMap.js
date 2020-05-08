import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { 
  Input, Typography, Col, 
  Form, InputNumber, Button, Alert, 
  Upload, Steps, message 
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { control } from "leaflet";
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import HotelList from '../components/HotelList';
import HotelDetails from '../components/HotelDetails';
import AddHotel from '../components/AddHotel';

import '../css/RMap.scss';

const { Text } = Typography;

const center = [3.844119, 11.501346];

class RMap extends React.Component {

  state = {
    isCreatingHotel: false,
    uploadedFileList: []
  };

  latlngNewHotel = null;

  onHotelCreationClick = () => {
    this.props.history.push("/add");
  }

  renderMarkers = () => {
    const { pathname } = this.props.location;
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
    } else if (pathname === '/add') {
      return latlngNewHotel ? (
        <Marker position={latlngNewHotel.split(", ")}>
          <Popup>Hotel position</Popup>
        </Marker>
      ) : null;
    } else if (pathname.startsWith('/hotels/')) {
      if (!hotel) return;

      return (
        <Marker position={hotel.latlng.split(", ")}>
          <Popup><Text strong>{hotel.name}</Text></Popup>
        </Marker>
      )
    } else {
      return hotels.map((hotel, ix) => (
        <Marker key={ix} position={hotel.latlng.split(", ")}>
          <Popup><Text strong>{hotel.name}</Text></Popup>
        </Marker>
      ));
    }
  }

  onCurrentHotelPosition = (position) => {    
    this.setState({
      markers: [position]
    });
  }

  onMapClick = values => {
    const { latlng } = values;
    const { pathname } = this.props.location;
    
    if (pathname === '/add') {
      const { lat, lng } = latlng;
      
      this.latlngNewHotel = `${lat}, ${lng}`;
      
      this.setState({
        latlngNewHotel: this.latlngNewHotel
      });
    }
  }

  render() {
    return (
      <div>
        <div className="RMap">
          <Col xs={24} md={12} className="search">
            <Switch>
              {/* <Route exact path="/favorites" component={props => <HotelList {...props} timestamp={new Date().toString()} />} /> */}
              {/* <Route exact path='/favorites' component={ (props) => (
                <HotelList timestamp={new Date().toString()} {...props} />
              )}/>
              <Route exact path='/hotels' component={ (props) => (
                <HotelList timestamp={new Date().toString()} {...props} />
              )}/> */}
              {/* <Route exact path="/hotels" component={props => <HotelList {...props} />} />
              <Route exact path="/favorites" component={props => <HotelList {...props} />} /> */}
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
                <AddHotel latlngNewHotel={this.state.latlngNewHotel}/>
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
            children={false}
          ></Fab>
        </div>          
      </div>
    );
  }
}

const mapStateToProps = state => ({
  waitABit: state.hotelsReducer.waitABit,
  hotel: state.hotelsReducer.hotel,
  hotels: state.hotelsReducer.hotels,
});

export default connect(mapStateToProps, null)(withRouter(RMap));

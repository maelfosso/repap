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

import { hotels } from '../utils/data';
import '../css/RMap.scss';
import { add, addProcessOver } from '../actions/hotels';

const { Search } = Input;
const { Text } = Typography;
const { Step } = Steps;

const center = [3.844119, 11.501346];

class RMap extends React.Component {

  state = {
    isCreatingHotel: false,
    uploadedFileList: []
  };

  layout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 12 }
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 8 },
      md: { span: 12 }
    }
  }

  latlngNewHotel = null;
  
  onSearch = (value) => {}

  onMapReady = (map) => {}

  onHotelCreationClick = () => {
    this.props.history.push("/add");
  }

  renderMarkers = () => {
    const { pathname } = this.props.location;
    const { latlngNewHotel, markers } = this.state;

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
    } else {
      return markers ? markers.map((marker, ix) => (
        <Marker key={ix} position={marker.geo.split(", ")}>
          <Popup><Text strong>{marker.name}</Text></Popup>
        </Marker>
      )) : null;
    }
  }

  onCurrentHotelPosition = (position) => {    
    this.setState({
      markers: [position]
    });
  }

  onMapClick = values => {
    const { latlng } = values;
    const { isCreatingHotel } = this.state;
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
          <Col xs={24} md={8} className="search">
            <Switch>
              <Route exact path="/hotels">
                <HotelList /> 
              </Route>
              <Route exact path="/hotels/:hotelId">
                <HotelDetails onCurrentHotelPosition={this.onCurrentHotelPosition}/>
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

export default withRouter(RMap);

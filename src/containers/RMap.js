import React from 'react';
import { connect } from 'react-redux';
import { Input, Typography, Col } from 'antd';

import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { control } from "leaflet";
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import HotelList from '../components/HotelList';
import { hotels } from '../utils/data';

const { Search } = Input;
const { Text } = Typography;

const center = [3.844119, 11.501346];

class RMap extends React.Component {
  
  onSearch = (value) => {
    console.log('[onSearch]', value);
  }

  onMapReady = (map) => {
    console.log(map);
  }

  render() {

    return (
      <div className="RMap">
        <Col xs={24} md={8} className="search">
          <Search placeholder="Search a hotel" onSearch={this.onSearch} enterButton />
          <HotelList hotels={hotels} />
        </Col>
        <Map 
          center={center} 
          zoom={12}
          whenReady={this.onMapReady}
        >
          <ZoomControl position="topright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center}>
            <Popup>The center is here!</Popup>
          </Marker>
          {
            hotels.map(hotel => (
              <Marker key={hotel.id} position={hotel.geo.split(", ")}>
                <Popup><Text strong>{hotel.name}</Text><br />{hotel.address}</Popup>
              </Marker>
            ))
          }
        </Map>
        <Fab
          icon={<span>+</span>} 
          mainButtonStyles={{ backgroundColor: '#e74c3c' }}
          onClick={() => alert('Here is the action of FAB.')}
          event={null}
          children={false}
        ></Fab>
      </div>
    );
  }
}

export default RMap;
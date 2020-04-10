import React from 'react';
import { connect } from 'react-redux';
import { message, Tooltip, Alert, Button, Modal, Form, Input, Checkbox, Menu, Dropdown, Col } from 'antd';

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

const { Search } = Input;

class RMap extends React.Component {

  onSearch = (value) => {
    console.log('[onSearch]', value);
  }

  render() {

    return (
      <div className="RMap">
        <Col xs={24} md={8} className="search">
          <Search placeholder="Search a hotel" onSearch={this.onSearch} enterButton />
        </Col>
        <Map 
          center={[3.844119, 11.501346]} 
          zoom={16} 
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
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
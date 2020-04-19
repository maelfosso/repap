import React from 'react';
import { connect } from 'react-redux';
import { Input, Typography, Col, Form, InputNumber, Button } from 'antd';
import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { control } from "leaflet";
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import HotelList from '../components/HotelList';
import { hotels } from '../utils/data';
import '../css/RMap.scss';

const { Search } = Input;
const { Text } = Typography;

const center = [3.844119, 11.501346];

class RMap extends React.Component {

  state = {
    isCreatingHotel: false
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
  
  onSearch = (value) => {
    console.log('[onSearch]', value);
  }

  onMapReady = (map) => {
    console.log(map);
  }

  onHotelCreationClick = () => {
    const { isCreatingHotel } = this.state;
    console.log('[onHotelCreation]');
    this.setState({
      isCreatingHotel: !isCreatingHotel
    });
  }

  renderMarkers = () => {
    return hotels.map(hotel => (
      <Marker key={hotel.id} position={hotel.geo.split(", ")}>
        <Popup><Text strong>{hotel.name}</Text><br />{hotel.address}</Popup>
      </Marker>
    ))
    // .push(
    //   <Marker position={center}>
    //     <Popup>The center is here!</Popup>
    //   </Marker>
    // )
  }

  renderForm = () => {
    return (
      <Form
        labelAlign="left"
        layout="vertical"
        name="hotel-creation"
      >
        <Form.Item 
          name="name" label="Name" required
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="phone" label="Phone" required
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="price" label="Price (min)" required
          rules={[{ required: true, message: 'Please the minimal price for a room!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item 
          name="address" label="Address" required
          rules={[{ required: true, message: 'Please, the address to find it!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="infos" label="Informations/Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }

  render() {

    return (
      <div className="RMap">
        <Col xs={24} md={8} className="search">
        { !this.state.isCreatingHotel ? (
          <div>
            <Search placeholder="Search a hotel" onSearch={this.onSearch} enterButton />
            <HotelList hotels={hotels} />
          </div>
        ) : this.renderForm() }
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
          
          { !this.state.isCreatingHotel ? this.renderMarkers() : null }
        </Map>
        <Fab
          icon={<span>+</span>} 
          mainButtonStyles={{ backgroundColor: '#e74c3c' }}
          onClick={this.onHotelCreationClick}
          event={null}
          children={false}
        ></Fab>
      </div>
    );
  }
}

export default RMap;
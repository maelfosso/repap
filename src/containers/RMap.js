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

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

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
  
  onSearch = (value) => {
    console.log('[onSearch]', value);
  }

  onMapReady = (map) => {
    console.log(map);
  }

  onHotelCreationClick = () => {
    const { isCreatingHotel } = this.state;

    console.log('[onHotelCreation]');

    this.props.history.push("/add");
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

  onFinish = values => {
    const { add } = this.props;

    console.log('[onFinish] Success:', values);

    if (!this.latlngNewHotel) {
      this.setState({
        isNHotelLatLngMissed: true
      });
    } else {
      values['latlng'] = this.latlngNewHotel;
      console.log(values);
      add(values);
    }
  }

  onMapClick = values => {
    console.log('[onMapClick]', values);
    console.log(this.props);

    const { latlng } = values;
    const { isCreatingHotel } = this.state;
    const { pathname } = this.props.location;
    
    console.log('[onMapClick] Path', pathname);
    // if (isCreatingHotel || 
    if (pathname === '/add') {
      const { lat, lng } = latlng;
      
      this.latlngNewHotel = `${lat}, ${lng}`;
      console.log('[LatLng]', this.latlngNewHotel);
      
      this.setState({
        isNHotelLatLngMissed: false,
        latlngNewHotel: this.latlngNewHotel
      });
    } else {
      console.log('[onMapClick] Nothing');
    }
  }

  renderMarkerNewHotel = () => {
    if (this.latlngNewHotel) { 
      return <Marker position={this.latlngNewHotel.split(", ")}></Marker>
    }

    return null;
  }

  _updateUploadedFileList = uploadedFileList => {
    this.setState({
      uploadedFileList: uploadedFileList
    });
  }

  _onUploadChange = (info) => {
    const { status } = info.file;
    const { uploadedFileList } = this.state;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {

      uploadedFileList.push(info.file);
      this._updateUploadedFileList(uploadedFileList);

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  _onNewHotelDone = (id) => {
    console.log('[onNewHotelDone]', id);
    const { addProcessOver } = this.props;

    addProcessOver(id);
  }

  renderForm = () => {
    const { 
      isAddPending, isAdded, addedHotel, 
      isAddedError, addingErrors,
      isAddingProcessOver
    } = this.props;
    const { isNHotelLatLngMissed, latlngNewHotel } = this.state;
    console.log('[renderForm]', isNHotelLatLngMissed, latlngNewHotel);

    const current = !isAdded ? 0 : isAddingProcessOver ? 2 : 1;
    const joinPhotoUrl = isAdded ? `http://localhost:4000/hotels/${addedHotel.id}/photos` : '';

    const uploadProps = {
      name: 'files',
      multiple: true,
      listType: "picture-card",
      accept: '.jpg, .jpeg, .png',
      action: joinPhotoUrl,
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      },
      onChange: this._onUploadChange
    };

    return (
      <div className="adding-process">
        <Steps current={current}>
          <Step title="Form" />
          <Step title="Photos"  />
          <Step title="Done" />
        </Steps>
          
        <div hidden={isAdded}>
          <Form
            labelAlign="left"
            layout="vertical"
            name="hotel-creation"
            onFinish={this.onFinish}
          >
            {/* Main photo ... At least one photo */}
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
            <Form.Item name="latlng" label="Latitude/Longitude">
              <div hidden>{latlngNewHotel}</div>
              <Input value={latlngNewHotel}/>
            </Form.Item>
            
            { isNHotelLatLngMissed ? 
            <Alert
              message="Position is missing"
              description="The latitude and longitude of the new hotel is missing. Please, click on the map at the hotel position"
              type="error"
              closable
              showIcon
            />
            : null }

            { isAddedError ?
            <div>
              <Alert
                message="Errors"
                description="An error occured when saving the hotel. Please, read them below and fix them or contact the administrator."
                type="error"
                closable
                showIcon
              />
              {{ addingErrors }}
            </div> 
            : null }
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isAddPending}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div hidden={!isAdded} className="photos">
          <div>
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </div>
          
          <div className="btn">
            <Button 
              type="primary" block
              disabled={this.state.uploadedFileList.length == 0}
            >
              Done
            </Button>
          </div>
        </div>

        <div hidden={!isAddingProcessOver}>
          
        </div>
      </div>
    )
  }

  render() {
    const { latlngNewHotel } = this.state;
    console.log('[RMap][render] LatLng', latlngNewHotel);

    return (
      
        <div>
          <div className="RMap">

            <Col xs={24} md={8} className="search">
            {/* { !this.state.isCreatingHotel ? (
              <div>
                <Search placeholder="Search a hotel" onSearch={this.onSearch} enterButton />
              </div>
            ) : this.renderForm() } */}
              
                <Switch>
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
              
              { !this.state.isCreatingHotel ? 
                this.renderMarkers() : 
                this.renderMarkerNewHotel()
              }
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


const mapDispatchToProps = dispatch => ({
  add: (values) => dispatch(add(values)),
  addProcessOver: (id) => dispatch(addProcessOver(id))
});

const mapStateToProps = state => ({
  isAddPending: state.hotelsReducer.isAddPending,
  
  isAdded: state.hotelsReducer.isAdded,
  addedHotel: state.hotelsReducer.addedHotel,

  isAddedError: state.hotelsReducer.isAddedError,
  addingErrors: state.hotelsReducer.addingErrors,

  isAddingProcessOver: state.hotelsReducer.isAddingProcessOver
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RMap));

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
  useParams
} from "react-router-dom";
import { HeartTwoTone } from '@ant-design/icons';
import { connect } from 'react-redux';
import { 
  Input, Typography, Col, Spin,
  Form, InputNumber, Button, Alert, 
  Upload, Steps, message 
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import HotelsAPI from '../api/Hotels';
import { add, addProcessOver } from '../actions/hotels';

const { Title } = Typography;
const { Step } = Steps;

class AddHotel extends React.Component {
  state = {
    hotel: undefined,
    isLoading: true,
    uploadedFileList: []
  }

  formRef = React.createRef();

  _onFinish = values => {
    const { add } = this.props;
    add(values);
  }

  _onHotelCreationDone = (hotelId) => {
    this.props.history.push(`/hotels/${hotelId}`);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latlngNewHotel !== this.props.latlngNewHotel) {
      this.formRef.current.setFieldsValue({
        latlng: this.props.latlngNewHotel
      });
    }
  }

  _updateUploadedFileList = uploadedFileList => {
    this.setState({
      uploadedFileList: uploadedFileList
    });
  }

  _onUploadChange = (info) => {
    const { status } = info.file;
    const { uploadedFileList } = this.state;

    if (status !== 'uploading') {}
    if (status === 'done') {

      uploadedFileList.push(info.file);
      this._updateUploadedFileList(uploadedFileList);

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render = () => {
    const { 
      isAddPending, isAdded, addedHotel, 
      isAddedError, addingErrors,
      isAddingProcessOver
    } = this.props;

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
        </Steps>
          
        <div hidden={isAdded}>
          <Form
            labelAlign="left"
            layout="vertical"
            name="hotel-creation"
            ref={this.formRef}
            onFinish={this._onFinish}
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
            <Form.Item 
              name="latlng" label="Latitude/Longitude" required
              rules={[{ required: true, message: 'Please indicate on the MAP the hotel position' }]}
            >
              <Input />
            </Form.Item>

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
              onClick={() => this._onHotelCreationDone(addedHotel ? addedHotel.id : -1)}
              disabled={this.state.uploadedFileList.length == 0}
            >
              Done
            </Button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddHotel));

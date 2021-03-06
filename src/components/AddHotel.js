import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Input,
  Form, InputNumber, Button, Alert,
  Modal,
  Upload, Steps, message,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { add } from '../actions/hotels';
import HotelsAPI from '../api/Hotels';

const { Step } = Steps;

const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
class AddHotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileList: [],
    };

    this.formRef = React.createRef();
  }

  componentDidUpdate = prevProps => {
    const { latlngNewHotel } = this.props;

    if (prevProps.latlngNewHotel !== latlngNewHotel) {
      this.formRef.current.setFieldsValue({
        latlng: latlngNewHotel,
      });
    }
  }

  onHotelCreationDone = hotelId => {
    const { history } = this.props;
    history.push(`/hotels/${hotelId}`);
  }

  onFinish = values => {
    const { add } = this.props;
    add(values);
  }

  updateUploadedFileList = uploadedFileList => {
    this.setState({
      uploadedFileList,
    });
  }

  onUploadChange = info => {
    const { status } = info.file;
    const { uploadedFileList } = this.state;

    if (status === 'done') {
      uploadedFileList.push(info.file);
      this.updateUploadedFileList(uploadedFileList);

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render = () => {
    const {
      isAddPending, isAdded, addedHotel,
      isAddedError, addingErrors,
      init,
    } = this.props;
    const { uploadedFileList } = this.state;

    const current = !isAdded || init ? 0 : 1;
    const joinPhotoUrl = isAdded ? HotelsAPI.photoJoin(addedHotel.id) : '';

    const uploadProps = {
      name: 'files',
      multiple: true,
      listType: 'picture-card',
      accept: '.jpg, .jpeg, .png',
      action: joinPhotoUrl,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      onChange: this.onUploadChange,
      onPreview: this.handlePreview,
    };

    const { previewVisible, previewImage, previewTitle } = this.state;

    return (
      <div className="adding-process">
        <Steps current={current}>
          <Step title="Form" />
          <Step title="Photos" />
        </Steps>

        <div hidden={current !== 0}>
          <Form
            labelAlign="left"
            layout="vertical"
            name="hotel-creation"
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              required
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              required
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input maxLength="10" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price (min)"
              required
              rules={[{ required: true, message: 'Please the minimal price for a room!' }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              required
              rules={[{ required: true, message: 'Please, the address to find it!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="infos" label="Informations/Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="latlng"
              label="Latitude/Longitude"
              help="Place the marker on the map to fill this field."
              required
              rules={[{ required: true, message: 'Please indicate on the MAP the hotel position' }]}
            >
              <Input />
            </Form.Item>

            { isAddedError
              ? (
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
              )
              : null }
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isAddPending}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div hidden={current !== 1} className="photos">
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
              type="primary"
              block
              onClick={() => this.onHotelCreationDone(addedHotel ? addedHotel.id : -1)}
              disabled={uploadedFileList.length === 0}
            >
              Done
            </Button>
          </div>
        </div>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
          wrapClassName="modal"
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

AddHotel.defaultProps = {
  addedHotel: undefined,
  addingErrors: undefined,
  latlngNewHotel: undefined,
};

AddHotel.propTypes = {
  isAddPending: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool.isRequired,
  isAddedError: PropTypes.bool.isRequired,
  addingErrors: PropTypes.instanceOf(Array),
  addedHotel: PropTypes.objectOf(PropTypes.any),
  add: PropTypes.func.isRequired,
  init: PropTypes.bool.isRequired,
  latlngNewHotel: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = dispatch => ({
  add: values => dispatch(add(values)),
});

const mapStateToProps = state => ({
  isAddPending: state.hotelsReducer.isAddPending,

  isAdded: state.hotelsReducer.isAdded,
  addedHotel: state.hotelsReducer.addedHotel,

  isAddedError: state.hotelsReducer.isAddedError,
  addingErrors: state.hotelsReducer.addingErrors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddHotel));

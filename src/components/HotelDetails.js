import React from 'react';
import {
  withRouter
} from "react-router-dom";
import { EnvironmentOutlined, PhoneOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Carousel, Typography, Spin, Row, Col, Button, Empty } from 'antd';
import HotelsAPI from '../api/Hotels';

const { Title, Text, Paragraph } = Typography;

class HotelDetails extends React.Component {
  state = {
    hotel: undefined,
    isLoading: true
  }

  _fetchDetails = () => {
    let { hotelId } = this.props.match.params;
    let { onCurrentHotelPosition } = this.props;

    this.setState({ ...this.state, isLoading: true });

    HotelsAPI.get(hotelId)
    .then(response => response.json())
    .then(responseJson => {
      
      this.setState({
        ...this.state,
        isLoading: false,
        hotel: responseJson
      });

      onCurrentHotelPosition({
        name: responseJson.name,
        geo: responseJson.latlng
      });
      
    });
  }

  componentDidMount = () => {
    this._fetchDetails();
  }

  renderPhotos = (photo) => {
    return <div key={photo.id}></div>
  }

  _goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render = () => {
    const { hotel } = this.state;

    if (!hotel) {
      return <Spin />
    }

    return (
      <div className="HotelDetails">
        <div className="infos">  
          <Button icon={<ArrowLeftOutlined />} type="link" onClick={this._goBack}></Button>
          { hotel.photos.length > 0 ?
            <Carousel>
              { hotel.photos.map(photo => <div key={photo.id}><img src={`http://localhost:4000/${photo.url}`} /></div>) }
          </Carousel> : <Empty description={false} /> }
          <Title>{hotel.name}</Title>
          <Row justify="space-between">
            <Col>
              <h3><EnvironmentOutlined /> {hotel.address}</h3>
              <h3><PhoneOutlined /> {hotel.phone}</h3>
            </Col>
            <Col>
              <h3 style={{textAlign: 'right'}}>${hotel.price}<br/>per night (min price)</h3>
            </Col>
          </Row>

          <Paragraph>
            <h3>Informations</h3>
            {hotel.infos}
          </Paragraph>
        </div>
        <div className="favorite">
          <Button type="primary" block>
            MARK AS FAVORITE
          </Button>
        </div>
      </div> 
    );
  }

} 

export default withRouter(HotelDetails);
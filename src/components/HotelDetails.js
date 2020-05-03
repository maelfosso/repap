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
import { Carousel, Typography, Spin, Row, Col } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import HotelsAPI from '../api/Hotels';

const { Title } = Typography;

class HotelDetails extends React.Component {
  state = {
    hotel: undefined,
    isLoading: true
  }

  _fetchDetails = () => {
    let { hotelId } = this.props.match.params;

    this.setState({ ...this.state, isLoading: true });

    HotelsAPI.get(hotelId)
    .then(response => response.json())
    .then(responseJson => {
      
      this.setState({
        ...this.state,
        isLoading: false,
        hotel: responseJson
      });
      
    });
  }

  componentDidMount = () => {
    this._fetchDetails();
  }

  renderPhotos = (photo) => {
    return <div key={photo.id}></div>
  }

  render = () => {
    const { hotel } = this.state;

    if (!hotel) {
      return <Spin />
    }

    return (
      <div className="HotelDetails">
        <Carousel>
          { hotel.photos.map(photo => <div key={photo.id}><img src={`http://localhost:4000/${photo.url}`} /></div>) }
        </Carousel>
        <Title>{hotel.name}</Title>
      </div> 
    );
  }

} 

export default withRouter(HotelDetails);
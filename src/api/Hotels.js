// import Config from 'react-native-config';
import { handleTokenErrors } from './Helpers';


const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.token}`,
};
class HotelsAPI {
  static all() {
    return fetch('http://localhost:4000/hotels/', {
      method: 'GET',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static add(values) {
    return fetch('http://localhost:4000/hotels/', {
      method: 'POST',
      body: JSON.stringify(values),
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static get(id) {
    return fetch(`http://localhost:4000/hotels/${id}`, {
      method: 'GET',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static favorite(hotelId) {
    return fetch('http://localhost:4000/favorites', {
      method: 'POST',
      body: JSON.stringify({ hotel: hotelId }),
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static unfavorite(id) {
    return fetch(`http://localhost:4000/favorites/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static favorites() {
    return fetch('http://localhost:4000/favorites/', {
      method: 'GET',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }
}

export default HotelsAPI;

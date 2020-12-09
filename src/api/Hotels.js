import config from '../config';
import { handleTokenErrors } from './Helpers';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.token}`,
};
class HotelsAPI {
  static photoJoin(id) {
    return `${config.API_URL}/hotels/${id}/photos`;
  }

  static photoUrl(url) {
    return `${config.API_URL}/${url}`;
  }

  static all() {
    return fetch(`${config.API_URL}/hotels/`, {
      method: 'GET',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static add(values) {
    return fetch(`${config.API_URL}/hotels/`, {
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
    return fetch(`${config.API_URL}/hotels/${id}`, {
      method: 'GET',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static favorite(hotelId) {
    return fetch(`${config.API_URL}/favorites`, {
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
    return fetch(`${config.API_URL}/favorites/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static favorites() {
    return fetch(`${config.API_URL}/favorites/`, {
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

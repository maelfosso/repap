import { handleTokenErrors } from './Helpers';
import config from '../config';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
class AuthApi {
  static login(username, password) {
    return fetch(`${config.API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static register(name, email, phone, password, passwordConfirmation) {
    return fetch(`${config.API_URL}/auth/registration`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      }),
      headers,
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }

  static check(token) {
    return fetch(`${config.API_URL}/auth/auto_login`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => handleTokenErrors(response))
      .catch(error => {
        throw error;
      });
  }
}

export default AuthApi;

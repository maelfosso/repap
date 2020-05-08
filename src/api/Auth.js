import { handleTokenErrors } from './Helpers';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
class AuthApi {
  static login(username, password) {
    return fetch('http://localhost:4000/auth/login', {
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
    return fetch('http://localhost:4000/auth/registration', {
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
    return fetch('http://localhost:4000/auth/auto_login', {
      method: 'GET',
      // body: JSON.stringify({}),
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

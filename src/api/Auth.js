// import Config from 'react-native-config';
import { handleTokenErrors } from './Helpers';


let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
class AuthApi {
  static login(username, password) {

    return fetch(`http://localhost:4000/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username, 
        password
      }),
      headers: headers
    })
    .then(response => {

      return handleTokenErrors(response); 
    })
    .catch(error => {
      throw error;
    })
  }

  static register(name, email, phone, password, password_confirmation) {

    return fetch(`http://localhost:4000/auth/registration`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        password_confirmation
      }),
      headers: headers
    })
    .then(response => {

      return handleTokenErrors(response); 
    })
    .catch(error => {
      throw error;
    })
  }
}

export default AuthApi;
// import Config from 'react-native-config';
import { handleTokenErrors } from './Helpers';


let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.token
}
class HotelsAPI {

  static all() {
    return fetch(`http://localhost:4000/hotels/`, {
      method: 'GET',
      headers: headers
    })
    .then(response => {
      return handleTokenErrors(response); 
    })
    .catch(error => {
      throw error;
    })
  }

  static add(values) {

    return fetch(`http://localhost:4000/hotels/`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: headers
    })
    .then(response => {
      
      return handleTokenErrors(response); 
    })
    .catch(error => {
      throw error;
    })
  }

  static get(id) {
    return fetch(`http://localhost:4000/hotels/${id}`, {
      method: 'GET',
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

export default HotelsAPI;
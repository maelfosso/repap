import {
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED,
  REGISTRATION_PENDING, REGISTRATION_SUCCESS, REGISTRATION_FAILED
} from '../actionTypes';
import AuthApi from '../api/Auth';
import { generalError } from '../api/Helpers';

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginPending());

    AuthApi.login(username, password)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.failure) {
        const { failure } = responseJson;
        dispatch(loginFailed(failure));
      } else {
        dispatch(loginSuccess());
        
        const { jwt, user } = responseJson;

        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  }
}

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  }
}

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

export const loginFailed = (message) => {
  return {
    type: LOGIN_FAILED,
    message
  }
}

export const registration = (name, email, phone, password, password_confirmation) => {
  return async (dispatch) => {
    dispatch(registrationPending());

    AuthApi.register(name, email, phone, password, password_confirmation)
    .then(response => response.json())
    .then(responseJson => {

      if (responseJson.errors) {
        const { errors } = responseJson;
        dispatch(registrationFailed(errors));
      } else {
        dispatch(registrationSuccess());
        
        const { jwt, user } = responseJson;

        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  }
}

export const registrationPending = () => {
  return {
    type: REGISTRATION_PENDING
  }
}

export const registrationSuccess = () => {
  return {
    type: REGISTRATION_SUCCESS
  }
}

export const registrationFailed = (errors) => {
  return {
    type: REGISTRATION_FAILED,
    errors
  }
}

import {
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED,
  REGISTRATION_PENDING, REGISTRATION_SUCCESS, REGISTRATION_FAILED,
  CHECK_TOKEN_PENDING, CHECK_TOKEN_SUCCESS, CHECK_TOKEN_FAILED,
} from '../actionTypes';
import AuthApi from '../api/Auth';
import { generalError } from '../api/Helpers';

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginPending());

    AuthApi.login(username, password)
    .then(response => response.json())
    .then(responseJson => {
      const { failure } = responseJson;
      if (failure) {
        dispatch(loginFailed(failure));
      } else {
        const { jwt, user } = responseJson;

        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(loginSuccess());
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
        const { jwt, user } = responseJson;
        
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(registrationSuccess());
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

export const checkToken = (token) => {
  return async (dispatch) => {
    dispatch(checkTokenPending());
    
    AuthApi.check(token)
    .then(response => response.json())
    .then(responseJson => {

      if (responseJson.errors) {
        const { errors } = responseJson;
        dispatch(checkTokenFailed(errors));
      } else {
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(responseJson));
        
        dispatch(checkTokenSuccess());
      }
    });
  }
}

export const checkTokenPending = () => {
  return {
    type: CHECK_TOKEN_PENDING
  }
}

export const checkTokenSuccess = () => {
  return {
    type: CHECK_TOKEN_SUCCESS
  }
}

export const checkTokenFailed = (errors) => {
  return {
    type: CHECK_TOKEN_FAILED,
    errors
  }
}

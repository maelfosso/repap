import {
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED,
  REGISTRATION_PENDING, REGISTRATION_SUCCESS, REGISTRATION_FAILED,
  CHECK_TOKEN_PENDING, CHECK_TOKEN_SUCCESS, CHECK_TOKEN_FAILED,
  LOGOUT,
} from '../actionTypes';
import AuthApi from '../api/Auth';

export const loginPending = () => ({
  type: LOGIN_PENDING,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailed = message => ({
  type: LOGIN_FAILED,
  message,
});

export const login = (username, password) => async dispatch => {
  dispatch(loginPending());

  AuthApi.login(username, password)
    .then(response => response.json())
    .then(responseJson => {
      const { failure } = responseJson;
      if (failure) {
        dispatch(loginFailed(failure));
      } else {
        const { jwt, user } = responseJson;

        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(loginSuccess());
      }
    });
};

export const registrationPending = () => ({
  type: REGISTRATION_PENDING,
});

export const registrationSuccess = () => ({
  type: REGISTRATION_SUCCESS,
});

export const registrationFailed = errors => ({
  type: REGISTRATION_FAILED,
  errors,
});

export const registration = (name, email,
  phone, password,
  passwordConfirmation) => async dispatch => {
  dispatch(registrationPending());

  AuthApi.register(name, email, phone, password, passwordConfirmation)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errors) {
        const { errors } = responseJson;
        dispatch(registrationFailed(errors));
      } else {
        const { jwt, user } = responseJson;

        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(registrationSuccess());
      }
    });
};

export const checkTokenPending = () => ({
  type: CHECK_TOKEN_PENDING,
});

export const checkTokenSuccess = () => ({
  type: CHECK_TOKEN_SUCCESS,
});

export const checkTokenFailed = errors => ({
  type: CHECK_TOKEN_FAILED,
  errors,
});

export const checkToken = token => async dispatch => {
  dispatch(checkTokenPending());

  AuthApi.check(token)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errors) {
        const { errors } = responseJson;
        dispatch(checkTokenFailed(errors));
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(responseJson));

        dispatch(checkTokenSuccess());
      }
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: LOGOUT,
  };
};

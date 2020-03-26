import {
  LOGIN_PENDING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTRATION_PENDING,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS 
} from '../actionTypes';

const initialState = {
  isLoginPending: false,
  isLoginSuccess: false,
  isLoginFailed: false,

  isRegistrationPending: false,
  isRegistrationSuccess: false,
  isRegistrationFailed: false,
  registrationErrors: [],

  isAuthenticated: false,
}

const auth = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case LOGIN_PENDING:
      nextState = {
        ...state,
        isLoginPending: true,
        isLoginSuccess: false,
        isLoginFailed: false
      };

      return nextState;
    
    case LOGIN_FAILED:
      nextState = {
        ...state,
        isLoginPending: false,
        isLoginSuccess: false,
        isLoginFailed: true,
        message: action.message
      };

      return nextState;

    case LOGIN_SUCCESS: 
      nextState = {
        ...state,

        isLoginPending: false,
        isLoginFailed: false,
        isLoginSuccess: true,
        isAuthenticated: true
      };

      return nextState;

    case REGISTRATION_PENDING:
      nextState = {
        ...state,
        isRegistrationPending: true,
        isRegistrationSuccess: false,
        isRegistrationFailed: false
      };

      return nextState;
    
    case REGISTRATION_FAILED:
      nextState = {
        ...state,
        isRegistrationPending: false,
        isRegistrationSuccess: false,
        isRegistrationFailed: true,
        registrationErrors: action.errors
      };

      return nextState;

    case REGISTRATION_SUCCESS: 
      nextState = {
        ...state,

        isRegistrationPending: false,
        isRegistrationFailed: false,
        isRegistrationSuccess: true,
        isAuthenticated: true
      };

      return nextState;

    default:
      return { ...state };
  }
}

export default auth;

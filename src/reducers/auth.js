import {
  LOGIN_PENDING,
  LOGIN_FAILED,
  LOGIN_SUCCESS 
} from '../actionTypes';

const initialState = {
  isLoginPending: false,
  isLoginSuccess: false,
  isLoginFailed: false,
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

    default:
      return { ...state };
  }
}

export default auth;

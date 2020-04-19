import {
  HOTEL_ADD, HOTEL_ADD_PENDING, HOTEL_ADD_SUCCESS, HOTEL_ADD_FAILED
} from '../actionTypes';


export const add = (hotel) => {
  return async (dispatch) => {
    dispatch(addPending());

    
  }
}

export const addPending = () => {
  return {
    type: HOTEL_ADD_PENDING
  }
}

export const addSuccess = () => {
  return {
    type: HOTEL_ADD_SUCCESS
  }
}

export const addFailed = (message) => {
  return {
    type: HOTEL_ADD_FAILED,
    message: message
  }
}
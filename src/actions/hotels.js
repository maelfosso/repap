import {
  HOTEL_ADD, HOTEL_ADD_PENDING, HOTEL_ADD_SUCCESS, HOTEL_ADD_FAILED
} from '../actionTypes';
import HotelsAPI from '../api/Hotels';

 
export const add = (hotel) => {
  return async (dispatch) => {
    dispatch(addPending());

    HotelsAPI.add(hotel)
    .then(response => response.json())
    .then(responseJson => {
      const { failure } = responseJson;

      if (failure) {
        dispatch(addFailed(failure));
      } else {
        console.log(responseJson);

        dispatch(addSuccess());
      }
    });
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
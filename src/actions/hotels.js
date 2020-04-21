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

        dispatch(addSuccess(responseJson));
      }
    });
  }
}

export const addPending = () => {
  return {
    type: HOTEL_ADD_PENDING
  }
}

export const addSuccess = (hotel) => {
  return {
    type: HOTEL_ADD_SUCCESS,
    hotel
  }
}

export const addFailed = (errors) => {
  return {
    type: HOTEL_ADD_FAILED,
    errors
  }
}
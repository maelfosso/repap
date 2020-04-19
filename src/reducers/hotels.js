import {
  HOTEL_ADD, HOTEL_ADD_FAILED, HOTEL_ADD_SUCCESS, HOTEL_ADD_PENDING
} from '../actionTypes';

const initialState = {

};

const hotels = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case HOTEL_ADD:

      return state;

    case HOTEL_ADD_PENDING:
      
      return state;

    case HOTEL_ADD_SUCCESS:

      return state;

    case HOTEL_ADD_FAILED:

      return state;

    default:

      return state;
  }
}

export default hotels;

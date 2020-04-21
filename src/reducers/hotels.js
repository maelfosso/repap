import {
  HOTEL_ADD, HOTEL_ADD_FAILED, HOTEL_ADD_SUCCESS, HOTEL_ADD_PENDING
} from '../actionTypes';

const initialState = {
  addedHotel: null,
  isAdded: false,
  addingErrors: null,
  isAddedError: false,
  isAddPending: false
};

const hotels = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case HOTEL_ADD:

      return state;

    case HOTEL_ADD_PENDING:
      nextState = {
        ...state,

        isAddPending: true
      }

      return nextState;

    case HOTEL_ADD_SUCCESS:
      nextState = {
        ...state,

        addedHotel: action.hotel,
        isAdded: true,
        isAddPending: false
      }

      return nextState;

    case HOTEL_ADD_FAILED:
      nextState = {
        ...state,

        isAddPending: false,
        isAddedError: true,
        addingErrors: action.errors
      }

      return state;

    default:

      return state;
  }
}

export default hotels;

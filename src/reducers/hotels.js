import {
  HOTEL_ADD, HOTEL_ADD_FAILED, HOTEL_ADD_SUCCESS,
  HOTEL_ADD_PENDING, HOTEL_ADD_PROCESS_OVER,
  WAIT_A_BIT, HOTEL_LIST, HOTEL_DETAIL,
  HOTEL_FAVORITE_CREATED, HOTEL_FAVORITE_DELETED,
} from '../actionTypes';

const initialState = {
  addedHotel: null,
  isAdded: false,

  addingErrors: null,
  isAddedError: false,

  isAddPending: false,
  isAddingProcessOver: false,

  waitABit: false,
  hotels: [],
  hotel: null,
};

const rotels = (state = initialState, action) => {
  let nextState;
  const { hotel } = state;

  switch (action.type) {
    case HOTEL_ADD:

      return state;

    case HOTEL_ADD_PENDING:
      nextState = {
        ...state,

        isAddPending: true,
      };

      return nextState;

    case HOTEL_ADD_SUCCESS:
      nextState = {
        ...state,

        addedHotel: action.hotel,
        isAdded: true,
        isAddPending: false,
      };

      return nextState;

    case HOTEL_ADD_FAILED:
      nextState = {
        ...state,

        isAddPending: false,
        isAddedError: true,
        addingErrors: action.errors,
      };

      return nextState;

    case HOTEL_ADD_PROCESS_OVER:
      nextState = {
        ...state,

        isAddingProcessOver: true,
        waitABit: false,
      };
      return nextState;

    case WAIT_A_BIT:
      nextState = {
        ...state,

        waitABit: true,
      };

      return nextState;

    case HOTEL_LIST:
      nextState = {
        ...state,

        waitABit: false,
        hotels: action.hotels,
      };

      return nextState;

    case HOTEL_DETAIL:

      nextState = {
        ...state,

        waitABit: false,
        hotel: action.hotel,
      };

      return nextState;

    case HOTEL_FAVORITE_CREATED:
      hotel.favorite = action.favorite.id;

      nextState = {
        ...state,

        waitABit: false,
        hotel,
      };

      return nextState;

    case HOTEL_FAVORITE_DELETED:
      hotel.favorite = action.deleted ? false : hotel.favorite;

      nextState = {
        ...state,

        waitABit: false,
        hotel,
      };

      return nextState;

    default:

      return state;
  }
};

export default rotels;

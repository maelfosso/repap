import {
  HOTEL_ADD_PENDING, HOTEL_ADD_SUCCESS, HOTEL_ADD_FAILED,
  WAIT_A_BIT, HOTEL_LIST, HOTEL_DETAIL,
  HOTEL_FAVORITE_CREATED, HOTEL_FAVORITE_DELETED,
} from '../actionTypes';
import HotelsAPI from '../api/Hotels';


export const addPending = () => ({
  type: HOTEL_ADD_PENDING,
});

export const addSuccess = hotel => ({
  type: HOTEL_ADD_SUCCESS,
  hotel,
});

export const addFailed = errors => ({
  type: HOTEL_ADD_FAILED,
  errors,
});

export const add = hotel => async dispatch => {
  dispatch(addPending());

  HotelsAPI.add(hotel)
    .then(response => response.json())
    .then(responseJson => {
      const { failure } = responseJson;

      if (failure) {
        dispatch(addFailed(failure));
      } else {
        dispatch(addSuccess(responseJson));
      }
    });
};

export const waitABit = () => ({
  type: WAIT_A_BIT,
});

export const all = () => async dispatch => {
  dispatch(waitABit());

  HotelsAPI.all()
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: HOTEL_LIST,
        hotels: responseJson,
      });
    });
};

export const details = id => async dispatch => {
  dispatch(waitABit());

  HotelsAPI.get(id)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: HOTEL_DETAIL,
        hotel: responseJson,
      });
    });
};

export const favorite = id => async dispatch => {
  dispatch(waitABit());

  HotelsAPI.favorite(id)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: HOTEL_FAVORITE_CREATED,
        favorite: responseJson,
      });
    });
};

export const unfavorite = id => async dispatch => {
  dispatch(waitABit());

  HotelsAPI.unfavorite(id)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: HOTEL_FAVORITE_DELETED,
        deleted: responseJson,
      });
    });
};

export const favorites = () => async dispatch => {
  dispatch(waitABit());

  HotelsAPI.favorites()
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: HOTEL_LIST,
        hotels: responseJson,
      });
    });
};

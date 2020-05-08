import { combineReducers } from 'redux';
import authReducer from './auth';
import hotelsReducer from './hotels';

const rootReducer = combineReducers({
  authReducer,
  hotelsReducer,
});

export default rootReducer;

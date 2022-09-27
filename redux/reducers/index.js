import { combineReducers } from 'redux';
import player from './playerReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  player,
  questionReducer,
});

export default rootReducer;

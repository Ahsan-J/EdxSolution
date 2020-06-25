import {combineReducers} from 'redux';
import app from './app';
import theme from './theme';

export default combineReducers({
  app,
  theme,
});

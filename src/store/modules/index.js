import { combineReducers } from 'redux';
import movieCategory from './movieCategory';
import movieSearch from './movieSearch';

export default combineReducers({
  movieCategory,
  movieSearch
});
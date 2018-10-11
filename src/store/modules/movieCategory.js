import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import movie from 'lib/movie';

// TODO: 최신 영화 리스트 상태를 관리 하는 액션, 리듀서 만들기.

// Action Type 정의
const SET_MOVIE = 'movie/SET_MOVIE';
const RESET_MOVIE = 'movie/RESET_MOVIE';
const UPDATE_PAGE = 'movie/UPDATE_PAGE';

// 최신영화를 받아오는 action을 정의
export const setMovie = createAction(SET_MOVIE);
export const resetMovie = createAction(RESET_MOVIE);
export const updatePage = createAction(UPDATE_PAGE, page => page);

// movie date의 기본값 정의
let initialState = Map({
  movieType: 'NOW_PLAYING',
  movies: List(),
  page: 1
});


export const getMovieData = (type) => (dispatch, getState) => {

  const { movieCategory: movieInfo } = getState();
  const movieType = movieInfo.getIn(['movieType']);
  let page = movieInfo.getIn(['page']);

  if(type) {

    type = type.toUpperCase();

    if(!movie.hasMovieCategory(type)) {
      return Promise.reject(new Error('has not movie type'));
    }
  
    if(movieType !== type) {
      console.log(initialState.setIn(['movieType'], type).toObject())
      dispatch({
        type: RESET_MOVIE,
        payload: initialState.setIn(['movieType'], type)
      });  
      page = 1;
    }
  } else {
    type = movieType;
  }  

  return movie.getDataForCategory(type, page, 'ko-KR').then((movieInfos) => {

    dispatch({
      type: SET_MOVIE,
      payload: List(movieInfos.data.results)
    });
    
    dispatch({
      type: UPDATE_PAGE,
      payload: page
    });
  });

};

export default handleActions({
  // 최신 영화리스트를 받아와서 state에 추가.
  [SET_MOVIE]: (state, action) => {
    // action: movie[Object], type[String]
    return state.update('movies', movies => movies.concat(action.payload));
  },
  [RESET_MOVIE]: (state, action) => {

    return action.payload;
  },
  // 상영중 영화 page number
  [UPDATE_PAGE]: (state, action) => {
    
    return state.setIn(['page'], action.payload + 1);
  }
}, initialState);
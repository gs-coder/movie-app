import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import movieLib from 'lib/movie';

const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS';
const GET_SIMILAR_MOVIES = 'GET_SIMILAR_MOVIES';

export const getMovieDetails = createAction(GET_MOVIE_DETAILS);
export const getSimilarMovies = createAction(GET_SIMILAR_MOVIES);

const initialStates = Map({
  /*
    TODO:  미리 찾아 놓은 Movie Details는 배열에 캐싱해놓고 다시 찾을 때는 이 배열에서 찾게 끔 하자
  */
  details: Map({}),
  similarMovies: List()
});

export const getMovieDetail = (id) => (dispatch, getState) => {

  return movieLib.getDataForMovieDetails(id, 'ko-KR').then((res) => {
    console.log(res);

    dispatch({
      type: GET_MOVIE_DETAILS,
      payload: Map(res.data)
    })
  });

};

export default handleActions({
  [GET_MOVIE_DETAILS]: (state, action) => {

    return state.setIn(['details'], action.payload);
  },
  [GET_SIMILAR_MOVIES]: (state, action) => {

    return state.update(['similarMovies'], similarMovies => similarMovies.concat(action.payload));
  },
}, initialStates);
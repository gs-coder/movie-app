import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieCategoryActions from 'store/modules/movieCategory';
import * as movieDetailsActions from 'store/modules/movieSearch';

import { MovieList } from 'components/Movie/';
import { MovieController } from 'components/MovieController/';

class MovieContainer extends Component {

  constructor(props) {
    super(props);

    this.html = document.querySelector('html');
    this.scrollHeight = this.html.scrollHeight;
    this.isPending = false;
    this.categories = ['now_playing', 'popular', 'top_rated', 'upcoming'];
  }

  getMovieData = async (type) => {

    this.isPending = true;

    const { MovieCategoryActions } = this.props;

    try {
      console.log('데이터 불러오는 중!');
      await MovieCategoryActions.getMovieData(type).then(() => {
        this.isPending = false;
      });
      console.log('데이터 불러오는 중.');
    } catch(e) {
      console.error(e);
    }
  }

  resetMovieList = (category) => {
    const { MovieCategoryActions, movieType } = this.props;

    console.log(movieType);
    if(category.toUpperCase() !== movieType) {
      MovieCategoryActions.getMovieData(category);
    }
  }

  bindEvt() {
    window.addEventListener('scroll', this.scrollEvt.bind(this));
  }

  shouldComponentUpdate = (nextProps, nextState) => {

    if(nextProps.movies !== this.props.movies) {
      return true;
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if(prevProps.movies !== this.props.movies) {
      return true;
    } else {
      return false;
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {

    if(snapshot) {
      this.scrollHeight = this.html.scrollHeight;
    }
  }

  scrollEvt(e) {
    
    const self = this;
    const scrollTop = self.html.scrollTop;

    console.log('scrollTop: ', scrollTop);
    console.log('self.scrollHeight: ', self.scrollHeight);
    if(scrollTop >= self.scrollHeight - 50) {
      
      console.log('fetch movie data');
      !self.isPending && this.getMovieData();
    }
    
  }

  componentDidMount() {
    this.bindEvt();
    this.getMovieData(this.categories[0]);
  }

  render() {

    const { movies, MovieDetailsActions } = this.props;
    const movieSize = movies.size;

    if(movieSize !== 0) {
      return (
        <div className="movie-container">
          <MovieController categories={this.categories} resetMovieList={this.resetMovieList}/>
          <MovieList movies={movies} getMovieDetail={ MovieDetailsActions.getMovieDetail }/>
        </div>
      );
    } else {
      return (
        <>
          Loading...
        </>
      );
    }
  }
}

export default connect(
  ({movieCategory}) => {
    return {
      movies: movieCategory.getIn(['movies']),
      movieType: movieCategory.getIn(['movieType'])
    };
  },
  (dispatch) => ({
    MovieCategoryActions: bindActionCreators(movieCategoryActions, dispatch),
    MovieDetailsActions: bindActionCreators(movieDetailsActions, dispatch),
  })
)(MovieContainer);

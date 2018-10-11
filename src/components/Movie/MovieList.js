import React from 'react';
import Movie from './Movie';

import './MovieList.scss';

import movieLib from 'lib/movie';

const MovieList = ({movies, getMovieDetail }) => {
  const movieComps = movies.map((movie, idx) => {

    const genres = movie.genre_ids.map((id) => {

      const genre = movieLib.getGenre(id);

      return genre ? genre : false;
    });

    return (
      <Movie 
        key={movie.id} 
        id={movie.id}
        genres={genres}
        imgUrl={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
        title={movie.title}
        overview={movie.overview}
        getMovieDetail={getMovieDetail}
        />
    )
  });

  return (
    <div className="movie-list-wrapper">
      <ul>
      {movieComps}
      </ul>
    </div>
  );
}

export default MovieList;
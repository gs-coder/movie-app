import React from 'react';

import './Movie.scss';

const Movie = ({ id, imgUrl, title, overview, genres, getMovieDetail }) => (
  <li className="movie-wrapper">
    <figure>
      <div className="img-box">
        <img src={imgUrl}/>
      </div>
      <figcaption className="desc-box">
        <h3>{title}</h3>
        <p>
          { overview ? overview : 'No overview'}
        </p>
        <div className="genres-box">
          {
            genres.map((genre) => {
              return (
                <button key={genre.id}>
                  { genre.name }
                </button>
              );
            })
          }
        </div>
        <button onClick={getMovieDetail.bind(null, id)}>
          상세보기
        </button>
      </figcaption>
    </figure>
  </li>
);

export default Movie;
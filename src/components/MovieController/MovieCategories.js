import React from 'react'
import PropTypes from 'prop-types'

import './MovieCategories.scss';

const MovieCategories = ({ categories, resetMovieList }) => {
  return (
    <div className="category-btn-wrapper">
      {
        categories.map((category, idx) => {
          return (
            <button 
              className="category-btn"
              key={idx} 
              onClick={resetMovieList.bind(null, category)}>
              { category }
            </button>
          )
        })
      }
    </div>
  )
}

MovieCategories.propTypes = {
  categories: PropTypes.array,
  resetMovieList: PropTypes.func,
}

export default MovieCategories


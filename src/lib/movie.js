import axios from "axios";

class Movie {

  constructor() {
    this.PUBLIC_URL_PATH = 'https://api.themoviedb.org/3/movie';
    this.KEY = '7d02aff4818ac79c96864bd3293f9fbd';
    this.CATEGORIES = ['NOW_PLAYING', 'POPULAR', 'TOP_RATED', 'UPCOMING'];
    this.lang = 'en-US';
    this.GENRES = [
      {
        "id": 28,
        "name": "액션"
      },
      {
        "id": 12,
        "name": "모험"
      },
      {
        "id": 16,
        "name": "애니메이션"
      },
      {
        "id": 35,
        "name": "코미디"
      },
      {
        "id": 80,
        "name": "범죄"
      },
      {
        "id": 99,
        "name": "다큐멘터리"
      },
      {
        "id": 18,
        "name": "드라마"
      },
      {
        "id": 10751,
        "name": "가족"
      },
      {
        "id": 14,
        "name": "판타지"
      },
      {
        "id": 36,
        "name": "역사"
      },
      {
        "id": 27,
        "name": "공포"
      },
      {
        "id": 10402,
        "name": "음악"
      },
      {
        "id": 9648,
        "name": "미스터리"
      },
      {
        "id": 10749,
        "name": "로맨스"
      },
      {
        "id": 878,
        "name": "SF"
      },
      {
        "id": 10770,
        "name": "TV 영화"
      },
      {
        "id": 53,
        "name": "스릴러"
      },
      {
        "id": 10752,
        "name": "전쟁"
      },
      {
        "id": 37,
        "name": "서부"
      }
    ]
    // this.
    
  }

  hasMovieCategory(category) {

    category = category.toUpperCase();

    return this.CATEGORIES.indexOf(category) >= 0;
  }

  _getUrl(typeObj) {
    
    const self = this;
    const params = typeObj.params;
    let url = `${self.PUBLIC_URL_PATH}/${typeObj.unique}?api_key=${self.KEY}`; 

    for(let prop in params) {
      if(params.hasOwnProperty(prop)) {
        const name = prop;
        const value = params[prop];

        url += `&${name}=${value}`;
      }
    }

    return url;
  }

  getDataForCategory(category, page, lang = this.lang) {
    
    const url = this._getUrl({
      unique: category.toLowerCase(),
      params: {
        language: lang,
        page: page
      }
    });

    return axios.get(url);
  }

  getDataForMovieDetails(id, lang = this.lang) {
    
    const url = this._getUrl({
      unique: id,
      params: {
        language: lang,
      }
    });

    return axios.get(url);
  }

  getGenre(id) {
    const result = this.GENRES.find((genre) => {
      return genre.id === id;
    });
    
    return result ? result : undefined;
  }
}

const movie = new Movie();

export default movie;
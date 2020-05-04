const FilmService = {
  apiKey: 'ce4dda873393808f940ee97b518e5c4f',

  makeRequest (url: string, options = {}) {
    return fetch(url, options).then((data) => data.json());
  },

  async getFilm (filmId: number) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${this.apiKey}&language=ru-RU`);
  },
  async getFilmVideos (filmId: number) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${this.apiKey}&language=ru-RU`);
  },
  async getFilmReviews (filmId: number) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=${this.apiKey}`);
  },
  async getSimilarFilms (filmId: number) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${this.apiKey}&language=ru-RU`);
  },
  async getTopRatedFilms (page = 1) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=ru-RU&page=${page}`);
  },
  async getUpcomingFilms (page = 1) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=ru-RU&page=${page}`);
  },
  async getPopularFilms (page = 1) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ru-RU&page=${page}`);
  },

  async searchFilm (filmName: string) {
    return await this.makeRequest(`https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&query=${filmName}&language=ru-RU&page=1`);
  },

  async getFavouriteMovies (userId: number, sessionId: string, page = 1) {
    return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  },
  async getRatedMovies (userId: number, sessionId: string, page = 1) {
    return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/rated/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  },
  async getWatchList (userId: number, sessionId: string, page = 1) {
    return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/watchlist/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  },

  //auth

  async createRequestToken () {
    return await this.makeRequest(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`);
  },
  async validateRequestToken (userName: string, password: string, token: string) {
    return await this.makeRequest(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${userName}&request_token=${token}&password=${password}&api_key=${this.apiKey}`);
  },
  async createSessionId (token: string) {
    return await this.makeRequest(`https://api.themoviedb.org/3/authentication/session/new?request_token=${token}&api_key=${this.apiKey}`);
  },
  async getAccountDetails (sessionId: string) {
    return await this.makeRequest(`https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${this.apiKey}`);
  },
  async logOut (sessionId: string) {
    return await this.makeRequest(`https://api.themoviedb.org/3/authentication/session?api_key=${this.apiKey}&session_id=${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
  },

  //account

  async markAsFavourite (userId: number, sessionId: string, filmId: number, isAdding = true, mediaType = "movie") {
    const request = {
        "media_type": mediaType,
        "media_id": filmId,
        "favorite": isAdding,
    }
    const jsonRequest = JSON.stringify(request)

    return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${this.apiKey}&session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: jsonRequest
    });
  },
  async addToWatchlist (userId: number, sessionId: string, filmId: number, isAdding = true, mediaType = "movie") {
    const request = {
      "media_type": mediaType,
      "media_id": filmId,
      "watchlist": isAdding,
    }
    const jsonRequest = JSON.stringify(request)

    return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${this.apiKey}&session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: jsonRequest
    });
  },
  async getMovieAccountStates (filmId: number, sessionId: string) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/account_states?api_key=${this.apiKey}&session_id=${sessionId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  },
  async rateFilm (sessionId: string, filmId: number, rating: number) {
    const request = {
      "value": rating
    }
    const jsonRequest = JSON.stringify(request)

    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=${this.apiKey}&session_id=${sessionId}&value=${rating}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: jsonRequest
    });
  },
  async deleteFilmRating (sessionId: string, filmId: number) {
    return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=${this.apiKey}&session_id=${sessionId}`,  {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
  }
}

export default FilmService;

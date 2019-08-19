class FilmService {
    apiKey = 'ce4dda873393808f940ee97b518e5c4f';

    makeRequest = (url, options = {}) => {
        return fetch(url, options).then((data) => data.json());
    }

    getFilm = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${this.apiKey}&language=ru-RU`);
    }
    getFilmVideos = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${this.apiKey}&language=ru-RU`);
    }
    getFilmReviews = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=${this.apiKey}`);
    }
    getSimilarFilms = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${this.apiKey}&language=ru-RU`);
    }
    getTopRatedFilms = async (page = 1) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=ru-RU&page=${page}`);
    }
    getUpcomingFilms = async (page = 1) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=ru-RU&page=${page}`);
    }
    getPopularFilms = async (page = 1) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ru-RU&page=${page}`);
    }

    searchFilm = async (filmName) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${filmName}&language=ru-RU&page=1`);
    }

    getFavouriteMovies = async (userId, sessionId, page = 1) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`);
    }
    getRatedMovies = async (userId, sessionId, page = 1) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/rated/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`);
    }
    getWatchList = async (userId, sessionId, page = 1) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/watchlist/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`);
    }

    //auth

    createRequestToken = async () => {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`);
    }
    validateRequestToken = async (userName, password, token) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${userName}&request_token=${token}&password=${password}&api_key=${this.apiKey}`);
    }
    createSessionId = async (token) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/session/new?request_token=${token}&api_key=${this.apiKey}`);
    }
    getAccountDetails = async (sessionId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${this.apiKey}`);
    }
    logOut = async (sessionId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/session?api_key=${this.apiKey}&session_id=${sessionId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
    }

    //account

    markAsFavourite = async (userId, sessionId, filmId, isAdding = true) => {
        let request = {
            "media_type": "movie",
            "media_id": filmId,
            "favorite": isAdding,
        }
        let jsonRequest = JSON.stringify(request);
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${this.apiKey}&session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: jsonRequest
        });
    }
    addToWatchlist = async (userId, sessionId, filmId, isAdding = true) => {
        let request = {
            "media_type": "movie",
            "media_id": filmId,
            "watchlist": isAdding,
        }
        let jsonRequest = JSON.stringify(request);
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${this.apiKey}&session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: jsonRequest
        });
    }
    getMovieAccountStates = async (filmId, sessionId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/account_states?api_key=${this.apiKey}&session_id=${sessionId}`);
    }
    rateFilm = async (sessionId, filmId, rating) => {
        let request = {
            "value": rating
        }
        let jsonRequest = JSON.stringify(request);
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=${this.apiKey}&session_id=${sessionId}&value=${rating}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: jsonRequest
        });
    }
    deleteFilmRating = async (sessionId, filmId) => {
        console.log(sessionId, filmId);
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
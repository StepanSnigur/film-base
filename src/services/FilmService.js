let FilmService = {
    apiKey: 'ce4dda873393808f940ee97b518e5c4f',

    makeRequest (url, options = {}) {
        return fetch(url, options).then((data) => data.json());
    },

    async getFilm (filmId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${this.apiKey}&language=ru-RU`);
    },
    async getFilmVideos (filmId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${this.apiKey}&language=ru-RU`);
    },
    async getFilmReviews (filmId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=${this.apiKey}`);
    },
    async getSimilarFilms (filmId) {
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

    async searchFilm (filmName) {
        return await this.makeRequest(`https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&query=${filmName}&language=ru-RU&page=1`);
    },

    async getFavouriteMovies (userId, sessionId, page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
    async getRatedMovies (userId, sessionId, page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/rated/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&sort_by=created_at.asc&page=${page}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
    async getWatchList (userId, sessionId, page = 1) {
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
    async validateRequestToken (userName, password, token) {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${userName}&request_token=${token}&password=${password}&api_key=${this.apiKey}`);
    },
    async createSessionId (token) {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/session/new?request_token=${token}&api_key=${this.apiKey}`);
    },
    async getAccountDetails (sessionId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${this.apiKey}`);
    },
    async logOut (sessionId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/authentication/session?api_key=${this.apiKey}&session_id=${sessionId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
    },

    //account

    async markAsFavourite (userId, sessionId, filmId, isAdding = true, mediaType = "movie") {
        let request = {
            "media_type": mediaType,
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
    },
    async addToWatchlist (userId, sessionId, filmId, isAdding = true, mediaType = "movie") {
        let request = {
            "media_type": mediaType,
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
    },
    async getMovieAccountStates (filmId, sessionId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/account_states?api_key=${this.apiKey}&session_id=${sessionId}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
    async rateFilm (sessionId, filmId, rating) {
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
    },
    async deleteFilmRating (sessionId, filmId) {
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
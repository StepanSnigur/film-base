let TVSeriesService = {
    apiKey: 'ce4dda873393808f940ee97b518e5c4f',

    makeRequest: (url, options = {}) => fetch(url, options).then((data) => data.json()),

    getTVSeries: async function (id) {
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=ru-RU`);
    },
    getPopularTVSeries: async function (page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=ru-RU&page=${page}`)
    },
    getTopRatedTVSeries: async function (page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=ru-RU&page=${page}`)
    },
    getTVSeriesOnAir: async function (page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.apiKey}&language=ru-RU&page=${page}`)
    },

    rateTVSeries: async function (sessionId, id, rating) {
        let request = {
            "value": rating
        }
        let jsonRequest = JSON.stringify(request);
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/${id}/rating?api_key=${this.apiKey}&session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: jsonRequest
        });
    },
    deleteTVSeriesRating: async function (sessionId, filmId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/${filmId}/rating?api_key=${this.apiKey}&session_id=${sessionId}`,  {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
    },
    getRatedTVSeries: async function (userId, sessionId, page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/rated/tv?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&page=${page}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
    getFavoriteTVSeries: async function (userId, sessionId, page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/favorite/tv?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&page=${page}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
    getTVSeriesWatchlist: async function (userId, sessionId, page = 1) {
        return await this.makeRequest(`https://api.themoviedb.org/3/account/${userId}/watchlist/tv?api_key=${this.apiKey}&session_id=${sessionId}&language=ru-RU&page=${page}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
    getTVSeriesAccountStates: async function (id, sessionId) {
        return await this.makeRequest(`https://api.themoviedb.org/3/tv/${id}/account_states?api_key=${this.apiKey}&session_id=${sessionId}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    },
}

export default TVSeriesService;
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
}

export default FilmService;
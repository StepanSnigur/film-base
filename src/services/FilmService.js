class FilmService {
    apiKey = 'ce4dda873393808f940ee97b518e5c4f';

    makeRequest = (url, options = {}) => {
        return fetch(url, options).then((data) => data.json());
    }

    getFilm = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${this.apiKey}`);
    }
    getFilmVideos = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${this.apiKey}`);
    }
    getFilmReviews = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=${this.apiKey}`);
    }
    getSimilarFilms = async (filmId) => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${this.apiKey}`);
    }
    getTopRatedFilms = async () => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}`);
    }
    getUpcomingFilms = async () => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}`);
    }
    getPopularFilms = async () => {
        return await this.makeRequest(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`);
    }
}

export default FilmService;
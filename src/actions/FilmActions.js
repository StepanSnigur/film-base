import FilmService from '../services/FilmService';
import {
    setCurrentFilmDataLoading,
    setCurrentPopularPage,
    setCurrentRatedPage,
    setCurrentUpcomingPage,
    changeCurrentListData,
    setFilmListError,
    setCurrentFilmLoading,
    setFilmStates,
    setCurrentFilmData,
    setCurrentFilmError,
    searchFilmData,
    searchFilmError,
    loadFavouriteMovies,
    loadFavouriteMoviesError,
    loadRatedMovies,
    loadRatedMoviesError,
    loadWatchList,
    loadWatchListError
} from './actionCreators/FilmActionCreators';

export let getTopRatedFilms = page => async dispatch => {
    try {
        dispatch(setCurrentFilmDataLoading());

        let result = await FilmService.getTopRatedFilms(page);
        dispatch(setCurrentRatedPage(result.page));
        dispatch(changeCurrentListData(result));
    } catch {
        dispatch(setFilmListError());
    }
}

export let loadMostPopularFilms = page => async dispatch => {
    try {
        dispatch(setCurrentFilmDataLoading());

        let result = await FilmService.getPopularFilms(page);
        dispatch(setCurrentPopularPage(result.page));
        dispatch(changeCurrentListData(result));
    } catch {
        dispatch(setFilmListError());
    }
}

export let loadUpComingFilms = page => async dispatch => {
    try {
        dispatch(setCurrentFilmDataLoading());

        let result = await FilmService.getUpcomingFilms(page);
        dispatch(setCurrentUpcomingPage(result.page));
        dispatch(changeCurrentListData(result));
    } catch {
        dispatch(setFilmListError());
    }
}

export let setCurrentFilm = (id, sessionId) => async dispatch => {
    dispatch(setCurrentFilmLoading());
    try {
        let filmData = await FilmService.getFilm(id);
        let filmVideos = await FilmService.getFilmVideos(id);
        let filmReviews = await FilmService.getFilmReviews(id);
        let similarFilms = await FilmService.getSimilarFilms(id);

        if (sessionId) {
            let filmStates = await FilmService.getMovieAccountStates(id, sessionId);
            dispatch(setFilmStates(filmStates));
        }

        dispatch(setCurrentFilmData(filmData, filmVideos, filmReviews, similarFilms));
    } catch (err) {
        dispatch(setCurrentFilmError());
    }
}

export let searchFilm = inputValue => dispatch => {
    FilmService.searchFilm(inputValue)
        .then(result => dispatch(searchFilmData(result)))
        .catch(() => dispatch(searchFilmError()));
}

export let getFavouriteMovies = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_FAVOURITE_MOVIES_LOADING', payload: true});
    FilmService.getFavouriteMovies(userId, sessionId, page)
        .then(result => dispatch(loadFavouriteMovies(result)))
        .catch(() => dispatch(loadFavouriteMoviesError()));
}

export let getRatedMovies = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_RATED_MOVIES_LOADING', payload: true});
    FilmService.getRatedMovies(userId, sessionId, page)
        .then(result => dispatch(loadRatedMovies(result)))
        .catch(() => dispatch(loadRatedMoviesError()));
}

export let getWatchList = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_WATCHLIST_LOADING', payload: true});
    FilmService.getWatchList(userId, sessionId, page)
        .then(result => dispatch(loadWatchList(result)))
        .catch(() => dispatch(loadWatchListError()));
}
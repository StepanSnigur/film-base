import FilmService from '../services/FilmService';
import { stopSubmit, SubmissionError } from 'redux-form';

let service = new FilmService();

export let getTopRelatedFilms = (page) => (dispatch) => {
    dispatch({type: 'SET_TOP_RELATED_FILMS_LOADING'});
    service.getTopRatedFilms(page)
        .then((result) => dispatch({type: 'LOAD_TOP_RELATED_FILMS', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_TOP_RELATED_FILMS_ERROR'}))
}

export let loadMostPopularFilms = (page) => (dispatch) => {
    dispatch({type: 'SET_MOST_POPULAR_FILMS_LOADING'});
    service.getPopularFilms(page)
        .then((result) => dispatch({type: 'LOAD_MOST_POPULAR_FILMS', payload: result}))
        .catch((err) => dispatch({type: 'GET_POPULAR_FILMS_ERROR'}));
}

export let setCurrentFilm = (id, sessionId) => async (dispatch) => {
    dispatch({type: 'SET_CURRENT_FILM_LOADING'});
    try {
        let filmData = await service.getFilm(id);
        let filmVideos = await service.getFilmVideos(id);
        let filmReviews = await service.getFilmReviews(id);
        let similarFilms = await service.getSimilarFilms(id);

        if (sessionId) {
            let filmStates = await service.getMovieAccountStates(id, sessionId);
            dispatch({type: 'SET_FILM_STATES', payload: filmStates});
        }

        dispatch(
            {
                type: 'SET_CURRENT_FILM',
                payload: {
                    film: filmData,
                    videos: filmVideos,
                    reviews: filmReviews,
                    similar: similarFilms
                }
            }
        );
    } catch (err) {
        dispatch({type: 'SET_CURRENT_FILM_ERROR'});
    }
}

export let loadUpComingFilms = (page) => (dispatch) => {
    dispatch({type: 'SET_UP_COMING_FILMS_LOADING'});
    service.getUpcomingFilms(page)
        .then((result) => dispatch({type: 'LOAD_UP_COMING_FILMS', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_UP_COMING_FILMS_ERROR'}));
}

export let searchFilm = (inputValue) => (dispatch) => {
    service.searchFilm(inputValue)
        .then((result) => dispatch({type: 'SEARCH_FILM', payload: result}))
        .catch((err) => dispatch({type: 'SEARCH_FILM_ERROR'}));
}

export let getFavouriteMovies = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_FAVOURITE_MOVIES_LOADING', payload: true});
    service.getFavouriteMovies(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_FAVOURITE_MOVIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_FAVOURITE_MOVIES_ERROR'}));
}

export let getRatedMovies = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_RATED_MOVIES_LOADING', payload: true});
    service.getRatedMovies(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_RATED_MOVIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_RATED_MOVIES_ERROR'}));
}

export let getWatchList = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_WATCHLIST_LOADING', payload: true});
    service.getWatchList(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_WATCHLIST', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_WATCHLIST_ERROR'}));
}

//Auth actions

export let AuthUser = (userName, password) => async (dispatch) => {
    try {
        dispatch({type: 'SET_USER_LOADING', payload: true});
        let token = await service.createRequestToken();
        let validatedToken = await service.validateRequestToken(userName, password, token.request_token);

        if (validatedToken.status_code === 30) {
            throw new SubmissionError('Неправильное имя или пароль');
        } else if (validatedToken.status_code === 8) {
            throw new SubmissionError('Вы совершили слишком много попыток входа, попробуйте позже');
        } else if (validatedToken.status_code === 9) {
            throw new SubmissionError('Сервер недоступен, попробуйте позже');
        } else if (validatedToken.status_code && validatedToken.status_code !== 1) {
            throw new SubmissionError('Что-то пошло не так, попробуйте позже');
        }

        let sessionId = await service.createSessionId(validatedToken.request_token);
        dispatch({type: 'SET_SESSION_ID', payload: sessionId});
        let userData = await service.getAccountDetails(sessionId.session_id);
        dispatch({type: 'SET_USER_DATA', payload: userData});
    } catch (err) {
        dispatch({type: 'SET_USER_LOADING', payload: false});
        dispatch(stopSubmit("auth", {_error: err.errors}));
    }
}

export let logOut = (sessionId) => (dispatch) => {
    service.logOut(sessionId)
        .then((response) => dispatch({type: 'CLEAR_USER_DATA'}))
}

//User actions

export let markAsFavourite = (userId, sessionId, filmId, isAdding) => async (dispatch) => {
    try {
        dispatch({type: 'SET_IS_IN_FAVOURITE_LOADING', payload: true});
        let response = await service.markAsFavourite(userId, sessionId, filmId, isAdding);

        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        let filmStates = await service.getMovieAccountStates(filmId, sessionId);
        dispatch({type: 'SET_FILM_STATES', payload: filmStates});
        dispatch({type: 'SET_IS_IN_FAVOURITE_LOADING', payload: false});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}

export let addToWatchlist = (userId, sessionId, filmId, isAdding) => async (dispatch) => {
    try {
        dispatch({type: 'SET_IS_IN_WATCHLIST_LOADING', payload: true});
        let response = await service.addToWatchlist(userId, sessionId, filmId, isAdding);

        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        let filmStates = await service.getMovieAccountStates(filmId, sessionId);
        dispatch({type: 'SET_FILM_STATES', payload: filmStates});
        dispatch({type: 'SET_IS_IN_WATCHLIST_LOADING', payload: false});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}

export let changeFilmRating = (sessionId, filmId, rating) => async (dispatch) => {
    try {
        dispatch({type: 'SET_FILM_BUTTONS_LOADING'});

        let response;
        if (rating) {
            response = await service.rateFilm(sessionId, filmId, rating);
        } else {
            response = await service.deleteFilmRating(sessionId, filmId);
        }

        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');
        dispatch({type: 'SET_FILM_RATING', payload: rating});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}
import FilmService from '../services/FilmService';
import TVSeriesService from '../services/TVSeriesService';

export let markAsFavourite = (userId, sessionId, filmId, isAdding, mediaType) => async (dispatch) => {
    try {
        dispatch({type: 'SET_IS_IN_FAVOURITE_LOADING', payload: true});
        let response = await FilmService.markAsFavourite(userId, sessionId, filmId, isAdding, mediaType);

        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        if (mediaType) {
            let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(filmId, sessionId);
            dispatch({type: 'SET_TV_SERIES_STATES', payload: tvSeriesStates});
        } else {
            let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
            dispatch({type: 'SET_FILM_STATES', payload: filmStates});
        }

        dispatch({type: 'SET_IS_IN_FAVOURITE_LOADING', payload: false});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}

export let addToWatchlist = (userId, sessionId, filmId, isAdding, mediaType) => async (dispatch) => {
    try {
        dispatch({type: 'SET_IS_IN_WATCHLIST_LOADING', payload: true});
        let response = await FilmService.addToWatchlist(userId, sessionId, filmId, isAdding, mediaType);

        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        if (mediaType) {
            let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(filmId, sessionId);
            dispatch({type: 'SET_TV_SERIES_STATES', payload: tvSeriesStates});
        } else {
            let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
            dispatch({type: 'SET_FILM_STATES', payload: filmStates});
        }

        dispatch({type: 'SET_IS_IN_WATCHLIST_LOADING', payload: false});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}

export let changeFilmRating = (sessionId, filmId, rating) => async (dispatch) => {
    try {
        dispatch({type: 'SET_FILM_BUTTONS_LOADING'});
        let response = await FilmService.rateFilm(sessionId, filmId, rating);
        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
        dispatch({type: 'SET_FILM_STATES', payload: filmStates});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}
export let deleteFilmRating = (sessionId, filmId) => async (dispatch) => {
    try {
        dispatch({type: 'SET_FILM_BUTTONS_LOADING'});
        let response = await FilmService.deleteFilmRating(sessionId, filmId);
        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
        dispatch({type: 'SET_FILM_STATES', payload: filmStates});
    } catch (err) {
        dispatch({type: 'SET_FILM_STATES_ERROR', payload: err.message});
    }
}

export let changeTVSeriesRating = (sessionId, tvSeriesId, rating) => async (dispatch) => {
    try {
        dispatch({type: 'SET_TV_SERIES_BUTTONS_LOADING'});
        let response = await TVSeriesService.rateTVSeries(sessionId, tvSeriesId, rating);
        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(tvSeriesId, sessionId);
        dispatch({type: 'SET_TV_SERIES_STATES', payload: tvSeriesStates});
    } catch (err) {
        dispatch({type: 'SET_TV_SERIES_STATES_ERROR', payload: err.message});
    }
}
export let deleteTVSeriesRating = (sessionId, tvSeriesId) => async (dispatch) => {
    try {
        dispatch({type: 'SET_TV_SERIES_BUTTONS_LOADING'});
        let response = await TVSeriesService.deleteTVSeriesRating(sessionId, tvSeriesId);
        if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

        let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(tvSeriesId, sessionId);
        dispatch({type: 'SET_TV_SERIES_STATES', payload: tvSeriesStates});
    } catch (err) {
        dispatch({type: 'SET_TV_SERIES_STATES_ERROR', payload: err.message});
    }
}
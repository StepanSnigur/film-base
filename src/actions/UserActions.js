import FilmService from '../services/FilmService';

let service = new FilmService();

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
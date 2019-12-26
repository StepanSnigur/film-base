import FilmService from '../services/FilmService';

export let getTopRatedFilms = page => async dispatch => {
    try {
        dispatch({type: 'SET_CURRENT_FILM_DATA_LOADING'});

        let result = await FilmService.getTopRatedFilms(page);
        dispatch({type: 'SET_CURRENT_RATED_PAGE', payload: result.page});
        dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result});
    } catch {
        dispatch({type: 'SET_FILM_LIST_ERROR'});
    }
}

export let loadMostPopularFilms = page => async dispatch => {
    try {
        dispatch({type: 'SET_CURRENT_FILM_DATA_LOADING'});

        let result = await FilmService.getPopularFilms(page);
        dispatch({type: 'SET_CURRENT_POPULAR_PAGE', payload: result.page});
        dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result});
    } catch {
        dispatch({type: 'SET_FILM_LIST_ERROR'});
    }
}

export let loadUpComingFilms = page => async dispatch => {
    try {
        dispatch({type: 'SET_CURRENT_FILM_DATA_LOADING'});

        let result = await FilmService.getUpcomingFilms(page);
        dispatch({type: 'SET_CURRENT_UPCOMING_PAGE', payload: result.page});
        dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result});
    } catch {
        dispatch({type: 'SET_FILM_LIST_ERROR'});
    }
}

export let setCurrentFilm = (id, sessionId) => async dispatch => {
    dispatch({type: 'SET_CURRENT_FILM_LOADING'});
    try {
        let filmData = await FilmService.getFilm(id);
        let filmVideos = await FilmService.getFilmVideos(id);
        let filmReviews = await FilmService.getFilmReviews(id);
        let similarFilms = await FilmService.getSimilarFilms(id);

        if (sessionId) {
            let filmStates = await FilmService.getMovieAccountStates(id, sessionId);
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

export let searchFilm = inputValue => dispatch => {
    FilmService.searchFilm(inputValue)
        .then((result) => dispatch({type: 'SEARCH_FILM', payload: result}))
        .catch((err) => dispatch({type: 'SEARCH_FILM_ERROR'}));
}

export let getFavouriteMovies = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_FAVOURITE_MOVIES_LOADING', payload: true});
    FilmService.getFavouriteMovies(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_FAVOURITE_MOVIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_FAVOURITE_MOVIES_ERROR'}));
}

export let getRatedMovies = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_RATED_MOVIES_LOADING', payload: true});
    FilmService.getRatedMovies(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_RATED_MOVIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_RATED_MOVIES_ERROR'}));
}

export let getWatchList = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_WATCHLIST_LOADING', payload: true});
    FilmService.getWatchList(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_WATCHLIST', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_WATCHLIST_ERROR'}));
}
import FilmService from '../services/FilmService';

export let getTopRelatedFilms = (page) => (dispatch) => {
    dispatch({type: 'SET_TOP_RELATED_FILMS_LOADING'});
    FilmService.getTopRatedFilms(page)
        .then((result) => dispatch({type: 'LOAD_TOP_RELATED_FILMS', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_TOP_RELATED_FILMS_ERROR'}))
}

export let loadMostPopularFilms = (page) => (dispatch) => {
    dispatch({type: 'SET_MOST_POPULAR_FILMS_LOADING'});
    FilmService.getPopularFilms(page)
        .then((result) => dispatch({type: 'LOAD_MOST_POPULAR_FILMS', payload: result}))
        .catch((err) => dispatch({type: 'GET_POPULAR_FILMS_ERROR'}));
}

export let setCurrentFilm = (id, sessionId) => async (dispatch) => {
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

export let loadUpComingFilms = (page) => (dispatch) => {
    dispatch({type: 'SET_UP_COMING_FILMS_LOADING'});
    FilmService.getUpcomingFilms(page)
        .then((result) => dispatch({type: 'LOAD_UP_COMING_FILMS', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_UP_COMING_FILMS_ERROR'}));
}

export let searchFilm = (inputValue) => (dispatch) => {
    FilmService.searchFilm(inputValue)
        .then((result) => dispatch({type: 'SEARCH_FILM', payload: result}))
        .catch((err) => dispatch({type: 'SEARCH_FILM_ERROR'}));
}

export let getFavouriteMovies = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_FAVOURITE_MOVIES_LOADING', payload: true});
    FilmService.getFavouriteMovies(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_FAVOURITE_MOVIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_FAVOURITE_MOVIES_ERROR'}));
}

export let getRatedMovies = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_RATED_MOVIES_LOADING', payload: true});
    FilmService.getRatedMovies(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_RATED_MOVIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_RATED_MOVIES_ERROR'}));
}

export let getWatchList = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_WATCHLIST_LOADING', payload: true});
    FilmService.getWatchList(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_WATCHLIST', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_WATCHLIST_ERROR'}));
}
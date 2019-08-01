import FilmService from '../services/FilmService';

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

export let setCurrentFilm = (id) => async (dispatch) => {
    dispatch({type: 'SET_CURRENT_FILM_LOADING'});
    try {
        let filmData = await service.getFilm(id);
        let filmVideos = await service.getFilmVideos(id);
        let filmReviews = await service.getFilmReviews(id);
        let similarFilms = await service.getSimilarFilms(id);

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
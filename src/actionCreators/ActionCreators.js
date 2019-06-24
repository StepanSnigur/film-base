import FilmService from '../services/FilmService';

let service = new FilmService();

export let loadMostPopularFilms = () => async (dispatch) => {
    let result = await service.getPopularFilms();
    dispatch({type: 'LOAD_MOST_POPULAR_FILMS', payload: result});
}

export let setCurrentFilm = (id) => async (dispatch) => {
    dispatch({type: 'SET_CURRENT_FILM_LOADING', payload: true});
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
    dispatch({type: 'SET_CURRENT_FILM_LOADING', payload: false});
}

export let loadUpComingFilms = () => async (dispatch) => {
    let result = await service.getUpcomingFilms();
    dispatch({type: 'LOAD_UP_COMING_FILMS', payload: result});
}

export let searchFilm = (inputValue) => async (dispatch) => {
    let result = await service.searchFilm(inputValue);
    dispatch({type: 'SEARCH_FILM', payload: result});
}
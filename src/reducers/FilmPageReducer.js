let initialState = {
    film: {},
    videos: {
        results: []
    },
    reviews: {
        results: []
    },
    similarFilms: {
        results: []
    },
    filmStates: {
        rated: {}
    },
    isFilmStatesError: false,
    isLoading: true,
    isInFavouriteLoading: false,
    isInWatchlistLoading: false,
    isFilmButtonsLoading: false,
    error: false
}

let currentFilm = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_FILM':
            return {
                ...state,
                film: action.payload.film,
                videos: action.payload.videos,
                reviews: action.payload.reviews,
                similarFilms: action.payload.similar,
                isLoading: false,
                error: false
            }
        case 'SET_FILM_STATES':
            return {
                ...state,
                filmStates: action.payload,
                isFilmButtonsLoading: false,
                isFilmStatesError: false
            }
        case 'SET_CURRENT_FILM_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_CURRENT_FILM_ERROR':
            return {
                ...state,
                error: true
            }
        case 'SET_IS_IN_FAVOURITE_LOADING':
            return {
                ...state,
                isInFavouriteLoading: action.payload,
                isFilmButtonsLoading: action.payload
            }
        case 'SET_IS_IN_WATCHLIST_LOADING':
            return {
                ...state,
                isInWatchlistLoading: action.payload,
                isFilmButtonsLoading: action.payload
            }
        case 'SET_FILM_BUTTONS_LOADING':
            return {
                ...state,
                isFilmButtonsLoading: true
            }
        case 'SET_FILM_STATES_ERROR':
            return {
                ...state,
                isFilmStatesError: action.payload
            }
        default:
            return state;
    }
}

export default currentFilm;
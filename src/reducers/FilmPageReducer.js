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
    isLoading: true,
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
                similarFilms: action.payload.similar
            }
        case 'SET_CURRENT_FILM_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'SET_CURRENT_FILM_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default currentFilm;
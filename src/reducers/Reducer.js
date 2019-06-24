let initialState = {
    topRelatedFilms: {
        results: []
    },
    upComingFilms: {
        results: []
    },
    mostPopularFilms: {
        results: []
    },
    currentFilm: {
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
        isLoading: true
    },
    searchFilms: {
        results: []
    }
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_TOP_RELATED_FILMS':
            return {
                ...state,
                topRelatedFilms: action.payload
            }
        case 'LOAD_UP_COMING_FILMS':
            return {
                ...state,
                upComingFilms: action.payload
            }
        case 'LOAD_MOST_POPULAR_FILMS':
            return {
                ...state,
                mostPopularFilms: action.payload
            }
        case 'SET_CURRENT_FILM':
            return {
                ...state,
                currentFilm: {
                    film: action.payload.film,
                    videos: action.payload.videos,
                    reviews: action.payload.reviews,
                    similarFilms: action.payload.similar
                }
            }
        case 'SET_CURRENT_FILM_LOADING':
            return {
                ...state,
                currentFilm: {
                    ...state.currentFilm,
                    isLoading: action.payload
                }
            }
        case 'SEARCH_FILM':
            return {
                ...state,
                searchFilms: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
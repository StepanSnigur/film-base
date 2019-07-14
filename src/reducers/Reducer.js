let initialState = {
    topRelatedFilms: {
        results: [],
        error: false
    },
    upComingFilms: {
        results: [],
        error: false
    },
    mostPopularFilms: {
        results: [],
        error: false
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
        isLoading: true,
        error: false
    },
    searchFilms: {
        results: [],
        error: false
    }
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_TOP_RELATED_FILMS':
            return {
                ...state,
                topRelatedFilms: {
                    ...state.topRelatedFilms,
                    results: action.payload.results
                }
            }
        case 'LOAD_UP_COMING_FILMS':
            return {
                ...state,
                upComingFilms: {
                    ...state.upComingFilms,
                    results: action.payload.results
                }
            }
        case 'LOAD_MOST_POPULAR_FILMS':
            return {
                ...state,
                mostPopularFilms: {
                    ...state.mostPopularFilms,
                    results: action.payload.results
                }
            }
        case 'SET_CURRENT_FILM':
            return {
                ...state,
                currentFilm: {
                    ...state.currentFilm,
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
        case 'GET_POPULAR_FILMS_ERROR':
            return {
                ...state,
                mostPopularFilms: {
                    ...state.mostPopularFilms,
                    error: true
                }
            }
        case 'LOAD_UP_COMING_FILMS_ERROR':
            return {
                ...state,
                upComingFilms: {
                    ...state.upComingFilms,
                    error: true
                }
            }
        case 'LOAD_TOP_RELATED_FILMS_ERROR':
            return {
                ...state,
                topRelatedFilms: {
                    ...state.topRelatedFilms,
                    error: true
                }
            }
        case 'SEARCH_FILM_ERROR':
            return {
                ...state,
                searchFilms: {
                    ...state.searchFilms,
                    error: true
                }
            }
        case 'SET_CURRENT_FILM_ERROR':
            return {
                ...state,
                currentFilm: {
                    ...state.currentFilm,
                    error: true
                }
            }
        default:
            return state;
    }
}

export default reducer;
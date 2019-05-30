import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

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
        reviews: {
            results: []
        },
        similarFilms: {
            results: []
        }
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
                    reviews: action.payload.reviews,
                    similarFilms: action.payload.similar
                }
            }
        default:
            return state;
    }
}

let store = createStore(reducer, devToolsEnhancer());

export default store;
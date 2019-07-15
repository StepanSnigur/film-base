let initialState = {
    results: [],
    error: false
}

let searchFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_FILM':
            return {
                ...state,
                results: action.payload.results
            }
        case 'SEARCH_FILM_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default searchFilms;
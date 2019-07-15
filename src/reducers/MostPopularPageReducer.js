let initialState = {
    results: [],
    error: false
}

let mostPopularFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MOST_POPULAR_FILMS':
            return {
                ...state,
                results: action.payload.results
            }
        case 'GET_POPULAR_FILMS_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default mostPopularFilms;
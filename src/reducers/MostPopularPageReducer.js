let initialState = {
    results: [],
    error: false,
    isLoading: true
}

let mostPopularFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOST_POPULAR_FILMS_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'LOAD_MOST_POPULAR_FILMS':
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case 'GET_POPULAR_FILMS_ERROR':
            return {
                ...state,
                error: true,
                isLoading: false
            }
        default:
            return state;
    }
}

export default mostPopularFilms;
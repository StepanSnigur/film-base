let initialState = {
    results: [],
    error: false
}

let upComingFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_UP_COMING_FILMS':
            return {
                ...state,
                results: action.payload.results
            }
        case 'LOAD_UP_COMING_FILMS_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default upComingFilms;
let initialState = {
    results: [],
    error: false
}

let topRelatedFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_TOP_RELATED_FILMS':
            return {
                ...state,
                results: action.payload.results
            }
        case 'LOAD_TOP_RELATED_FILMS_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default topRelatedFilms;
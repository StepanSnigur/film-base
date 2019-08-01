let initialState = {
    results: [],
    error: false,
    isLoading: true
}

let topRelatedFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOP_RELATED_FILMS_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'LOAD_TOP_RELATED_FILMS':
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case 'LOAD_TOP_RELATED_FILMS_ERROR':
            return {
                ...state,
                isLoading: false,
                error: true
            }
        default:
            return state;
    }
}

export default topRelatedFilms;
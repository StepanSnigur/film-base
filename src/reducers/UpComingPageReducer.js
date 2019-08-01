let initialState = {
    results: [],
    error: false,
    isLoading: true
}

let upComingFilms = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_UP_COMING_FILMS_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'LOAD_UP_COMING_FILMS':
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case 'LOAD_UP_COMING_FILMS_ERROR':
            return {
                ...state,
                error: true,
                isLoading: false
            }
        default:
            return state;
    }
}

export default upComingFilms;
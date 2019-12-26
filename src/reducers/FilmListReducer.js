let initialState = {
    listData: {
        results: []
    },
    currentPopularPage: null,
    currentRatedPage: null,
    currentUpcomingPage: null,
    isLoading: true,
    error: false
}

let FilmListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_FILM_DATA_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'CHANGE_CURRENT_LIST_DATA':
            return {
                ...state,
                listData: action.payload,
                isLoading: false,
                error: false
            }
        case 'SET_CURRENT_POPULAR_PAGE':
            return {
                ...state,
                currentPopularPage: action.payload
            }
        case 'SET_CURRENT_RATED_PAGE':
            return {
                ...state,
                currentRatedPage: action.payload
            }
        case 'SET_CURRENT_UPCOMING_PAGE':
            return {
                ...state,
                currentUpcomingPage: action.payload
            }
        case 'SET_FILM_LIST_ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default FilmListReducer;
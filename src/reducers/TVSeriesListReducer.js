let initialState = {
    listData: {
        results: []
    },
    isLoading: true
}

let TVSeriesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_LIST_DATA_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'CHANGE_CURRENT_LIST_DATA':
            return {
                ...state,
                listData: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

export default TVSeriesListReducer;
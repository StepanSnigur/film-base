let initialState = {
    isLoading: true,
    isError: false,
    tvSeries: {},
    tvSeriesStates: {
        rated: {}
    },
    isTVSeriesButtonsLoading: false
}

let currentTVSeries = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TV_SERIES':
            return {
                ...state,
                isLoading: false,
                tvSeries: action.payload
            }
        case 'SET_CURRENT_TV_SERIES_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_CURRENT_TV_SERIES_ERROR':
            return {
                ...state,
                isError: true
            }
        case 'SET_TV_SERIES_STATES':
            return {
                ...state,
                tvSeriesStates: action.payload,
                isTVSeriesButtonsLoading: false
            }
        case 'SET_TV_SERIES_RATING':
            return {
                ...state,
                tvSeriesStates: {
                    ...state.tvSeriesStates,
                    rated: {
                        value: action.payload
                    }
                },
                isTVSeriesButtonsLoading: false
            }
        case 'SET_TV_SERIES_BUTTONS_LOADING':
            return {
                ...state,
                isTVSeriesButtonsLoading: true
            }
        default:
            return state;
    }
}

export default currentTVSeries;
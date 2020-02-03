let initialState = {
    isLoading: true,
    isError: false,
    tvSeries: {
        last_episode_to_air: {},
        next_episode_to_air: {
            air_date: null
        }
    },
    tvSeriesStates: {
        rated: {}
    },
    reviews: {
        results: []
    },
    isTVSeriesButtonsLoading: false
}

let currentTVSeries = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TV_SERIES':
            return {
                ...state,
                isLoading: false,
                tvSeries: action.payload.tvSeriesData,
                reviews: action.payload.reviews,
                isError: false
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
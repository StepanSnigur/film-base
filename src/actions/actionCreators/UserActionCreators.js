export let setIsInFavouriteLoading = isLoading => ({
    type: 'SET_IS_IN_FAVOURITE_LOADING',
    payload: isLoading
})
export let setIsInWatchListLoading = isLoading => ({
    type: 'SET_IS_IN_WATCHLIST_LOADING',
    payload: isLoading
})

export let setFilmStatesError = errorMessage => ({
    type: 'SET_FILM_STATES_ERROR',
    payload: errorMessage
})
export let setTVSeriesStatesError = errorMessage => ({
    type: 'SET_TV_SERIES_STATES_ERROR',
    payload: errorMessage
})

export let setFilmButtonsLoading = () => ({
    type: 'SET_FILM_BUTTONS_LOADING'
})
export let setTVSeriesButtonsLoading = () => ({
    type: 'SET_TV_SERIES_BUTTONS_LOADING'
})
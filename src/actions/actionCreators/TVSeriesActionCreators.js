export let setCurrentListDataLoading = () => ({
    type: 'SET_CURRENT_LIST_DATA_LOADING'
})
export let setCurrentPopularPage = page => ({
    type: 'SET_CURRENT_POPULAR_PAGE',
    payload: page
})
export let changeCurrentListData = listData => ({
    type: 'CHANGE_CURRENT_LIST_DATA',
    payload: listData
})
export let setTVSeriesError = () => ({
    type: 'SET_TV_SERIES_LIST_ERROR'
})
export let setCurrentRatedPage = page => ({
    type: 'SET_CURRENT_RATED_PAGE',
    payload: page
})
export let setCurrentOnAirPage = page => ({
    type: 'SET_CURRENT_ON_AIR_PAGE',
    payload: page
})

export let setCurrentTVSeriesLoading = () => ({
    type: 'SET_CURRENT_TV_SERIES_LOADING'
})
export let setTVSeriesStates = tvSeriesStates => ({
    type: 'SET_TV_SERIES_STATES',
    payload: tvSeriesStates
})
export let setCurrentTVSeriesData = (tvSeriesData, tvSeriesReviews) => ({
    type: 'SET_CURRENT_TV_SERIES',
    payload: {
        tvSeriesData,
        reviews: tvSeriesReviews
    }
})
export let setCurrentTVSeriesError = () => ({
    type: 'SET_CURRENT_TV_SERIES_ERROR'
})

export let setRatedTVSeriesLoading = () => ({
    type: 'SET_RATED_TV_SERIES_LOADING'
})
export let loadRatedTVSeries = ratedTVSeries => ({
    type: 'LOAD_RATED_TV_SERIES',
    payload: ratedTVSeries
})
export let loadRatedTVSeriesError = () => ({
    type: 'LOAD_RATED_TV_SERIES_ERROR'
})

export let setFavouriteTVSeriesLoading = () => ({
    type: 'SET_FAVORITE_TV_SERIES_LOADING'
})
export let loadFavouriteTVSeries = favouriteTVSeries => ({
    type: 'LOAD_FAVORITE_TV_SERIES',
    payload: favouriteTVSeries
})
export let loadFavouriteTVSeriesError = () => ({
    type: 'LOAD_FAVORITE_TV_SERIES_ERROR'
})

export let setTVSeriesWatchListLoading = () => ({
    type: 'SET_TV_SERIES_WATCHLIST_LOADING'
})
export let loadTVSeriesWatchList = tvSeriesWatchList => ({
    type: 'LOAD_TV_SERIES_WATCHLIST',
    payload: tvSeriesWatchList
})
export let loadTVSeriesWatchListError = () => ({
    type: 'LOAD_TV_SERIES_WATCHLIST_ERROR'
})
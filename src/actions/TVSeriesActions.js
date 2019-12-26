import TVSeriesService from '../services/TVSeriesService';

export let getPopularTVSeries = page => async dispatch => {
    try {
        dispatch({type: 'SET_CURRENT_LIST_DATA_LOADING'});

        let result = await TVSeriesService.getPopularTVSeries(page);
        dispatch({type: 'SET_CURRENT_POPULAR_PAGE', payload: result.page});
        dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result});
    } catch {
        dispatch({type: 'SET_TV_SERIES_LIST_ERROR'});
    }
}
export let getTopRatedTVSeries = page => async dispatch => {
    try {
        dispatch({type: 'SET_CURRENT_LIST_DATA_LOADING'});

        let result = await TVSeriesService.getTopRatedTVSeries(page);
        dispatch({type: 'SET_CURRENT_RATED_PAGE', payload: result.page});
        dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result});
    } catch {
        dispatch({type: 'SET_TV_SERIES_LIST_ERROR'});
    }
}
export let getTVSeriesOnAir = page => async dispatch => {
    try {
        dispatch({type: 'SET_CURRENT_LIST_DATA_LOADING'});

        let result = await TVSeriesService.getTVSeriesOnAir(page);
        dispatch({type: 'SET_CURRENT_ON_AIR_PAGE', payload: result.page});
        dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result});
    } catch {
        dispatch({type: 'SET_TV_SERIES_LIST_ERROR'});
    }
}

export let setCurrentTVSeries = (id, sessionId) => async dispatch => {
    dispatch({type: 'SET_CURRENT_TV_SERIES_LOADING'});
    try {
        let tvSeriesData = await TVSeriesService.getTVSeries(id);
        let tvSeriesReviews = await TVSeriesService.getTVSeriesReviews(id);

        if (sessionId) {
            let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(id, sessionId);
            dispatch({type: 'SET_TV_SERIES_STATES', payload: tvSeriesStates});
        }

        dispatch({type: 'SET_CURRENT_TV_SERIES', payload: {
            tvSeriesData: tvSeriesData,
            reviews: tvSeriesReviews
        }});
    } catch (err) {
        dispatch({type: 'SET_CURRENT_TV_SERIES_ERROR'})
    }
}

export let getRatedTVSeries = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_RATED_TV_SERIES_LOADING'});
    TVSeriesService.getRatedTVSeries(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_RATED_TV_SERIES', payload: result}))
        .catch(() => dispatch({type: 'LOAD_RATED_TV_SERIES_ERROR'}));
}
export let getFavoriteTVSeries = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_FAVORITE_TV_SERIES_LOADING'});
    TVSeriesService.getFavoriteTVSeries(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_FAVORITE_TV_SERIES', payload: result}))
        .catch(() => dispatch({type: 'LOAD_FAVORITE_TV_SERIES_ERROR'}));
}
export let getTVSeriesWatchlist = (userId, sessionId, page) => dispatch => {
    dispatch({type: 'SET_TV_SERIES_WATCHLIST_LOADING'});
    TVSeriesService.getTVSeriesWatchlist(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_TV_SERIES_WATCHLIST', payload: result}))
        .catch(() => dispatch({type: 'LOAD_TV_SERIES_WATCHLIST_ERROR'}))
}
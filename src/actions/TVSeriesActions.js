import TVSeriesService from '../services/TVSeriesService';

export let getPopularTVSeries = (page) => (dispatch) => {
    dispatch({type: 'SET_CURRENT_LIST_DATA_LOADING'});
    TVSeriesService.getPopularTVSeries(page)
        .then(result => dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result}))
        .catch(err => console.log(err))
}
export let getTopRatedTVSeries = (page) => (dispatch) => {
    dispatch({type: 'SET_CURRENT_LIST_DATA_LOADING'});
    TVSeriesService.getTopRatedTVSeries(page)
        .then(result => dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result}))
        .catch(err => console.log(err))
}
export let getTVSeriesOnAir = (page) => (dispatch) => {
    dispatch({type: 'SET_CURRENT_LIST_DATA_LOADING'});
    TVSeriesService.getTVSeriesOnAir(page)
        .then(result => dispatch({type: 'CHANGE_CURRENT_LIST_DATA', payload: result}))
        .catch(err => console.log(err))
}

export let setCurrentTVSeries = (id, sessionId) => async (dispatch) => {
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

export let getRatedTVSeries = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_RATED_TV_SERIES_LOADING'});
    TVSeriesService.getRatedTVSeries(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_RATED_TV_SERIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_RATED_TV_SERIES_ERROR'}));
}
export let getFavoriteTVSeries = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_FAVORITE_TV_SERIES_LOADING'});
    TVSeriesService.getFavoriteTVSeries(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_FAVORITE_TV_SERIES', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_FAVORITE_TV_SERIES_ERROR'}));
}
export let getTVSeriesWatchlist = (userId, sessionId, page) => (dispatch) => {
    dispatch({type: 'SET_TV_SERIES_WATCHLIST_LOADING'});
    TVSeriesService.getTVSeriesWatchlist(userId, sessionId, page)
        .then((result) => dispatch({type: 'LOAD_TV_SERIES_WATCHLIST', payload: result}))
        .catch((err) => dispatch({type: 'LOAD_TV_SERIES_WATCHLIST_ERROR'}))
}
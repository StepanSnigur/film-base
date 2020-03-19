import TVSeriesService from '../services/TVSeriesService';
import {
    setCurrentListDataLoading,
    setCurrentPopularPage,
    changeCurrentListData,
    setTVSeriesError,
    setCurrentRatedPage,
    setCurrentOnAirPage,
    setCurrentTVSeriesLoading,
    setTVSeriesStates,
    setCurrentTVSeriesData,
    setCurrentTVSeriesError,
    setRatedTVSeriesLoading,
    loadRatedTVSeries,
    loadRatedTVSeriesError,
    setFavouriteTVSeriesLoading,
    loadFavouriteTVSeries,
    loadFavouriteTVSeriesError,
    setTVSeriesWatchListLoading,
    loadTVSeriesWatchList,
    loadTVSeriesWatchListError
} from './actionCreators/TVSeriesActionCreators';

export let getPopularTVSeries = page => async dispatch => {
    try {
        dispatch(setCurrentListDataLoading());

        let result = await TVSeriesService.getPopularTVSeries(page);
        dispatch(setCurrentPopularPage(result.page));
        dispatch(changeCurrentListData(result));
    } catch {
        dispatch(setTVSeriesError());
    }
}
export let getTopRatedTVSeries = page => async dispatch => {
    try {
        dispatch(setCurrentListDataLoading());

        let result = await TVSeriesService.getTopRatedTVSeries(page);
        dispatch(setCurrentRatedPage(result.page));
        dispatch(changeCurrentListData(result));
    } catch {
        dispatch(setTVSeriesError());
    }
}
export let getTVSeriesOnAir = page => async dispatch => {
    try {
        dispatch(setCurrentListDataLoading());

        let result = await TVSeriesService.getTVSeriesOnAir(page);
        dispatch(setCurrentOnAirPage(result.page));
        dispatch(changeCurrentListData(result));
    } catch {
        dispatch(setTVSeriesError());
    }
}

export let setCurrentTVSeries = (id, sessionId) => async dispatch => {
    dispatch(setCurrentTVSeriesLoading());
    try {
        let tvSeriesData = await TVSeriesService.getTVSeries(id);
        let tvSeriesReviews = await TVSeriesService.getTVSeriesReviews(id);

        if (sessionId) {
            let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(id, sessionId);
            dispatch(setTVSeriesStates(tvSeriesStates));
        }

        dispatch(setCurrentTVSeriesData(tvSeriesData, tvSeriesReviews));
    } catch (err) {
        dispatch(setCurrentTVSeriesError())
    }
}

export let getRatedTVSeries = (userId, sessionId, page) => dispatch => {
    dispatch(setRatedTVSeriesLoading());
    TVSeriesService.getRatedTVSeries(userId, sessionId, page)
        .then((result) => dispatch(loadRatedTVSeries(result)))
        .catch(() => dispatch(loadRatedTVSeriesError()));
}
export let getFavoriteTVSeries = (userId, sessionId, page) => dispatch => {
    dispatch(setFavouriteTVSeriesLoading());
    TVSeriesService.getFavoriteTVSeries(userId, sessionId, page)
        .then((result) => dispatch(loadFavouriteTVSeries(result)))
        .catch(() => dispatch(loadFavouriteTVSeriesError()));
}
export let getTVSeriesWatchlist = (userId, sessionId, page) => dispatch => {
    dispatch(setTVSeriesWatchListLoading());
    TVSeriesService.getTVSeriesWatchlist(userId, sessionId, page)
        .then((result) => dispatch(loadTVSeriesWatchList(result)))
        .catch(() => dispatch(loadTVSeriesWatchListError()))
}
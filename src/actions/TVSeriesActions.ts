import { Dispatch } from 'redux';
import TVSeriesService from '../services/TVSeriesService';
import {
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
import {
  ISetCurrentTVSeriesLoading,
  ISetTVSeriesStates,
  ISetCurrentTVSeriesData,
  ISetCurrentTVSeriesError,
  ISetRatedTVSeriesLoading,
  ILoadRatedTVSeries,
  ILoadRatedTVSeriesError,
  ISetFavouriteTVSeriesLoading,
  ILoadFavouriteTVSeries,
  ILoadFavouriteTVSeriesError,
  ISetTVSeriesWatchListLoading,
  ILoadTVSeriesWatchList,
  ILoadTVSeriesWatchListError
} from './actionTypes/TVSeriesActionTypes';

export const setCurrentTVSeries = (id: number, sessionId: string | null) => async (
  dispatch: Dispatch<ISetCurrentTVSeriesLoading | ISetTVSeriesStates | ISetCurrentTVSeriesData | ISetCurrentTVSeriesError>
) => {
  dispatch(setCurrentTVSeriesLoading());
  try {
    const tvSeriesData = await TVSeriesService.getTVSeries(id);
    const tvSeriesReviews = await TVSeriesService.getTVSeriesReviews(id);

    if (sessionId) {
      const tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(id, sessionId);
      dispatch(setTVSeriesStates(tvSeriesStates));
    }

    dispatch(setCurrentTVSeriesData(tvSeriesData, tvSeriesReviews));
  } catch (err) {
    dispatch(setCurrentTVSeriesError())
  }
}

export const getRatedTVSeries = (userId: number, sessionId: string, page?: number) => (
  dispatch: Dispatch<ISetRatedTVSeriesLoading | ILoadRatedTVSeries | ILoadRatedTVSeriesError>
) => {
  dispatch(setRatedTVSeriesLoading());
  TVSeriesService.getRatedTVSeries(userId, sessionId, page)
    .then((result) => dispatch(loadRatedTVSeries(result)))
    .catch(() => dispatch(loadRatedTVSeriesError()));
}
export const getFavoriteTVSeries = (userId: number, sessionId: string, page?: number) => (
  dispatch: Dispatch<ISetFavouriteTVSeriesLoading | ILoadFavouriteTVSeries | ILoadFavouriteTVSeriesError>
) => {
  dispatch(setFavouriteTVSeriesLoading());
  TVSeriesService.getFavoriteTVSeries(userId, sessionId, page)
    .then((result) => dispatch(loadFavouriteTVSeries(result)))
    .catch(() => dispatch(loadFavouriteTVSeriesError()));
}
export const getTVSeriesWatchlist = (userId: number, sessionId: string, page?: number) => (
  dispatch: Dispatch<ISetTVSeriesWatchListLoading | ILoadTVSeriesWatchList | ILoadTVSeriesWatchListError>
) => {
  dispatch(setTVSeriesWatchListLoading());
  TVSeriesService.getTVSeriesWatchlist(userId, sessionId, page)
    .then((result) => dispatch(loadTVSeriesWatchList(result)))
    .catch(() => dispatch(loadTVSeriesWatchListError()))
}

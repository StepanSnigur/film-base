import {Dispatch} from 'redux';
import TVSeriesService from '../services/TVSeriesService';
import {
  setCurrentListDataLoading,
  setCurrentPopularPage,
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
import { changeCurrentListData } from './actionCreators/FilmActionCreators';
import {
  IChangeCurrentListData,
  ISetCurrentPopularPage,
  ISetCurrentRatedPage
} from './actionTypes/FilmActionTypes';
import {
  ISetCurrentListDataLoading,
  ISetTVSeriesListError,
  ISetCurrentOnAirPage,
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

export const getPopularTVSeries = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetTVSeriesListError | ISetCurrentPopularPage | IChangeCurrentListData>
) => {
  try {
    dispatch(setCurrentListDataLoading());

    let result = await TVSeriesService.getPopularTVSeries(page);
    dispatch(setCurrentPopularPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setTVSeriesError());
  }
}
export const getTopRatedTVSeries = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetTVSeriesListError | ISetCurrentRatedPage | IChangeCurrentListData>
) => {
  try {
    dispatch(setCurrentListDataLoading());

    let result = await TVSeriesService.getTopRatedTVSeries(page);
    dispatch(setCurrentRatedPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setTVSeriesError());
  }
}
export const getTVSeriesOnAir = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetTVSeriesListError | ISetCurrentOnAirPage | IChangeCurrentListData>
) => {
  try {
    dispatch(setCurrentListDataLoading());

    let result = await TVSeriesService.getTVSeriesOnAir(page);
    dispatch(setCurrentOnAirPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setTVSeriesError());
  }
}

export const setCurrentTVSeries = (id: number, sessionId: string | null) => async (
  dispatch: Dispatch<ISetCurrentTVSeriesLoading | ISetTVSeriesStates | ISetCurrentTVSeriesData | ISetCurrentTVSeriesError>
) => {
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

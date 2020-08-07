import { ISetCurrentListDataLoading } from './ActionTypes'
import { Dispatch } from 'redux'
import {
  IChangeCurrentListData,
  ISetCurrentPopularFilmPage,
  ISetCurrentPopularTVSeriesPage,
  ISetCurrentRatedFilmPage,
  ISetCurrentRatedTVSeriesPage,
  ISetCurrentUpcomingPage,
  ISetFilmListError
} from './ActionTypes'
import { AppStateType } from '../../store/Store'
import FilmService from '../../services/FilmService'
import {
  changeCurrentListData,
  setCurrentListDataLoading,
  setCurrentPopularFilmPage,
  setCurrentPopularTVSeriesPage,
  setCurrentRatedFilmPage,
  setCurrentUpcomingPage,
  setFilmListError
} from './ActionCreators'
import { ISetCurrentOnAirPage } from '../actionTypes/TVSeriesActionTypes'
import TVSeriesService from '../../services/TVSeriesService'
import {
  setCurrentOnAirPage,
  setCurrentRatedTVSeriesPage,
} from '../actionCreators/TVSeriesActionCreators'

// Films
export const getTopRatedFilms = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetCurrentRatedFilmPage | IChangeCurrentListData | ISetFilmListError>,
  getState: () => AppStateType
) => {
  try {
    dispatch(setCurrentListDataLoading());

    const result = await FilmService.getTopRatedFilms(page || getState().FilmsListReducer.currentRatedFilmPage);
    dispatch(setCurrentRatedFilmPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

export const loadMostPopularFilms = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetCurrentPopularFilmPage | IChangeCurrentListData | ISetFilmListError>,
  getState: () => AppStateType
) => {
  try {
    dispatch(setCurrentListDataLoading());

    const result = await FilmService.getPopularFilms(page || getState().FilmsListReducer.currentPopularFilmPage);
    dispatch(setCurrentPopularFilmPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

export const loadUpComingFilms = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetCurrentUpcomingPage | IChangeCurrentListData | ISetFilmListError>,
  getState: () => AppStateType
) => {
  try {
    dispatch(setCurrentListDataLoading());

    const result = await FilmService.getUpcomingFilms(page || getState().FilmsListReducer.currentUpcomingFilmPage);
    dispatch(setCurrentUpcomingPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

// TV series
export const getTVSeriesOnAir = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetFilmListError | ISetCurrentOnAirPage | IChangeCurrentListData>,
  getState: () => AppStateType
) => {
  try {
    dispatch(setCurrentListDataLoading());

    const result = await TVSeriesService.getTVSeriesOnAir(page || getState().FilmsListReducer.currentTVSeriesOnAirPage);
    dispatch(setCurrentOnAirPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}
export const getTopRatedTVSeries = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetFilmListError | ISetCurrentRatedTVSeriesPage | IChangeCurrentListData>,
  getState: () => AppStateType
) => {
  try {
    dispatch(setCurrentListDataLoading());

    const result = await TVSeriesService.getTopRatedTVSeries(page || getState().FilmsListReducer.currentRatedTVSeriesPage);
    dispatch(setCurrentRatedTVSeriesPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}
export const getPopularTVSeries = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentListDataLoading | ISetFilmListError | ISetCurrentPopularTVSeriesPage | IChangeCurrentListData>,
  getState: () => AppStateType
) => {
  try {
    dispatch(setCurrentListDataLoading());

    const result = await TVSeriesService.getPopularTVSeries(page || getState().FilmsListReducer.currentPopularTVSeriesPage);
    dispatch(setCurrentPopularTVSeriesPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

import {
  IFilmStates,
  IFilmReviews,
  IFilmsResults
} from '../actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';
import { ITVSeriesData } from '../actionCreators/actionCreatorsTypes/TVSeriesActionCreatorsTypes';

export interface ISetCurrentListDataLoading {
  type: 'SET_CURRENT_LIST_DATA_LOADING'
}
export interface ISetTVSeriesListError {
  type: 'SET_TV_SERIES_LIST_ERROR'
}

export interface ISetCurrentOnAirPage {
  type: 'FILMS_LIST/SET_TV_SERIES_ON_AIR',
  payload: number
}

export interface ISetCurrentTVSeriesLoading {
  type: 'SET_CURRENT_TV_SERIES_LOADING'
}
export interface ISetTVSeriesStates {
  type: 'SET_TV_SERIES_STATES',
  payload: IFilmStates
}
export interface ISetCurrentTVSeriesData {
  type: 'SET_CURRENT_TV_SERIES',
  payload: {
    tvSeriesData: ITVSeriesData,
    reviews: IFilmReviews
  }
}
export interface ISetCurrentTVSeriesError {
  type: 'SET_CURRENT_TV_SERIES_ERROR'
}

export interface ISetRatedTVSeriesLoading {
  type: 'SET_RATED_TV_SERIES_LOADING'
}
export interface ILoadRatedTVSeries {
  type: 'LOAD_RATED_TV_SERIES',
  payload: IFilmsResults
}
export interface ILoadRatedTVSeriesError {
  type: 'LOAD_RATED_TV_SERIES_ERROR'
}

export interface ISetFavouriteTVSeriesLoading {
  type: 'SET_FAVORITE_TV_SERIES_LOADING'
}
export interface ILoadFavouriteTVSeries {
  type: 'LOAD_FAVORITE_TV_SERIES',
  payload: IFilmsResults
}
export interface ILoadFavouriteTVSeriesError {
  type: 'LOAD_FAVORITE_TV_SERIES_ERROR'
}

export interface ISetTVSeriesWatchListLoading {
  type: 'SET_TV_SERIES_WATCHLIST_LOADING'
}
export interface ILoadTVSeriesWatchList {
  type: 'LOAD_TV_SERIES_WATCHLIST',
  payload: IFilmsResults
}
export interface ILoadTVSeriesWatchListError {
  type: 'LOAD_TV_SERIES_WATCHLIST_ERROR'
}

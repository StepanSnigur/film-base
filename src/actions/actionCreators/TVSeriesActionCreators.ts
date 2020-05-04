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
} from '../actionTypes/TVSeriesActionTypes';
import {
  ISetCurrentPopularPage,
  ISetCurrentRatedPage
} from '../actionTypes/FilmActionTypes';
import { IFilmStates, IFilmReviews, IFilmsResults } from './actionCreatorsTypes/FilmActionCreatorsTypes';
import { ITVSeriesData } from './actionCreatorsTypes/TVSeriesActionCreatorsTypes';

export const setCurrentListDataLoading = (): ISetCurrentListDataLoading => ({
  type: 'SET_CURRENT_LIST_DATA_LOADING'
})
export const setCurrentPopularPage = (page: number): ISetCurrentPopularPage => ({
  type: 'SET_CURRENT_POPULAR_PAGE',
  payload: page
})
export const setTVSeriesError = (): ISetTVSeriesListError => ({
  type: 'SET_TV_SERIES_LIST_ERROR'
})
export const setCurrentRatedPage = (page: number): ISetCurrentRatedPage => ({
  type: 'SET_CURRENT_RATED_PAGE',
  payload: page
})
export const setCurrentOnAirPage = (page: number): ISetCurrentOnAirPage => ({
  type: 'SET_CURRENT_ON_AIR_PAGE',
  payload: page
})

export const setCurrentTVSeriesLoading = (): ISetCurrentTVSeriesLoading => ({
  type: 'SET_CURRENT_TV_SERIES_LOADING'
})
export const setTVSeriesStates = (tvSeriesStates: IFilmStates): ISetTVSeriesStates => ({
  type: 'SET_TV_SERIES_STATES',
  payload: tvSeriesStates
})
export const setCurrentTVSeriesData = (tvSeriesData: ITVSeriesData, tvSeriesReviews: IFilmReviews): ISetCurrentTVSeriesData => ({
  type: 'SET_CURRENT_TV_SERIES',
  payload: {
    tvSeriesData,
    reviews: tvSeriesReviews
  }
})
export const setCurrentTVSeriesError = (): ISetCurrentTVSeriesError => ({
  type: 'SET_CURRENT_TV_SERIES_ERROR'
})

export const setRatedTVSeriesLoading = (): ISetRatedTVSeriesLoading => ({
  type: 'SET_RATED_TV_SERIES_LOADING'
})
export const loadRatedTVSeries = (ratedTVSeries: IFilmsResults): ILoadRatedTVSeries => ({
  type: 'LOAD_RATED_TV_SERIES',
  payload: ratedTVSeries
})
export const loadRatedTVSeriesError = (): ILoadRatedTVSeriesError => ({
  type: 'LOAD_RATED_TV_SERIES_ERROR'
})

export const setFavouriteTVSeriesLoading = (): ISetFavouriteTVSeriesLoading => ({
  type: 'SET_FAVORITE_TV_SERIES_LOADING'
})
export const loadFavouriteTVSeries = (favouriteTVSeries: IFilmsResults): ILoadFavouriteTVSeries => ({
  type: 'LOAD_FAVORITE_TV_SERIES',
  payload: favouriteTVSeries
})
export const loadFavouriteTVSeriesError = (): ILoadFavouriteTVSeriesError => ({
  type: 'LOAD_FAVORITE_TV_SERIES_ERROR'
})

export const setTVSeriesWatchListLoading = (): ISetTVSeriesWatchListLoading => ({
  type: 'SET_TV_SERIES_WATCHLIST_LOADING'
})
export const loadTVSeriesWatchList = (tvSeriesWatchList: IFilmsResults): ILoadTVSeriesWatchList => ({
  type: 'LOAD_TV_SERIES_WATCHLIST',
  payload: tvSeriesWatchList
})
export const loadTVSeriesWatchListError = (): ILoadTVSeriesWatchListError => ({
  type: 'LOAD_TV_SERIES_WATCHLIST_ERROR'
})

import {
  ISetIsInFavouriteLoading,
  ISetIsInWatchListLoading,
  ISetFilmStatesError,
  ISetTVSeriesStatesError,
  ISetFilmButtonsLoading,
  ISetTVSeriesButtonsLoading
} from '../actionTypes/UserActionTypes';

export const setIsInFavouriteLoading = (isLoading: boolean): ISetIsInFavouriteLoading => ({
  type: 'SET_IS_IN_FAVOURITE_LOADING',
  payload: isLoading
})
export const setIsInWatchListLoading = (isLoading: boolean): ISetIsInWatchListLoading => ({
  type: 'SET_IS_IN_WATCHLIST_LOADING',
  payload: isLoading
})

export const setFilmStatesError = (errorMessage: string): ISetFilmStatesError => ({
  type: 'SET_FILM_STATES_ERROR',
  payload: errorMessage
})
export const setTVSeriesStatesError = (errorMessage: string): ISetTVSeriesStatesError => ({
  type: 'SET_TV_SERIES_STATES_ERROR',
  payload: errorMessage
})

export const setFilmButtonsLoading = (): ISetFilmButtonsLoading => ({
  type: 'SET_FILM_BUTTONS_LOADING'
})
export const setTVSeriesButtonsLoading = (): ISetTVSeriesButtonsLoading => ({
  type: 'SET_TV_SERIES_BUTTONS_LOADING'
})

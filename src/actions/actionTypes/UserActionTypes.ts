export interface ISetIsInFavouriteLoading {
  type: 'SET_IS_IN_FAVOURITE_LOADING',
  payload: boolean
}
export interface ISetIsInWatchListLoading {
  type: 'SET_IS_IN_WATCHLIST_LOADING',
  payload: boolean
}

export interface ISetFilmStatesError {
  type: 'SET_FILM_STATES_ERROR',
  payload: string
}
export interface ISetTVSeriesStatesError {
  type: 'SET_TV_SERIES_STATES_ERROR',
  payload: string
}

export interface ISetFilmButtonsLoading {
  type: 'SET_FILM_BUTTONS_LOADING'
}
export interface ISetTVSeriesButtonsLoading {
  type: 'SET_TV_SERIES_BUTTONS_LOADING'
}

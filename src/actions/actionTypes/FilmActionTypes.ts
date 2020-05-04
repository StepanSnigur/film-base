import {
  IFilmListData,
  IFilmStates,
  IFilmData,
  IFilmVideos,
  IFilmReviews,
  IFilmsResults
} from '../actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

export interface ISetCurrentFilmDataLoading {
  type: 'SET_CURRENT_FILM_DATA_LOADING'
}
export interface IChangeCurrentListData {
  type: 'CHANGE_CURRENT_LIST_DATA',
  payload: IFilmListData
}

export interface ISetCurrentRatedPage {
  type: 'SET_CURRENT_RATED_PAGE',
  payload: number
}
export interface ISetCurrentPopularPage {
  type: 'SET_CURRENT_POPULAR_PAGE',
  payload: number
}
export interface ISetCurrentUpcomingPage {
  type: 'SET_CURRENT_UPCOMING_PAGE',
  payload: number
}
export interface ISetFilmListError {
  type: 'SET_FILM_LIST_ERROR'
}

export interface ISetCurrentFilmLoading {
  type: 'SET_CURRENT_FILM_LOADING'
}
export interface ISetFilmStates {
  type: 'SET_FILM_STATES',
  payload: IFilmStates
}
export interface ISetCurrentFilmData {
  type: 'SET_CURRENT_FILM',
  payload: {
    film: IFilmData,
    videos: IFilmVideos,
    reviews: IFilmReviews,
    similar: IFilmsResults
  }
}
export interface ISetCurrentFilmError {
  type: 'SET_CURRENT_FILM_ERROR'
}
export interface ISearchFilmData {
  type: 'SEARCH_FILM',
  payload: IFilmsResults
}
export interface ISearchFilmError {
  type: 'SEARCH_FILM_ERROR'
}

export interface ISetFavouriteMoviesLoading {
  type: 'SET_FAVOURITE_MOVIES_LOADING'
}
export interface ILoadFavouriteMovies {
  type: 'LOAD_FAVOURITE_MOVIES',
  payload: IFilmsResults
}
export interface ILoadFavouriteMoviesError {
  type: 'LOAD_FAVOURITE_MOVIES_ERROR'
}

export interface ISetRatedMoviesLoading {
  type: 'SET_RATED_MOVIES_LOADING'
}
export interface ILoadRatedMovies {
  type: 'LOAD_RATED_MOVIES',
  payload: IFilmsResults
}
export interface ILoadRatedMoviesError {
  type: 'LOAD_RATED_MOVIES_ERROR'
}

export interface ISetWatchListLoading {
  type: 'SET_WATCHLIST_LOADING'
}
export interface ILoadWatchList {
  type: 'LOAD_WATCHLIST',
  payload: IFilmsResults
}
export interface ILoadWatchListError {
  type: 'LOAD_WATCHLIST_ERROR'
}

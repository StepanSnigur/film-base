import {
  IFilmStates,
  IFilmData,
  IFilmVideos,
  IFilmReviews,
  IFilmsResults
} from '../actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

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

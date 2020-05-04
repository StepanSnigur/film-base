import {
  ISetCurrentFilmDataLoading,
  IChangeCurrentListData,
  ISetCurrentRatedPage,
  ISetCurrentPopularPage,
  ISetCurrentUpcomingPage,
  ISetFilmListError,
  ISetCurrentFilmLoading,
  ISetFilmStates,
  ISetCurrentFilmData,
  ISetCurrentFilmError,
  ISearchFilmData,
  ISearchFilmError,
  ISetFavouriteMoviesLoading,
  ILoadFavouriteMovies,
  ILoadFavouriteMoviesError,
  ISetRatedMoviesLoading,
  ILoadRatedMovies,
  ILoadRatedMoviesError,
  ISetWatchListLoading,
  ILoadWatchList,
  ILoadWatchListError
} from '../actionTypes/FilmActionTypes';
import {
  IFilmListData,
  IFilmStates,
  IFilmData,
  IFilmVideos,
  IFilmReviews,
  IFilmsResults
} from './actionCreatorsTypes/FilmActionCreatorsTypes';

export const setCurrentFilmDataLoading = (): ISetCurrentFilmDataLoading => ({
  type: 'SET_CURRENT_FILM_DATA_LOADING'
})
export const changeCurrentListData = (listData: IFilmListData): IChangeCurrentListData => ({
  type: 'CHANGE_CURRENT_LIST_DATA',
  payload: listData
})

export const setCurrentPopularPage = (page: number): ISetCurrentPopularPage => ({
  type: 'SET_CURRENT_POPULAR_PAGE',
  payload: page
})
export const setCurrentRatedPage = (page: number): ISetCurrentRatedPage => ({
  type: 'SET_CURRENT_RATED_PAGE',
  payload: page
})
export const setCurrentUpcomingPage = (page: number): ISetCurrentUpcomingPage => ({
  type: 'SET_CURRENT_UPCOMING_PAGE',
  payload: page
})
export const setFilmListError = (): ISetFilmListError => ({
  type: 'SET_FILM_LIST_ERROR'
})

export  const setCurrentFilmLoading = (): ISetCurrentFilmLoading => ({
  type: 'SET_CURRENT_FILM_LOADING'
})
export const setFilmStates = (filmStates: IFilmStates): ISetFilmStates => ({
  type: 'SET_FILM_STATES',
  payload: filmStates
})
export const setCurrentFilmData = (
  filmData: IFilmData,
  filmVideos: IFilmVideos,
  filmReviews: IFilmReviews,
  similarFilms: IFilmsResults
): ISetCurrentFilmData => ({
  type: 'SET_CURRENT_FILM',
  payload: {
    film: filmData,
    videos: filmVideos,
    reviews: filmReviews,
    similar: similarFilms
  }
})
export const setCurrentFilmError = (): ISetCurrentFilmError => ({
  type: 'SET_CURRENT_FILM_ERROR'
})

export const searchFilmData = (searchResult: IFilmsResults): ISearchFilmData => ({
  type: 'SEARCH_FILM',
  payload: searchResult
})
export const searchFilmError = (): ISearchFilmError => ({
  type: 'SEARCH_FILM_ERROR'
})

export const setFavouriteMoviesLoading = (): ISetFavouriteMoviesLoading => ({
  type: 'SET_FAVOURITE_MOVIES_LOADING'
})
export const loadFavouriteMovies = (favouriteMovies: IFilmsResults): ILoadFavouriteMovies => ({
  type: 'LOAD_FAVOURITE_MOVIES',
  payload: favouriteMovies
})
export const loadFavouriteMoviesError = (): ILoadFavouriteMoviesError => ({
  type: 'LOAD_FAVOURITE_MOVIES_ERROR'
})

export const setRatedMoviesLoading = (): ISetRatedMoviesLoading => ({
  type: 'SET_RATED_MOVIES_LOADING'
})
export const loadRatedMovies = (ratedMovies: IFilmsResults): ILoadRatedMovies => ({
  type: 'LOAD_RATED_MOVIES',
  payload: ratedMovies
})
export const loadRatedMoviesError = (): ILoadRatedMoviesError => ({
  type: 'LOAD_RATED_MOVIES_ERROR'
})

export const setWatchListLoading = (): ISetWatchListLoading => ({
  type: 'SET_WATCHLIST_LOADING'
})
export const loadWatchList = (watchList: IFilmsResults): ILoadWatchList => ({
  type: 'LOAD_WATCHLIST',
  payload: watchList
})
export const loadWatchListError = (): ILoadWatchListError => ({
  type: 'LOAD_WATCHLIST_ERROR'
})

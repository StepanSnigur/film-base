import { Dispatch } from 'redux';
import FilmService from '../services/FilmService';
import {
  setCurrentFilmLoading,
  setFilmStates,
  setCurrentFilmData,
  setCurrentFilmError,
  searchFilmData,
  searchFilmError,
  setFavouriteMoviesLoading,
  loadFavouriteMovies,
  loadFavouriteMoviesError,
  setRatedMoviesLoading,
  loadRatedMovies,
  loadRatedMoviesError,
  setWatchListLoading,
  loadWatchList,
  loadWatchListError
} from './actionCreators/FilmActionCreators';
import {
  ISetCurrentFilmLoading,
  ISetFilmStates,
  ISetCurrentFilmData,
  ISetCurrentFilmError,
  ISearchFilmData,
  ISearchFilmError,
  ILoadFavouriteMovies,
  ISetFavouriteMoviesLoading,
  ILoadFavouriteMoviesError,
  ISetRatedMoviesLoading,
  ILoadRatedMovies,
  ILoadRatedMoviesError,
  ISetWatchListLoading,
  ILoadWatchList,
  ILoadWatchListError
} from './actionTypes/FilmActionTypes';
import { addLastPage } from './actionCreators/HistoryReducerActionCreators';
import { IAddLastPage } from './actionTypes/HistoryReducerActionTypes';

export const setCurrentFilm = (id: number, sessionId: string | null) => async (
  dispatch: Dispatch<ISetCurrentFilmLoading | ISetFilmStates | ISetCurrentFilmData | ISetCurrentFilmError |
    IAddLastPage>
) => {
  try {
    dispatch(setCurrentFilmLoading());
    const filmData = await FilmService.getFilm(id);
    const filmVideos = await FilmService.getFilmVideos(id);
    const filmReviews = await FilmService.getFilmReviews(id);
    const similarFilms = await FilmService.getSimilarFilms(id);

    if (sessionId) {
      const filmStates = await FilmService.getMovieAccountStates(id, sessionId);
      dispatch(setFilmStates(filmStates));
    }

    dispatch(setCurrentFilmData(filmData, filmVideos, filmReviews, similarFilms));
    dispatch(addLastPage({ url: window.location.pathname, title: filmData.title }))
  } catch (err) {
    dispatch(setCurrentFilmError());
  }
}

export const searchFilm = (inputValue: string) => (dispatch: Dispatch<ISearchFilmData | ISearchFilmError>) => {
  FilmService.searchFilm(inputValue)
    .then(result => dispatch(searchFilmData(result)))
    .catch(() => dispatch(searchFilmError()));
}

export const getFavouriteMovies = (userId: number, sessionId: string, page?: number) => (
  dispatch: Dispatch<ISetFavouriteMoviesLoading | ILoadFavouriteMovies | ILoadFavouriteMoviesError>
) => {
  dispatch(setFavouriteMoviesLoading());
  FilmService.getFavouriteMovies(userId, sessionId, page)
    .then(result => dispatch(loadFavouriteMovies(result)))
    .catch(() => dispatch(loadFavouriteMoviesError()));
}

export const getRatedMovies = (userId: number, sessionId: string, page?: number) => (
  dispatch: Dispatch<ISetRatedMoviesLoading | ILoadRatedMovies | ILoadRatedMoviesError>
) => {
  dispatch(setRatedMoviesLoading());
  FilmService.getRatedMovies(userId, sessionId, page)
    .then(result => dispatch(loadRatedMovies(result)))
    .catch(() => dispatch(loadRatedMoviesError()));
}

export const getWatchList = (userId: number, sessionId: string, page?: number) => (
  dispatch: Dispatch<ISetWatchListLoading | ILoadWatchList | ILoadWatchListError>
) => {
  dispatch(setWatchListLoading());
  FilmService.getWatchList(userId, sessionId, page)
    .then(result => dispatch(loadWatchList(result)))
    .catch(() => dispatch(loadWatchListError()));
}

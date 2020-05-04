import { Dispatch } from 'redux';
import FilmService from '../services/FilmService';
import {
  setCurrentFilmDataLoading,
  setCurrentPopularPage,
  setCurrentRatedPage,
  setCurrentUpcomingPage,
  changeCurrentListData,
  setFilmListError,
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

export const getTopRatedFilms = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentFilmDataLoading | ISetCurrentRatedPage | IChangeCurrentListData | ISetFilmListError>
) => {
  try {
    dispatch(setCurrentFilmDataLoading());

    let result = await FilmService.getTopRatedFilms(page);
    dispatch(setCurrentRatedPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

export const loadMostPopularFilms = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentFilmDataLoading | ISetCurrentPopularPage | IChangeCurrentListData | ISetFilmListError>
) => {
  try {
    dispatch(setCurrentFilmDataLoading());

    let result = await FilmService.getPopularFilms(page);
    dispatch(setCurrentPopularPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

export const loadUpComingFilms = (page?: number) => async (
  dispatch: Dispatch<ISetCurrentFilmDataLoading | ISetCurrentUpcomingPage | IChangeCurrentListData | ISetFilmListError>
) => {
  try {
    dispatch(setCurrentFilmDataLoading());

    let result = await FilmService.getUpcomingFilms(page);
    dispatch(setCurrentUpcomingPage(result.page));
    dispatch(changeCurrentListData(result));
  } catch {
    dispatch(setFilmListError());
  }
}

export const setCurrentFilm = (id: number, sessionId: string | null) => async (
  dispatch: Dispatch<ISetCurrentFilmLoading | ISetFilmStates | ISetCurrentFilmData | ISetCurrentFilmError>
) => {
  try {
    dispatch(setCurrentFilmLoading());
    let filmData = await FilmService.getFilm(id);
    let filmVideos = await FilmService.getFilmVideos(id);
    let filmReviews = await FilmService.getFilmReviews(id);
    let similarFilms = await FilmService.getSimilarFilms(id);

    if (sessionId) {
        let filmStates = await FilmService.getMovieAccountStates(id, sessionId);
        dispatch(setFilmStates(filmStates));
    }

    dispatch(setCurrentFilmData(filmData, filmVideos, filmReviews, similarFilms));
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

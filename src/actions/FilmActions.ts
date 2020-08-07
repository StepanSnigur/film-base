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

// export const getTopRatedFilms = (page?: number) => async (
//   dispatch: Dispatch<ISetCurrentListDataLoading | ISetCurrentRatedFilmPage | IChangeCurrentListData | ISetFilmListError>,
//   getState: () => AppStateType
// ) => {
//   try {
//     dispatch(setCurrentListDataLoading());
//
//     const result = await FilmService.getTopRatedFilms(page || getState().FilmsListReducer.currentRatedFilmPage);
//     dispatch(setCurrentRatedFilmPage(result.page));
//     dispatch(changeCurrentListData(result));
//   } catch {
//     dispatch(setFilmListError());
//   }
// }
//
// export const loadMostPopularFilms = (page?: number) => async (
//   dispatch: Dispatch<ISetCurrentListDataLoading | ISetCurrentPopularFilmPage | IChangeCurrentListData | ISetFilmListError>,
//   getState: () => AppStateType
// ) => {
//   try {
//     dispatch(setCurrentListDataLoading());
//
//     const result = await FilmService.getPopularFilms(page || getState().FilmsListReducer.currentPopularFilmPage);
//     dispatch(setCurrentPopularPage(result.page));
//     dispatch(changeCurrentListData(result));
//   } catch {
//     dispatch(setFilmListError());
//   }
// }
//
// export const loadUpComingFilms = (page?: number) => async (
//   dispatch: Dispatch<ISetCurrentListDataLoading | ISetCurrentUpcomingPage | IChangeCurrentListData | ISetFilmListError>,
//   getState: () => AppStateType
// ) => {
//   try {
//     dispatch(setCurrentListDataLoading());
//
//     const result = await FilmService.getUpcomingFilms(page || getState().FilmsListReducer.currentUpcomingFilmPage);
//     dispatch(setCurrentUpcomingPage(result.page));
//     dispatch(changeCurrentListData(result));
//   } catch {
//     dispatch(setFilmListError());
//   }
// }

export const setCurrentFilm = (id: number, sessionId: string | null) => async (
  dispatch: Dispatch<ISetCurrentFilmLoading | ISetFilmStates | ISetCurrentFilmData | ISetCurrentFilmError>
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

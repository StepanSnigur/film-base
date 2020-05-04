import { Dispatch } from 'redux';
import FilmService from '../services/FilmService';
import TVSeriesService from '../services/TVSeriesService';
import {
  setIsInFavouriteLoading,
  setIsInWatchListLoading,
  setFilmStatesError,
  setTVSeriesStatesError,
  setFilmButtonsLoading,
  setTVSeriesButtonsLoading
} from './actionCreators/UserActionCreators';
import { setTVSeriesStates } from './actionCreators/TVSeriesActionCreators';
import { setFilmStates } from './actionCreators/FilmActionCreators';
import {
  ISetIsInFavouriteLoading,
  ISetFilmStatesError,
  ISetIsInWatchListLoading,
  ISetFilmButtonsLoading,
  ISetTVSeriesButtonsLoading,
  ISetTVSeriesStatesError
} from './actionTypes/UserActionTypes';
import {
  ISetTVSeriesStates
} from './actionTypes/TVSeriesActionTypes';
import {
  ISetFilmStates
} from './actionTypes/FilmActionTypes';

export const markAsFavourite = (userId: number, sessionId: string, filmId: number, isAdding: boolean, mediaType?: string) => async (
  dispatch: Dispatch<ISetIsInFavouriteLoading | ISetTVSeriesStates | ISetFilmStates | ISetFilmStatesError>
) => {
  try {
    dispatch(setIsInFavouriteLoading(true));
    let response = await FilmService.markAsFavourite(userId, sessionId, filmId, isAdding, mediaType);

    if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

    if (mediaType) {
      let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(filmId, sessionId);
      dispatch(setTVSeriesStates(tvSeriesStates));
    } else {
      let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
      dispatch(setFilmStates(filmStates));
    }

    dispatch(setIsInFavouriteLoading(false));
  } catch (err) {
    dispatch(setFilmStatesError(err.message));
    dispatch(setIsInFavouriteLoading(false));
  }
}

export const addToWatchlist = (userId: number, sessionId: string, filmId: number, isAdding: boolean, mediaType?: string) => async (
  dispatch: Dispatch<ISetIsInWatchListLoading | ISetTVSeriesStates | ISetFilmStates | ISetFilmStatesError>
) => {
  try {
    dispatch(setIsInWatchListLoading(true));
    let response = await FilmService.addToWatchlist(userId, sessionId, filmId, isAdding, mediaType);

    if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

    if (mediaType) {
      let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(filmId, sessionId);
      dispatch(setTVSeriesStates(tvSeriesStates));
    } else {
      let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
      dispatch(setFilmStates(filmStates));
    }

    dispatch(setIsInWatchListLoading(false));
  } catch (err) {
    dispatch(setFilmStatesError(err.message));
    dispatch(setIsInWatchListLoading(false));
  }
}

export const changeFilmRating = (sessionId: string, filmId: number, rating: number) => async (
  dispatch: Dispatch<ISetFilmButtonsLoading | ISetFilmStates | ISetFilmStatesError>
) => {
  try {
    dispatch(setFilmButtonsLoading());
    let response = await FilmService.rateFilm(sessionId, filmId, rating);
    if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

    let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
    dispatch(setFilmStates(filmStates));
  } catch (err) {
    dispatch(setFilmStatesError(err.message));
  }
}
export const deleteFilmRating = (sessionId: string, filmId: number) => async (
  dispatch: Dispatch<ISetFilmButtonsLoading | ISetFilmStates | ISetFilmStatesError>
) => {
  try {
    dispatch(setFilmButtonsLoading());
    let response = await FilmService.deleteFilmRating(sessionId, filmId);
    if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

    let filmStates = await FilmService.getMovieAccountStates(filmId, sessionId);
    dispatch(setFilmStates(filmStates));
  } catch (err) {
    dispatch(setFilmStatesError(err.message));
  }
}

export const changeTVSeriesRating = (sessionId: string, tvSeriesId: number, rating: number) => async (
  dispatch: Dispatch<ISetTVSeriesButtonsLoading | ISetTVSeriesStates | ISetTVSeriesStatesError>
) => {
  try {
    dispatch(setTVSeriesButtonsLoading());
    let response = await TVSeriesService.rateTVSeries(sessionId, tvSeriesId, rating);
    if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

    let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(tvSeriesId, sessionId);
    dispatch(setTVSeriesStates(tvSeriesStates));
  } catch (err) {
    dispatch(setTVSeriesStatesError(err.message));
  }
}
export const deleteTVSeriesRating = (sessionId: string, tvSeriesId: number) => async (
  dispatch: Dispatch<ISetTVSeriesButtonsLoading | ISetTVSeriesStates | ISetTVSeriesStatesError>
) => {
  try {
    dispatch(setTVSeriesButtonsLoading());
    let response = await TVSeriesService.deleteTVSeriesRating(sessionId, tvSeriesId);
    if (response.status_code !== 1 && response.status_code !== 12 && response.status_code !== 13) throw new Error('Что-то пошло не так, попробуйте позже');

    let tvSeriesStates = await TVSeriesService.getTVSeriesAccountStates(tvSeriesId, sessionId);
    dispatch(setTVSeriesStates(tvSeriesStates));
  } catch (err) {
    dispatch(setTVSeriesStatesError(err.message));
  }
}

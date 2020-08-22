import { IFilmListData } from '../actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes'
import {
  ISetCurrentListDataLoading,
  IChangeCurrentListData,
  ISetCurrentPopularFilmPage,
  ISetCurrentPopularTVSeriesPage,
  ISetCurrentRatedFilmPage,
  ISetCurrentUpcomingPage,
  ISetFilmListError,
  IUpdateCurrentListData
} from './ActionTypes'

export const changeCurrentListData = (listData: IFilmListData): IChangeCurrentListData => ({
  type: 'FILMS_LIST/CHANGE_CURRENT_LIST',
  payload: listData
})
export const updateCurrentListData = (listData: IFilmListData): IUpdateCurrentListData => ({
  type: 'FILMS_LIST/UPDATE_CURRENT_LIST',
  payload: listData
})
export const setCurrentListDataLoading = (): ISetCurrentListDataLoading => ({
  type: 'FILMS_LIST/SET_LOADING'
})
export const setFilmListError = (): ISetFilmListError => ({
  type: 'FILMS_LIST/SET_ERROR'
})

export const setCurrentPopularFilmPage = (page: number): ISetCurrentPopularFilmPage => ({
  type: 'FILMS_LIST/SET_POPULAR_FILM_PAGE',
  payload: page
})
export const setCurrentPopularTVSeriesPage = (page: number): ISetCurrentPopularTVSeriesPage => ({
  type: 'FILMS_LIST/SET_POPULAR_TV_SERIES_PAGE',
  payload: page
})
export const setCurrentRatedFilmPage = (page: number): ISetCurrentRatedFilmPage => ({
  type: 'FILMS_LIST/SET_RATED_FILM_PAGE',
  payload: page
})
export const setCurrentUpcomingPage = (page: number): ISetCurrentUpcomingPage => ({
  type: 'FILMS_LIST/SET_UPCOMING_FILM_PAGE',
  payload: page
})

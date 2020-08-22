import { IFilmListData } from '../actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes'

export interface ISetCurrentListDataLoading {
  type: 'FILMS_LIST/SET_LOADING'
}
export interface IChangeCurrentListData {
  type: 'FILMS_LIST/CHANGE_CURRENT_LIST',
  payload: IFilmListData
}
export interface IUpdateCurrentListData {
  type: 'FILMS_LIST/UPDATE_CURRENT_LIST',
  payload: IFilmListData
}
export interface ISetCurrentRatedFilmPage {
  type: 'FILMS_LIST/SET_RATED_FILM_PAGE',
  payload: number
}
export interface ISetCurrentRatedTVSeriesPage {
  type: 'FILMS_LIST/SET_RATED_TV_SERIES_PAGE',
  payload: number
}

export interface ISetCurrentPopularTVSeriesPage {
  type: 'FILMS_LIST/SET_POPULAR_TV_SERIES_PAGE',
  payload: number
}
export interface ISetCurrentPopularFilmPage {
  type: 'FILMS_LIST/SET_POPULAR_FILM_PAGE',
  payload: number
}
export interface ISetCurrentUpcomingPage {
  type: 'FILMS_LIST/SET_UPCOMING_FILM_PAGE',
  payload: number
}
export interface ISetFilmListError {
  type: 'FILMS_LIST/SET_ERROR'
}

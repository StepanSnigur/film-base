import { ISetCurrentListDataLoading } from '../actions/FilmsList/ActionTypes'
import {
  IChangeCurrentListData,
  ISetCurrentPopularFilmPage,
  ISetCurrentPopularTVSeriesPage,
  ISetCurrentRatedFilmPage,
  ISetCurrentRatedTVSeriesPage,
  ISetCurrentUpcomingPage,
  ISetFilmListError
} from '../actions/FilmsList/ActionTypes'
import {
  IFilmListDataResults
} from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes'
import { ISetCurrentOnAirPage } from '../actions/actionTypes/TVSeriesActionTypes'

interface IFilmsListReducer {
  listData: {
    page: number,
    total_pages: number,
    results: IFilmListDataResults[]
  },
  isLoading: boolean,
  isError: boolean,

  currentRatedTVSeriesPage?: number,
  currentRatedFilmPage?: number,
  currentTVSeriesOnAirPage?: number,
  currentUpcomingFilmPage?: number,
  currentPopularTVSeriesPage?: number,
  currentPopularFilmPage?: number,
}
type FilmsListReducerActions = ISetCurrentListDataLoading | IChangeCurrentListData | ISetFilmListError |
  ISetCurrentRatedTVSeriesPage | ISetCurrentRatedFilmPage | ISetCurrentUpcomingPage | ISetCurrentPopularFilmPage |
  ISetCurrentPopularTVSeriesPage | ISetCurrentOnAirPage

const initialState: IFilmsListReducer = {
  listData: {
    page: 0,
    total_pages: 0,
    results: []
  },
  isLoading: true,
  isError: false
}

const FilmsListReducer = (state = initialState, action: FilmsListReducerActions): IFilmsListReducer => {
  switch (action.type) {
    case 'FILMS_LIST/SET_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'FILMS_LIST/CHANGE_CURRENT_LIST':
      return {
        ...state,
        listData: action.payload,
        isLoading: false,
        isError: false
      }
    case 'FILMS_LIST/SET_ERROR':
      return {
        ...state,
        isError: true
      }

    case 'FILMS_LIST/SET_RATED_TV_SERIES_PAGE':
      return {
        ...state,
        currentRatedTVSeriesPage: action.payload
      }
    case 'FILMS_LIST/SET_RATED_FILM_PAGE':
      return {
        ...state,
        currentRatedFilmPage: action.payload
      }

    case 'FILMS_LIST/SET_TV_SERIES_ON_AIR':
      return {
        ...state,
        currentTVSeriesOnAirPage: action.payload
      }
    case 'FILMS_LIST/SET_UPCOMING_FILM_PAGE':
      return {
        ...state,
        currentUpcomingFilmPage: action.payload
      }

    case 'FILMS_LIST/SET_POPULAR_TV_SERIES_PAGE':
      return {
        ...state,
        currentPopularTVSeriesPage: action.payload
      }
    case 'FILMS_LIST/SET_POPULAR_FILM_PAGE':
      return {
        ...state,
        currentPopularFilmPage: action.payload
      }
    default:
      return state
  }
}

export default FilmsListReducer;

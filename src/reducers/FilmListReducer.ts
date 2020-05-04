import {
  ISetCurrentFilmDataLoading,
  IChangeCurrentListData,
  ISetCurrentPopularPage,
  ISetCurrentRatedPage,
  ISetCurrentUpcomingPage,
  ISetFilmListError
} from '../actions/actionTypes/FilmActionTypes';
import { IFilmListDataResults } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

export interface IFilmListReducer {
  listData: {
    page: number,
    total_pages: number,
    results: IFilmListDataResults[]
  },
  currentPopularPage?: number,
  currentRatedPage?: number,
  currentUpcomingPage?: number,
  isLoading: boolean,
  error: boolean
}
const initialState: IFilmListReducer = {
  listData: {
    page: 0,
    total_pages: 0,
    results: []
  },
  isLoading: true,
  error: false
}
type FilmListReducerActionType = ISetCurrentFilmDataLoading | IChangeCurrentListData | ISetCurrentPopularPage |
  ISetCurrentRatedPage | ISetCurrentUpcomingPage | ISetFilmListError

const FilmListReducer = (state = initialState, action: FilmListReducerActionType): IFilmListReducer => {
  switch (action.type) {
    case 'SET_CURRENT_FILM_DATA_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'CHANGE_CURRENT_LIST_DATA':
      return {
        ...state,
        listData: action.payload,
        isLoading: false,
        error: false
      }
    case 'SET_CURRENT_POPULAR_PAGE':
      return {
        ...state,
        currentPopularPage: action.payload
      }
    case 'SET_CURRENT_RATED_PAGE':
      return {
        ...state,
        currentRatedPage: action.payload
      }
    case 'SET_CURRENT_UPCOMING_PAGE':
      return {
        ...state,
        currentUpcomingPage: action.payload
      }
    case 'SET_FILM_LIST_ERROR':
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default FilmListReducer;

import {
  ISetCurrentListDataLoading,
  ISetCurrentOnAirPage,
  ISetTVSeriesListError
} from '../actions/actionTypes/TVSeriesActionTypes';
import {
  IChangeCurrentListData,
  ISetCurrentPopularPage,
  ISetCurrentRatedPage
} from '../actions/actionTypes/FilmActionTypes';
import { IFilmListDataResults } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

export interface ITVSeriesListReducer {
  listData: {
    page: number,
    total_pages: number,
    results: IFilmListDataResults[]
  },
  currentPopularPage?: number,
  currentRatedPage?: number,
  currentOnAirPage?: number,
  isLoading: boolean,
  error: boolean
}
const initialState: ITVSeriesListReducer = {
  listData: {
    page: 0,
    total_pages: 0,
    results: []
  },
  isLoading: true,
  error: false
}
type TVSeriesListReducerActionTypes = ISetCurrentListDataLoading | IChangeCurrentListData | ISetCurrentPopularPage |
  ISetCurrentRatedPage | ISetCurrentOnAirPage | ISetTVSeriesListError

const TVSeriesListReducer = (state = initialState, action: TVSeriesListReducerActionTypes): ITVSeriesListReducer => {
  switch (action.type) {
    case 'SET_CURRENT_LIST_DATA_LOADING':
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
    case 'SET_CURRENT_ON_AIR_PAGE':
      return {
        ...state,
        currentOnAirPage: action.payload
      }
    case 'SET_TV_SERIES_LIST_ERROR':
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default TVSeriesListReducer;

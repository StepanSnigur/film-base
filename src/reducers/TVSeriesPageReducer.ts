import {
  ISetCurrentTVSeriesData,
  ISetCurrentTVSeriesLoading,
  ISetCurrentTVSeriesError,
  ISetTVSeriesStates
} from '../actions/actionTypes/TVSeriesActionTypes';
import { ISetTVSeriesButtonsLoading } from '../actions/actionTypes/UserActionTypes';
import { IFilmStates, IFilmReviews } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';
import { ITVSeriesData } from '../actions/actionCreators/actionCreatorsTypes/TVSeriesActionCreatorsTypes';

export interface ITVSeriesPageReducer {
  isLoading: boolean,
  isError: boolean,
  tvSeries: ITVSeriesData,
  tvSeriesStates: IFilmStates,
  reviews: IFilmReviews,
  isTVSeriesButtonsLoading: boolean
}
const initialState: ITVSeriesPageReducer = {
  isLoading: true,
  isError: false,
  tvSeries: {
    backdrop_path: null,
    created_by: [{id: 0, credit_id: '', name: '', gender: 0, profile_path: ''}],
    episode_run_time: [0],
    first_air_date: '',
    genres: [{ id: 0, name: '' }],
    homepage: '',
    id: 0,
    in_production: false,
    languages: [''],
    last_air_date: '',
    last_episode_to_air: {
      air_date: '',
      episode_number: 0,
      id: 0,
      name: '',
      overview: '',
      production_code: '',
      season_number: 0,
      show_id: 0,
      still_path: '',
      vote_average: 0,
      vote_count: 0
    },
    name: '',
    next_episode_to_air: {
      air_date: ''
    },
    networks: [{name: '', id: 0, logo_path: '', origin_country: ''}],
    number_of_episodes: 0,
    number_of_seasons: 0,
    origin_country: [''],
    original_language: '',
    original_name: '',
    overview: '',
    popularity: 0,
    poster_path: null,
    production_companies: [{id: 0, logo_path: null, name: '', origin_country: ''}],
    seasons: [{
      air_date: '',
      episode_count: 0,
      id: 0,
      name: '',
      overview: '',
      poster_path: '',
      season_number: 0
    }],
    status: '',
    type: '',
    vote_average: 0,
    vote_count: 0
  },
  tvSeriesStates: {
    id: 0,
    rated: {
      value: 0
    },
    favorite: false,
    watchlist: false
  },
  reviews: {
    id: 0,
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: []
  },
  isTVSeriesButtonsLoading: false
}
type CurrentTVSeriesReducerActionTypes = ISetCurrentTVSeriesData | ISetCurrentTVSeriesLoading | ISetCurrentTVSeriesError |
  ISetTVSeriesStates | ISetTVSeriesButtonsLoading

const currentTVSeries = (state = initialState, action: CurrentTVSeriesReducerActionTypes): ITVSeriesPageReducer => {
  switch (action.type) {
    case 'SET_CURRENT_TV_SERIES':
      return {
        ...state,
        isLoading: false,
        tvSeries: action.payload.tvSeriesData,
        reviews: action.payload.reviews,
        isError: false
      }
    case 'SET_CURRENT_TV_SERIES_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'SET_CURRENT_TV_SERIES_ERROR':
      return {
        ...state,
        isError: true
      }
    case 'SET_TV_SERIES_STATES':
      return {
        ...state,
        tvSeriesStates: action.payload,
        isTVSeriesButtonsLoading: false
      }
    case 'SET_TV_SERIES_BUTTONS_LOADING':
      return {
        ...state,
        isTVSeriesButtonsLoading: true
      }
    default:
      return state;
  }
}

export default currentTVSeries;

import {
  ISetCurrentFilmData,
  ISetFilmStates,
  ISetCurrentFilmLoading,
  ISetCurrentFilmError
} from '../actions/actionTypes/FilmActionTypes';
import {
  ISetIsInFavouriteLoading,
  ISetIsInWatchListLoading,
  ISetFilmStatesError,
  ISetFilmButtonsLoading
} from '../actions/actionTypes/UserActionTypes'
import {
  IFilmData,
  IFilmVideos,
  IFilmReviews,
  IFilmsResults,
  IFilmStates
} from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

export interface ICurrentFilmReducer {
  film: IFilmData,
  videos: IFilmVideos | { results: [] },
  reviews: IFilmReviews,
  similarFilms: Partial<IFilmsResults>,
  filmStates: IFilmStates,
  isFilmStatesError: boolean | string,
  isLoading: boolean,
  isInFavouriteLoading: boolean,
  isInWatchlistLoading: boolean,
  isFilmButtonsLoading: boolean,
  error: boolean
}
const initialState: ICurrentFilmReducer = {
  film: {
    adult: false,
    backdrop_path: null,
    belongs_to_collection: null,
    budget: 0,
    genres: [{ id: 0, name: '' }],
    homepage: null,
    id: 0,
    imdb_id: null,
    original_language: '',
    original_title: '',
    overview: null,
    popularity: 0,
    poster_path: null,
    production_companies: [{name: '', id: 0, logo_path: null, origin_country: ''}],
    production_countries: [{ iso_3166_1: '', name: '' }],
    release_date: '',
    revenue: 0,
    runtime: null,
    spoken_languages: [{ iso_639_1: '', name: '' }],
    status: '',
    tagline: null,
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  },
  videos: {
    results: []
  },
  reviews: {
    id: 0,
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: []
  },
  similarFilms: {
    results: []
  },
  filmStates: {
    id: 0,
    rated: {},
    favorite: false,
    watchlist: false
  },
  isFilmStatesError: false,
  isLoading: true,
  isInFavouriteLoading: false,
  isInWatchlistLoading: false,
  isFilmButtonsLoading: false,
  error: false
}

type FilmPageReducerActionTypes = ISetCurrentFilmData | ISetFilmStates | ISetCurrentFilmLoading |
  ISetCurrentFilmError | ISetIsInFavouriteLoading | ISetIsInWatchListLoading | ISetFilmStatesError |
  ISetFilmButtonsLoading
const currentFilm = (state = initialState, action: FilmPageReducerActionTypes): ICurrentFilmReducer => {
  switch (action.type) {
    case 'SET_CURRENT_FILM':
      return {
        ...state,
        film: action.payload.film,
        videos: action.payload.videos,
        reviews: action.payload.reviews,
        similarFilms: action.payload.similar,
        isLoading: false,
        error: false
      }
    case 'SET_FILM_STATES':
      return {
        ...state,
        filmStates: action.payload,
        isFilmButtonsLoading: false,
        isFilmStatesError: false
      }
    case 'SET_CURRENT_FILM_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'SET_CURRENT_FILM_ERROR':
      return {
        ...state,
        error: true
      }
    case 'SET_IS_IN_FAVOURITE_LOADING':
      return {
        ...state,
        isInFavouriteLoading: action.payload,
        isFilmButtonsLoading: action.payload
      }
    case 'SET_IS_IN_WATCHLIST_LOADING':
      return {
        ...state,
        isInWatchlistLoading: action.payload,
        isFilmButtonsLoading: action.payload
      }
    case 'SET_FILM_BUTTONS_LOADING':
      return {
        ...state,
        isFilmButtonsLoading: true
      }
    case 'SET_FILM_STATES_ERROR':
      return {
        ...state,
        isFilmStatesError: action.payload
      }
    default:
      return state;
  }
}

export default currentFilm;

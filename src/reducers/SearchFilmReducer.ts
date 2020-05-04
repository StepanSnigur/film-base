import { ISearchFilmData, ISearchFilmError } from '../actions/actionTypes/FilmActionTypes';
import { IFilmListDataResults } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

export interface ISearchFilmsReducer {
  results: IFilmListDataResults[],
  error: boolean
}
const initialState: ISearchFilmsReducer = {
  results: [],
  error: false
}
type SearchFilmReducerType = ISearchFilmData | ISearchFilmError

const searchFilms = (state = initialState, action: SearchFilmReducerType): ISearchFilmsReducer => {
  switch (action.type) {
    case 'SEARCH_FILM':
      return {
        ...state,
        results: action.payload.results,
        error: false
      }
    case 'SEARCH_FILM_ERROR':
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default searchFilms;

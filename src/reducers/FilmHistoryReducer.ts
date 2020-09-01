import { IAddLastPage, IRemoveLastPage } from '../actions/actionTypes/HistoryReducerActionTypes'

const initialState = {
  lastPageUrl: '',
  lastPageTitle: ''
}

type FilmHistoryReducerActionType = IAddLastPage | IRemoveLastPage
const FilmHistoryReducer = (state = initialState, action: FilmHistoryReducerActionType) => {
  switch (action.type) {
    case 'ADD_LAST_PAGE':
      return {
        ...state,
        lastPageUrl: action.payload.url,
        lastPageTitle: action.payload.title
      }
    case 'REMOVE_LAST_PAGE':
      return {
        ...state,
        lastPageUrl: '',
        lastPageTitle: '',
      }
    default:
      return state
  }
}

export default FilmHistoryReducer

import { addLastPageType, removeLastPageType } from '../actions/actionTypes/HistoryReducerActionTypes'

const initialState = {
  lastPageUrl: ''
}

type FilmHistoryReducerActionType = addLastPageType | removeLastPageType
const FilmHistoryReducer = (state = initialState, action: FilmHistoryReducerActionType) => {
  switch (action.type) {
    case 'ADD_LAST_PAGE':
      return {
        ...state,
        lastPageUrl: action.payload
      }
    case 'REMOVE_LAST_PAGE':
      return {
        ...state,
        lastPageUrl: ''
      }
    default:
      return state
  }
}

export default FilmHistoryReducer

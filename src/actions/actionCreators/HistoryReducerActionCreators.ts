import { IAddLastPage, IRemoveLastPage } from '../actionTypes/HistoryReducerActionTypes';

export const addLastPage = (lastPageData: { url: string, title: string }): IAddLastPage => ({
  type: 'ADD_LAST_PAGE',
  payload: {
    url: lastPageData.url,
    title: lastPageData.title
  }
})
export const removeLastPage = (): IRemoveLastPage => ({
  type: 'REMOVE_LAST_PAGE'
})

export interface IAddLastPage {
  type: 'ADD_LAST_PAGE',
  payload: {
    url: string,
    title: string
  }
}
export interface IRemoveLastPage {
  type: 'REMOVE_LAST_PAGE'
}

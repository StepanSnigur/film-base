import { IUserData, ISessionData } from '../actionCreators/actionCreatorsTypes/AuthActionCreatorsTypes';

export interface ISetUserData {
  type: 'SET_USER_DATA',
  payload: IUserData & ISessionData
}
export interface ISetUserLoading {
  type: 'SET_USER_LOADING',
  payload: boolean
}
export interface IClearUserData {
  type: 'CLEAR_USER_DATA'
}

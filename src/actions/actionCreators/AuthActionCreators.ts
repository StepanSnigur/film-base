import { IUserData, ISessionData } from './actionCreatorsTypes/AuthActionCreatorsTypes';
import { ISetUserData, ISetUserLoading, IClearUserData } from '../actionTypes/AuthActionTypes';

export const setUserData = (userData: IUserData, sessionId: ISessionData): ISetUserData => ({
  type: 'SET_USER_DATA',
  payload: {
    ...userData,
    ...sessionId
  }
})
export const setUserLoading = (isLoading: boolean): ISetUserLoading => ({
  type: 'SET_USER_LOADING',
  payload: isLoading
})
export const clearUserData = (): IClearUserData => ({
  type: 'CLEAR_USER_DATA'
})

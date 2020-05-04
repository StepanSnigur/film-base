import { Dispatch } from 'redux';
import FilmService from '../services/FilmService';
import { stopSubmit, FormAction, SubmissionError } from 'redux-form';
import { setUserData, setUserLoading, clearUserData } from './actionCreators/AuthActionCreators';
import { ISetUserData, ISetUserLoading, IClearUserData } from './actionTypes/AuthActionTypes';

export const AuthUser = (userName: string, password: string) => async (
  dispatch: Dispatch<ISetUserData | ISetUserLoading | FormAction>
) => {
  try {
    dispatch(setUserLoading(true));
    const token = await FilmService.createRequestToken();
    const validatedToken = await FilmService.validateRequestToken(userName, password, token.request_token);

    if (validatedToken.status_code === 30) {
      throw new SubmissionError(['Неправильное имя или пароль']);
    } else if (validatedToken.status_code === 8) {
      throw new SubmissionError(['Вы совершили слишком много попыток входа, попробуйте позже']);
    } else if (validatedToken.status_code === 9) {
      throw new SubmissionError(['Сервер недоступен, попробуйте позже']);
    } else if (validatedToken.status_code && validatedToken.status_code !== 1) {
      throw new SubmissionError(['Что-то пошло не так, попробуйте позже']);
    }

    const sessionId = await FilmService.createSessionId(validatedToken.request_token);
    const userData = await FilmService.getAccountDetails(sessionId.session_id);
    dispatch(setUserData(userData, sessionId));
  } catch (err) {
    dispatch(setUserLoading(false));
    dispatch(stopSubmit("auth", {_error: err.errors}));
  }
}

export const logOut = (sessionId: string) => (dispatch: Dispatch<IClearUserData>) => {
  FilmService.logOut(sessionId)
    .then(() => dispatch(clearUserData()))
}

import FilmService from '../services/FilmService';
import { stopSubmit, SubmissionError } from 'redux-form';
import { setUserData, setUserLoading, clearUserData } from './actionCreators/AuthActionCreators';

export let AuthUser = (userName, password) => async (dispatch) => {
    try {
        dispatch(setUserLoading(true));
        let token = await FilmService.createRequestToken();
        let validatedToken = await FilmService.validateRequestToken(userName, password, token.request_token);

        if (validatedToken.status_code === 30) {
            throw new SubmissionError('Неправильное имя или пароль');
        } else if (validatedToken.status_code === 8) {
            throw new SubmissionError('Вы совершили слишком много попыток входа, попробуйте позже');
        } else if (validatedToken.status_code === 9) {
            throw new SubmissionError('Сервер недоступен, попробуйте позже');
        } else if (validatedToken.status_code && validatedToken.status_code !== 1) {
            throw new SubmissionError('Что-то пошло не так, попробуйте позже');
        }

        let sessionId = await FilmService.createSessionId(validatedToken.request_token);
        let userData = await FilmService.getAccountDetails(sessionId.session_id);
        dispatch(setUserData(userData, sessionId));
    } catch (err) {
        dispatch(setUserLoading(false));
        dispatch(stopSubmit("auth", {_error: err.errors}));
    }
}

export let logOut = (sessionId) => (dispatch) => {
    FilmService.logOut(sessionId)
        .then(() => dispatch(clearUserData()))
}
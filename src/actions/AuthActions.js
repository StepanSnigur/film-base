import FilmService from '../services/FilmService';
import { stopSubmit, SubmissionError } from 'redux-form';

export let AuthUser = (userName, password) => async (dispatch) => {
    try {
        dispatch({type: 'SET_USER_LOADING', payload: true});
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
        dispatch({
            type: 'SET_USER_DATA',
            payload: {...userData, ...sessionId}
        });
    } catch (err) {
        dispatch({type: 'SET_USER_LOADING', payload: false});
        dispatch(stopSubmit("auth", {_error: err.errors}));
    }
}

export let logOut = (sessionId) => (dispatch) => {
    FilmService.logOut(sessionId)
        .then((response) => dispatch({type: 'CLEAR_USER_DATA'}))
}
import FilmService from '../services/FilmService';
import { stopSubmit, SubmissionError } from 'redux-form';

let service = new FilmService();

export let AuthUser = (userName, password) => async (dispatch) => {
    try {
        dispatch({type: 'SET_USER_LOADING', payload: true});
        let token = await service.createRequestToken();
        let validatedToken = await service.validateRequestToken(userName, password, token.request_token);

        if (validatedToken.status_code === 30) {
            throw new SubmissionError('Неправильное имя или пароль');
        } else if (validatedToken.status_code === 8) {
            throw new SubmissionError('Вы совершили слишком много попыток входа, попробуйте позже');
        } else if (validatedToken.status_code === 9) {
            throw new SubmissionError('Сервер недоступен, попробуйте позже');
        } else if (validatedToken.status_code && validatedToken.status_code !== 1) {
            throw new SubmissionError('Что-то пошло не так, попробуйте позже');
        }

        let sessionId = await service.createSessionId(validatedToken.request_token);
        dispatch({type: 'SET_SESSION_ID', payload: sessionId});
        let userData = await service.getAccountDetails(sessionId.session_id);
        dispatch({type: 'SET_USER_DATA', payload: userData});
    } catch (err) {
        dispatch({type: 'SET_USER_LOADING', payload: false});
        dispatch(stopSubmit("auth", {_error: err.errors}));
    }
}

export let logOut = (sessionId) => (dispatch) => {
    service.logOut(sessionId)
        .then((response) => dispatch({type: 'CLEAR_USER_DATA'}))
}
import { applyMiddleware, createStore, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import currentFilm from '../reducers/FilmPageReducer';
import topRelatedFilms from '../reducers/TopRelatedPageReducer';
import upComingFilms from '../reducers/UpComingPageReducer';
import mostPopularFilms from '../reducers/MostPopularPageReducer';
import searchFilms from '../reducers/SearchFilmReducer';
import UserReducer from '../reducers/UserReducer';
import { reducer as formReducer } from 'redux-form';

let store = createStore(combineReducers({
    currentFilm,
    topRelatedFilms,
    upComingFilms,
    mostPopularFilms,
    searchFilms,
    user: UserReducer,
    form: formReducer
}), applyMiddleware(ReduxThunk));

export default store;
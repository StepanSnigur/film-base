import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import currentFilm from '../reducers/FilmPageReducer';
import topRelatedFilms from '../reducers/TopRelatedPageReducer';
import upComingFilms from '../reducers/UpComingPageReducer';
import mostPopularFilms from '../reducers/MostPopularPageReducer';
import searchFilms from '../reducers/SearchFilmReducer';
import TVSeriesListReducer from '../reducers/TVSeriesListReducer';
import currentTVSeries from '../reducers/TVSeriesPageReducer';
import UserReducer from '../reducers/UserReducer';
import { reducer as formReducer } from 'redux-form';

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(combineReducers({
    currentFilm,
    topRelatedFilms,
    upComingFilms,
    mostPopularFilms,
    searchFilms,
    TVSeriesListReducer,
    currentTVSeries,
    user: UserReducer,
    form: formReducer
}), composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;
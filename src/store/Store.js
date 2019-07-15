import { applyMiddleware, createStore, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import currentFilm from '../reducers/FilmPageReducer';
import topRelatedFilms from '../reducers/TopRelatedPageReducer';
import upComingFilms from '../reducers/UpComingPageReducer';
import mostPopularFilms from '../reducers/MostPopularPageReducer';
import searchFilms from '../reducers/SearchFilmReducer';

let store = createStore(combineReducers({
    currentFilm,
    topRelatedFilms,
    upComingFilms,
    mostPopularFilms,
    searchFilms
}), applyMiddleware(ReduxThunk));

export default store;
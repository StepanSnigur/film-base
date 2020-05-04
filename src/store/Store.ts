import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import currentFilm from '../reducers/FilmPageReducer';
import FilmListReducer from '../reducers/FilmListReducer';
import searchFilms from '../reducers/SearchFilmReducer';
import TVSeriesListReducer from '../reducers/TVSeriesListReducer';
import currentTVSeries from '../reducers/TVSeriesPageReducer';
import UserReducer from '../reducers/UserReducer';
import { reducer as formReducer } from 'redux-form';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  currentFilm,
  FilmListReducer,
  searchFilms,
  TVSeriesListReducer,
  currentTVSeries,
  user: UserReducer,
  form: formReducer
})
export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;

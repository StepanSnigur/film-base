import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from '../reducers/Reducer';

let store = createStore(reducer, applyMiddleware(ReduxThunk));

export default store;
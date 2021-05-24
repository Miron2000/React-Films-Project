import {combineReducers, createStore, applyMiddleware} from "redux";
import {searchFilm} from './reducers/reducers';
import thunk from 'redux-thunk';
import {compose} from 'redux';

const reducers = combineReducers({searchFilm: searchFilm});

const enchancedMiddleware = compose(applyMiddleware(thunk));

export const store = createStore(reducers, enchancedMiddleware);
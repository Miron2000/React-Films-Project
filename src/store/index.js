import {combineReducers, createStore, applyMiddleware} from "redux";
import {Theme, searchFilm} from './reducers/reducers';
import thunk from 'redux-thunk';
import {compose} from 'redux';

const reducers = combineReducers({searchFilm: searchFilm, Theme: Theme});

const enchancedMiddleware = compose(applyMiddleware(thunk));

export const store = createStore(reducers, enchancedMiddleware);
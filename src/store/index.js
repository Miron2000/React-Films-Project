import {combineReducers, createStore, applyMiddleware} from "redux";
import {makeDarkTheme, searchFilm} from './reducers/reducers';
import thunk from 'redux-thunk';
import {compose} from 'redux';

const reducers = combineReducers({searchFilm: searchFilm, makeDarkTheme: makeDarkTheme});

const enchancedMiddleware = compose(applyMiddleware(thunk));

export const store = createStore(reducers, enchancedMiddleware);
import {combineReducers, createStore, applyMiddleware} from "redux";
import {Theme, Films} from './reducers/reducers';
import thunk from 'redux-thunk';
import {compose} from 'redux';

const reducers = combineReducers({Films: Films, Theme: Theme});

const enchancedMiddleware = compose(applyMiddleware(thunk));

export const store = createStore(reducers, enchancedMiddleware);
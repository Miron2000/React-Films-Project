import {combineReducers, createStore, applyMiddleware} from "redux";
import {Theme, Films, User} from './reducers/reducers';
import thunk from 'redux-thunk';
import {compose} from 'redux';

const reducers = combineReducers({Films: Films, Theme: Theme, User: User});

const enchancedMiddleware = compose(applyMiddleware(thunk));


const isDarkMode = localStorage.getItem('isDarkMode');
let preloadedState = {};
if(isDarkMode) {
    preloadedState.Theme = {darkTheme: JSON.parse(isDarkMode)};
}

const userDate = window.USER_DATA;
if(userDate) {
    preloadedState.User = {user: userDate};
}
console.log(preloadedState, 'preloadedState');

export const store = createStore(reducers, preloadedState, enchancedMiddleware);





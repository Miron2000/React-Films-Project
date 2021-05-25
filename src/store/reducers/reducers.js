import {filmActionType, darkMode} from '../actions/actions';

const initialState = {
    searchQuery: '',
    searchQueryRating: '',
    darkTheme: false
};

export const searchFilm = (state = initialState, action) => {
    switch (action.type) {
        case filmActionType.SET_VALUE_SEARCH_QUERY_INPUT:
            return ({
                ...state,
                searchQuery: action.payload
            });

        case filmActionType.SET_VALUE_SEARCH_QUERY_RATING_INPUT:
            return ({
                ...state,
                searchQueryRating: action.payload
            })
        default:
            return state;
    }
};

export const Theme = (state = initialState, action) => {
    switch (action.type) {
        case darkMode.SET_DARK_MODE:
            return ({
                ...state,
                darkTheme: action.payload
            })
        default:
            return state;
    }
}


import {filmActionType, darkMode} from '../actions/actions';

const initialState = {
    searchQuery: '',
    searchQueryRating: '',
    darkTheme: false
};

export const searchFilm = (state = initialState, action) => {
    switch (action.type) {
        case filmActionType.valueSearchQueryInput:
            return ({
                ...state,
                searchQuery: action.payload
            });

        case filmActionType.valueSearchQueryRatingInput:
            return ({
                ...state,
                searchQueryRating: action.payload
            })
        default:
            return state;
    }
};

export const makeDarkTheme = (state = initialState, action) => {
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


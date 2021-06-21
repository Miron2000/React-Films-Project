import {filmActionType, darkModeType, authUser} from '../actions/actions';

const filmInitialState = {
    searchQuery: '',
    searchQueryRating: ''
};

const themeInitialState = {
    darkTheme: false
};

const userInitialState = {
    user: {}
    // statusAuthUser: null
};

export const Films = (state = filmInitialState, action) => {
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

export const Theme = (state = themeInitialState, action) => {
    switch (action.type) {
        case darkModeType.SET_DARK_MODE:
            return ({
                ...state,
                darkTheme: action.payload
            })
        default:
            return state;
    }
}

export const User = (state = userInitialState, action) => {
    switch (action.type) {
        case authUser.SET_AUTH_USER:
            return ({
                ...state,
                user: action.payload
            })
        default:
            return state;
    }
}


import {filmActionType} from '../actions/actions';

const initialState = {
    searchQuery: '',
    searchQueryRating: ''
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


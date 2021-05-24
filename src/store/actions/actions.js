export const filmActionType = {
    valueSearchQueryInput: 'VALUE_SEARCH_QUERY_INPUT',
    valueSearchQueryRatingInput: 'VALUE_SEARCH_QUERY_INPUT_BY_RATING'
}
export const darkMode = {
    SET_DARK_MODE: 'SET_DARK_MODE'
}


export const setSearchValue = (payload) => ({
    type: filmActionType.valueSearchQueryInput,
    payload
});

export const setSearchValueRating = (payload) => ({
    type: filmActionType.valueSearchQueryRatingInput,
    payload
});

export const setDarkMode = (payload) => ({
    type: darkMode.SET_DARK_MODE,
    payload
})
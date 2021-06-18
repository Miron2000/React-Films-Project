export const filmActionType = {
    SET_VALUE_SEARCH_QUERY_INPUT: 'VALUE_SEARCH_QUERY_INPUT',
    SET_VALUE_SEARCH_QUERY_RATING_INPUT: 'VALUE_SEARCH_QUERY_INPUT_BY_RATING'
}
export const darkModeType = {
    SET_DARK_MODE: 'SET_DARK_MODE'
}

export const authUser = {
    SET_AUTH_USER: 'SET_AUTH_USER'
}

export const setSearchValue = (payload) => ({
    type: filmActionType.SET_VALUE_SEARCH_QUERY_INPUT,
    payload
});

export const setSearchValueRating = (payload) => ({
    type: filmActionType.SET_VALUE_SEARCH_QUERY_RATING_INPUT,
    payload
});

export const setDarkMode = (payload) => {
    localStorage.setItem('isDarkMode', JSON.stringify(payload));
    return {
        type: darkModeType.SET_DARK_MODE,
        payload
    };
};

export const setAuthUser = (payload) => ({
    type: authUser.SET_AUTH_USER,
    payload
});

// export const setAuthUser = (payload) => {
//     window.USER_DATA;
//     // window.payload;
//     return {
//         type: authUser.SET_AUTH_USER,
//         payload
//     };
// };


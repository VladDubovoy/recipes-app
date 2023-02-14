import types from "../types.js";

const defaultState = {
    searchQuery: '',
}

export const searchReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.SET_SEARCH_QUERY:
            return {
                ...state, searchQuery: action.payload
            };
        default:
            return state;
    }
}
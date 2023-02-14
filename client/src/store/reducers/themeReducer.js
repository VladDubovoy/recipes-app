import types from "../types.js";

const defaultState = {
    isDarkTheme: false,
}

export const themeReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.SET_THEME_MODE:
            return {
                ...state, isDarkTheme: action.payload
            };
        default:
            return state;
    }
}
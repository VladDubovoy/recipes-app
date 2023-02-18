import types from "../types.js";

const defaultState = {
    isLoading: false,
}

export const loaderReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.SET_LOADING:
            return {
                ...state, isLoading: action.payload
            };
        default:
            return state;
    }
}
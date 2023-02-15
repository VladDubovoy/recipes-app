import types from "../types.js";

const defaultState = {
    isValid: false,
}

export const formReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.SET_IS_VALID:
            return {
                ...state, isValid: action.payload
            }
        default:
            return state;
    }
}
import types from "../types.js";

const defaultState = {
    isEng: true,
}

export const langReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.SET_LANG:
            return {
                ...state, isEng: action.payload
            };
        default:
            return state;
    }
}
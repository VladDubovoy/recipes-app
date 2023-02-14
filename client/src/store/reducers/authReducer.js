import types from "../types.js";

const defaultState = {
    isAuth: false,
    user: {},
}

export const authReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.SET_AUTH:
            return {
                ...state, isAuth: action.payload
            };
        case types.SET_USER:
            return {
                ...state, user: action.payload
            };
        default:
            return state;
    }
}
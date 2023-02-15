import types from '../types';

const defaultState = {
    recipes: [],
    selectedRecipeId: null,
    initialRecipe: null,
};

export const recipesReducer = (state = defaultState, action ) => {
    switch ( action.type ) {
        case types.ADD_RECIPE:
            return {
                ...state, recipes: [...state.recipes, action.payload]
            };
        case types.SET_RECIPES:
            return {
                ...state, recipes: [...action.payload]
            };
        case types.DELETE_RECIPE:
            return {
                ...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
            }
        case types.UPDATE_RECIPE_BY_ID:
            const newRecipes = [...state.recipes];
            const index = newRecipes.findIndex(r => r.id === action.payload.id);
            newRecipes[index] = action.payload.recipe;
            return {
                ...state, recipes: newRecipes
            }
        case types.SELECT_RECIPE_ID:
            return {
                ...state, selectedRecipeId: action.payload
            }
        case types.SET_INITIAL_RECIPE:
            return {
                ...state, initialRecipe: action.payload
            }
        default:
            return state;
    }
}
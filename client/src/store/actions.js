import types from './types';

const addRecipe = ( recipe ) => ( { type: types.ADD_RECIPE, payload: recipe } );
const setInitialRecipe = (recipe ) => ( { type: types.SET_INITIAL_RECIPE, payload: recipe } );
const setRecipeId = ( recipeId ) => ( { type: types.SELECT_RECIPE_ID, payload: recipeId } );
const setRecipes = ( payload ) => ( { type: types.SET_RECIPES, payload } );
const deleteRecipe = ( recipeId ) => ( { type: types.DELETE_RECIPE, payload: recipeId } );
const updateRecipe = ( id, recipe ) => ( { type: types.UPDATE_RECIPE_BY_ID, payload: { id, recipe } } );
const setSearch = ( query ) => ( { type: types.SET_SEARCH_QUERY, payload: query } );
const setTheme = ( payload ) => ( { type: types.SET_THEME_MODE, payload } );
const setAuth = ( payload ) => ( { type: types.SET_AUTH, payload } );
const setUser = ( payload ) => ( { type: types.SET_USER, payload } );
const setIsValid = ( payload ) => ( {type: types.SET_IS_VALID, payload } );
const setLang = ( payload ) => ( { type: types.SET_LANG, payload } );
const setLoading = ( payload ) => ( { type: types.SET_LOADING, payload } );

const actions = {
    addRecipe,
    setRecipes,
    setRecipeId,
    deleteRecipe,
    updateRecipe,
    setSearch,
    setTheme,
    setAuth,
    setUser,
    setInitialRecipe,
    setIsValid,
    setLang,
    setLoading,
}

export default actions;
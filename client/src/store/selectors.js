const getRecipes = () => state => state.recipes.recipes;
const getIsValid = () => state => state.form.isValid;
const getInitialRecipe = () => state => state.recipes.initialRecipe;
const getSelectedRecipeId = () => state => state.recipes.selectedRecipeId;
const getSelectedRecipe = () => state => state.recipes.recipes.find(recipe => recipe.id === state.recipes.selectedRecipeId);
const getSearchQuery = () => state => state.search.searchQuery;
const getThemeMode = () => state => state.theme.isDarkTheme;
const getAuth = () => state => state.auth.isAuth;
const getUser = () => state => state.auth.user;
const getLang = () => state => state.lang.isEng;

const selectors = {
    getRecipes,
    getSelectedRecipeId,
    getSelectedRecipe,
    getSearchQuery,
    getThemeMode,
    getAuth,
    getInitialRecipe,
    getUser,
    getIsValid,
    getLang,
}

export default selectors;
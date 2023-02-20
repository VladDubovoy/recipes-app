const getRecipes = () => state => state.recipes.recipes;
const getIsValid = () => state => state.form.isValid;
const getInitialRecipe = () => state => state.recipes.initialRecipe;
const getSelectedRecipeId = () => state => state.recipes.selectedRecipeId;
const getThemeMode = () => state => state.theme.isDarkTheme;
const getAuth = () => state => state.auth.isAuth;
const getUser = () => state => state.auth.user;
const getLang = () => state => state.lang.isEng;
const getLoading = () => state => state.loader.isLoading;

const selectors = {
    getRecipes,
    getSelectedRecipeId,
    getThemeMode,
    getAuth,
    getInitialRecipe,
    getUser,
    getIsValid,
    getLang,
    getLoading,
}

export default selectors;
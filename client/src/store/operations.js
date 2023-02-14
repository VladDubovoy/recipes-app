import axios from "axios";
import { toast } from 'react-toastify';
import actions from "./actions.js";
import { API_URL } from "../http";
import { UserService, AuthService, RecipeService } from "../services";

const login = ( email, password ) => async (dispatch, getState) =>  {
    try {
        const { lang } = getState();
        const response = await toast.promise(AuthService.login( email, password ),{
            pending: lang.isEng ? 'Processing...' : 'Обробка...',
            success: lang.isEng ? 'Logged in successfully 👌' : 'Успішний вхід 👌',
        });
        console.log(response)
        if( !response ) {
            return;
        }
        localStorage.setItem('token', response.data.accessToken);
        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(response.data.user));
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}

const register = ( email, password ) => async (dispatch, getState) => {
    try {
        const { lang } = getState();
        const response = await toast.promise(AuthService.registration( email, password ), {
            pending: lang.isEng ? 'Processing...' : 'Обробка...',
            success: lang.isEng ? 'Signed up successfully 👌' : 'Реєстрація успішна',
        });
        console.log(response)
        if( !response ) {
            return;
        }
        localStorage.setItem('token', response.data.accessToken);
        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(response.data.user));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

const logout = () => async (dispatch, getState) => {
    try {
        const { lang } = getState();
        const response = await toast.promise(AuthService.logout(), {
            pending: lang.isEng ? 'Processing...' : 'Обробка...',
            success: lang.isEng ? 'Logged out successfully' : 'Успішний вихід'
        });
        console.log(response);
        localStorage.removeItem('token' );
        dispatch(actions.setAuth(false));
        dispatch(actions.setUser({}));
        dispatch(actions.setTheme(false));
        dispatch(actions.setRecipes([]));
        dispatch(actions.setRecipeId(null));
        dispatch(actions.setInitialRecipe(null));
        dispatch(actions.setSearch(''));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

const checkAuth = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/refresh`, {
            withCredentials: true,
        })
        console.log(response)
        if( !response ){
            return;
        }
        localStorage.setItem('token', response.data.accessToken);
        dispatch(actions.setAuth(true));
        dispatch(actions.setUser(response.data.user));
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const changeTheme = (userTheme ) => async (dispatch) => {
    try {
        const response = await UserService.setTheme(userTheme);
        console.log(response)
        if( !response ){
            return;
        }
        dispatch(actions.setTheme(response.data.isDarkTheme));
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const getTheme = () => async (dispatch) => {
    try {
        const response = await UserService.getTheme()
        console.log(response)
        if( !response ) {
            return;
        }
        dispatch(actions.setTheme(response.data.isDarkTheme));
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const getRecipes = () => async (dispatch) => {
    try {
        const response = await RecipeService.fetchRecipes();
        dispatch(actions.setRecipes(response.data))
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const createRecipe = (recipe) => async (dispatch) => {
    try {
        const response = await RecipeService.createRecipe(recipe);
        console.log(response);
        dispatch(actions.addRecipe(response.data))
        dispatch(actions.setRecipeId(response.data.id))
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const updateRecipeById = (recipeId, recipe) => async (dispatch, getState) => {
    try {
        const { lang } = getState();
        const response = await toast.promise(RecipeService.updateRecipe(recipeId, recipe), {
            pending: lang.isEng ? 'Processing...' : 'Обробка...',
            success: lang.isEng ? 'Recipe has been updated' : 'Рецепт оновлений',
        });
        console.log(response);
        if( !response ) {
            toast.error('error occurred');
            return
        }
        dispatch(actions.updateRecipe(recipeId, response.data))
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const deleteRecipeById = (recipeId) => async (dispatch, getState) => {
    try {
        const { lang } = getState();
        const response = await toast.promise(RecipeService.deleteRecipe(recipeId), {
            pending: lang.isEng ? 'Processing...' : 'Обробка...',
            success: lang.isEng ? 'Recipe has been deleted' : 'Рецепт видалений',
        });
        console.log(response);
        dispatch(actions.deleteRecipe(response.data.id));
    } catch(e) {
        console.log(e.response?.data?.message);
    }
}

const operations = {
    login,
    register,
    logout,
    checkAuth,
    setTheme: changeTheme,
    getTheme,
    getRecipes,
    createRecipe,
    updateRecipeById,
    deleteRecipeById,
}

export default operations;
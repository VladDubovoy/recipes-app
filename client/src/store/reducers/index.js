import { combineReducers } from "redux";
import { recipesReducer } from "./recipesReducer.js";
import { searchReducer } from './searchReducer.js';
import { themeReducer } from './themeReducer.js';
import { authReducer } from "./authReducer.js";
import { langReducer } from "./langReducer.js";
import { formReducer } from './formReducer.js';
import { loaderReducer } from "./loaderReducer.js";

const rootReducer = combineReducers({
    recipes: recipesReducer,
    search: searchReducer,
    theme: themeReducer,
    auth: authReducer,
    lang: langReducer,
    form: formReducer,
    loader: loaderReducer,
});

export default rootReducer;
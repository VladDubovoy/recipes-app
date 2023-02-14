import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RecipeList, RecipeEdit, Logout, Theme, Language } from "../components";
import { selectors, operations } from "../store";

const Home = () => {
    const selectedRecipe = useSelector(selectors.getSelectedRecipe());
    const isDarkTheme = useSelector(selectors.getThemeMode());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(operations.getTheme());
        dispatch(operations.getRecipes());
    }, []);

    return (
        <div className={ isDarkTheme ? 'wrapper dark' : 'wrapper' }>
            <RecipeList />
            { selectedRecipe && <RecipeEdit /> }
            <aside className={'aside-bar'}>
                <Theme/>
                <Language/>
                <Logout/>
            </aside>
        </div>
    );
};

export default memo(Home);
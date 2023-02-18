import React, { useMemo, memo } from 'react';
import { Recipe, SearchBar, Loader } from "../components";
import { useSelector } from 'react-redux';
import { selectors } from "../store";

const RecipeList = () => {
    const recipes =  useSelector(selectors.getRecipes());
    const searchQuery = useSelector(selectors.getSearchQuery());
    const isLoading = useSelector(selectors.getLoading());

    const filteredRecipes = useMemo(() => recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    }), [recipes, searchQuery]);

    return (
        <div className={'recipe-list'}>
            <SearchBar/>
            <div>
                { isLoading && <Loader /> }
                { filteredRecipes.map(recipe => <Recipe key={recipe.id} {...recipe} /> ) }
            </div>
        </div>
    );
};

export default memo(RecipeList);
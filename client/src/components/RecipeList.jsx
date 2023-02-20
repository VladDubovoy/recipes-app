import React, { useMemo, memo, useState, useCallback, useDeferredValue } from 'react';
import { Recipe, SearchBar } from "../components";
import { useSelector } from 'react-redux';
import { selectors } from "../store";

const RecipeList = () => {
    const recipes =  useSelector(selectors.getRecipes());
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => recipe.name.toLowerCase().includes(deferredQuery.toLowerCase()))
    }, [deferredQuery, recipes] );

    const handleSearch = useCallback((e) => {
        setQuery(e.target.value);
    }, []);

    return (
        <div className={'recipe-list'}>
            <SearchBar onChange={handleSearch} value={query} />
            <div>
                { filteredRecipes.map(recipe => <Recipe key={ recipe.id } {...recipe} /> ) }
            </div>
        </div>
    );
};

export default memo(RecipeList);
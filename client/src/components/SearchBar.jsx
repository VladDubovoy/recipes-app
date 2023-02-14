import React, { memo } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actions, operations, selectors} from "../store";

const SearchBar = () => {
    const dispatch = useDispatch();
    const value = useSelector(selectors.getSearchQuery())

    function handleInputChange(e) {
        dispatch(actions.setSearch(e.target.value))
    }

    function handleRecipeAdd() {
        const newRecipe = {
            name: 'New recipe',
            cookTime: '-',
            instructions: '-',
            ingredients: [
                {
                    name: '-',
                    amount: '-'
                }
            ]
        }
        dispatch(operations.createRecipe(newRecipe))
    }
    
    return (
        <div className={"search"}>
            <label htmlFor="search-bar" className={'search__label'}>
                <input
                    type='search'
                    placeholder={'-'}
                    className={'search__input'}
                    value={ value }
                    onChange={handleInputChange}
                />
                <span className={'search-placeholder'}>Type your recipe</span>
            </label>
            <button
                className={'btn btn--primary add-button recipe-add-button'}
                onClick={ handleRecipeAdd }
            >Add recipe
            </button>
        </div>
    );
}

export default memo(SearchBar);
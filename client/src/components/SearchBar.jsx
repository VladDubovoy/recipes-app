import React, { memo } from 'react';
import { useDispatch } from "react-redux";
import { operations } from "../store";

const SearchBar = ( { value, onChange } ) => {
    const dispatch = useDispatch();

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
                    placeholder={' '}
                    className={'search__input'}
                    value={ value }
                    onChange={onChange}
                />
                <span className={'search-placeholder'}>Search</span>
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
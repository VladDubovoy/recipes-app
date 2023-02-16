import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RecipeDto from "../dtos/recipe-dto.js";
import { operations, actions, selectors } from "../store";
import { useLanguage, useValidation } from "../hooks";

const RecipeIngredientEdit = ( { ingredient } ) => {
    const dispatch = useDispatch();
    const selectedRecipe = useSelector(selectors.getSelectedRecipe());
    const { errors, touched, handleTouched, validateForm } = useValidation();
    const isValid = useSelector(selectors.getIsValid());
    const { isEng } = useLanguage();

    function handleChange(e, changes) {
        handleIngredientChange( ingredient.id, {...ingredient, ...changes} );
        validateForm( { [e.target.name]: e.target.value } );
    }

    function handleIngredientDelete(id) {
        const filteredIngredients = selectedRecipe.ingredients.filter(i => i.id !== id);
        if ( filteredIngredients.length === 0 ) {
            toast.warn(isEng ? 'Last ingredient can\'t be removed' : 'Останній інгредієнт не може бути видаленим');
            return;
        }
        if ( !isValid ) {
            return;
        }

        selectedRecipe.ingredients = filteredIngredients;
        const body = new RecipeDto(selectedRecipe);
        dispatch(operations.updateRecipeById( selectedRecipe.id,  body));
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...selectedRecipe.ingredients];
        const index = newIngredients.findIndex(i => i.id === id);
        newIngredients[index] = ingredient;
        handleRecipeUpdate(newIngredients);
    }

    function handleRecipeUpdate(ingredients) {
        dispatch(actions.updateRecipe(selectedRecipe.id, { ...selectedRecipe, ingredients } ))
    }

    return (
        <>
            <div className={'recipe-edit__row'}>
                <input
                    type="text"
                    name={`ingredient-${ingredient.id}`}
                    className={`recipe-edit__input ${errors[`ingredient-${ingredient.id}`] && touched[`ingredient-${ingredient.id}`] ? 'danger-border' : ''}`}
                    value={ ingredient.name }
                    onChange={ (e) => handleChange( e, { name: e.target.value } ) }
                    onBlur={ (e) => handleTouched(e.target.name) }
                />
                { errors[`ingredient-${ingredient.id}`] && touched[`ingredient-${ingredient.id}`] && <span className={'form__error'}>{errors[`ingredient-${ingredient.id}`]}</span> }
            </div>
            <div className={'recipe-edit__row'}>
                <input
                    type="text"
                    name={`amount-${ingredient.id}`}
                    className={`recipe-edit__input ${errors[`amount-${ingredient.id}`] && touched[`amount-${ingredient.id}`] ? 'danger-border' : ''}`}
                    value={ ingredient.amount }
                    onChange={ (e) => handleChange( e, { amount: e.target.value } ) }
                    onBlur={ (e) => handleTouched(e.target.name) }
                />
                { errors[`amount-${ingredient.id}`] && touched[`amount-${ingredient.id}`] && <span className={'form__error'}>{errors[`amount-${ingredient.id}`]}</span> }
            </div>
            <button
                className={'btn btn--danger recipe-edit__ingredient-delete'}
                onClick={() => handleIngredientDelete(ingredient.id)}>
                &times;
            </button>
        </>
    );
};

export default memo(RecipeIngredientEdit);
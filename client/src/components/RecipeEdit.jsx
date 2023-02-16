import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RecipeIngredientEdit } from "../components";
import { actions, selectors, operations } from "../store";
import RecipeDto from "../dtos/recipe-dto.js";
import { useValidation } from "../hooks";

const RecipeEdit = () => {
    const dispatch = useDispatch();
    const selectedRecipe = useSelector(selectors.getSelectedRecipe());
    const { errors, touched, validateForm, handleTouched } = useValidation();
    const isValid = useSelector(selectors.getIsValid());

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard)
        return () => document.removeEventListener('keydown', handleKeyboard)
    }, [])

    // We set 'Redux state' with an updated recipe
    function handleChange(e, changes) {
        dispatch(actions.updateRecipe(selectedRecipe.id, {...selectedRecipe, ...changes}))
        validateForm( { [e.target.name]: e.target.value } );
    }

    function handleIngredientAdd(){
        if ( !isValid ) {
            return;
        }

        const newIngredient = {
            name: '-',
            amount: '-',
        }
        const copyRecipe = {...selectedRecipe}
        copyRecipe.ingredients.push(newIngredient);
        const body = new RecipeDto(copyRecipe);
        dispatch(operations.updateRecipeById( selectedRecipe.id,  body));
    }

    function handleKeyboard (e) {
        if (e.key === "Escape") {
            updateRecipe()
        }
    }

    function updateRecipe() {
        if ( !isValid ) {
            return;
        }

        const body = new RecipeDto(selectedRecipe);
        dispatch(operations.updateRecipeById( selectedRecipe.id,  body));
        dispatch(actions.setRecipeId( null ));
        dispatch(actions.setInitialRecipe( null ));
    }

    return (
        <div className={'recipe-edit'}>
            <div className={'recipe-edit__remove-button-container'}>
                <button
                    className={'btn recipe-edit__close-button'}
                    onClick={ updateRecipe }>
                    &times;
                </button>
            </div>
            <form action="#" noValidate onSubmit={e => e.preventDefault()}>
                <div className={'recipe-edit__details-grid'}>
                    <label
                        htmlFor="name"
                        className={'recipe-edit__label recipe-edit-title'}>
                        Name
                    </label>
                    <div className={'recipe-edit__row'}>
                        <input
                            type="text"
                            id='name'
                            value={selectedRecipe.name}
                            onChange={ (e) => handleChange(e, { name: e.target.value }) }
                            onBlur={(e) => handleTouched(e.target.name)}
                            name='name'
                            className={`recipe-edit__input ${errors.name && touched.name ? 'danger-border' : ''}`}
                        />
                        { errors.name && touched.name && <span className={'form__error'}>{errors.name}</span> }
                    </div>
                    <label
                    htmlFor="cookTime"
                    className={'recipe-edit__label recipe-edit-time'}>
                    Сooking time
                    </label>
                    <div className={'recipe-edit__row'}>
                        <input
                            type="text"
                            id='cookTime'
                            value={selectedRecipe.cookTime}
                            onChange={ (e) => handleChange(e, { cookTime: e.target.value }) }
                            onBlur={(e) => handleTouched(e.target.name)}
                            name='cookTime'
                            className={`recipe-edit__input ${errors.cookTime && touched.cookTime ? 'danger-border' : ''}`}
                        />
                        { errors.cookTime && touched.cookTime && <span className={'form__error'}>{errors.cookTime}</span> }
                    </div>
                    <label
                        htmlFor="instructions"
                        className={'recipe-edit__label recipe-edit-instructions'}>
                        Instructions
                    </label>
                    <div className={'recipe-edit__row'}>
                        <textarea
                            name="instructions"
                            id="instructions"
                            value={selectedRecipe.instructions}
                            onChange={ (e) => handleChange(e, { instructions: e.target.value }) }
                            onBlur={(e) => handleTouched(e.target.name)}
                            cols="30"
                            rows="10"
                            className={`recipe-edit__input ${errors.instructions && touched.instructions ? 'danger-border' : ''}`}
                        />
                        { errors.instructions && touched.instructions && <span className={'form__error'}>{errors.instructions}</span> }
                    </div>
                </div>
                <br/>
                <label htmlFor="recipe-edit__label" className={'recipe-edit-ingredients'}>Ingredients</label>
                <div className={'recipe-edit__ingredient-grid'}>
                    <div className={'recipe-ingredient-edit-name'}>Name</div>
                    <div className={'recipe-ingredient-edit-amount'}>Amount</div>
                    <div className={'recipe-ingredient-edit-blank'}></div>
                    { selectedRecipe.ingredients.map(ingredient => (
                        <RecipeIngredientEdit
                            key={ingredient.id}
                            ingredient={ingredient}
                        /> ) ) }
                </div>
                <div className={'recipe-edit__add-ingredient-btn-container'}>
                    <button
                        className={'btn btn--primary ingredient-add-button'}
                        onClick={ handleIngredientAdd }
                    >
                        Add ingredient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(RecipeEdit);
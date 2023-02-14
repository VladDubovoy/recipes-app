import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IngredientList } from '../components';
import { actions, selectors, operations } from "../store";
import RecipeDto from "../dtos/recipe-dto.js";
import { useValidation } from "../hooks";

const Recipe = ( { id, name, cookTime, instructions, ingredients } ) => {
    const dispatch = useDispatch();
    const isValid = useSelector(selectors.getIsValid());
    const selectedRecipeId = useSelector(selectors.getSelectedRecipeId());
    const selectedRecipe = useSelector(selectors.getSelectedRecipe());
    const initialRecipe = useSelector(selectors.getInitialRecipe());
    const recipes = useSelector(selectors.getRecipes());
    const { reset } = useValidation();

    function handleRecipeEdit(){
        dispatch(actions.setRecipeId(id));
        const initialRecipe = recipes.find(recipe => recipe.id === id);
        dispatch(actions.setInitialRecipe(initialRecipe));
    }

    function handleRecipeDelete(id) {
        dispatch(operations.deleteRecipeById(id));
    }

    function saveRecipe(){
        if( selectedRecipeId != null && selectedRecipeId === id && isValid ) {
            const body = new RecipeDto(selectedRecipe);
            dispatch(operations.updateRecipeById( selectedRecipe.id,  body));
            dispatch(actions.setRecipeId( null ));
            dispatch(actions.setInitialRecipe(null ));
        }
    }

    function cancelChanges(){
        if( selectedRecipeId != null && selectedRecipeId === id && initialRecipe != null ) {
            dispatch(actions.updateRecipe(selectedRecipeId, initialRecipe));
            dispatch(actions.setRecipeId( null ));
            dispatch(actions.setInitialRecipe(null ));
            reset();
        }
    }

    return (
        <div className={'recipe'}>
            <div className={'recipe__header'}>
                <h3 className={'recipe__title'}>{ name }</h3>
                <div className={'recipe-buttons__container'}>
                    { selectedRecipeId === id
                        ? <>
                            <button
                                className={'btn btn--primary mr-1 recipe-save-button'}
                                onClick={ saveRecipe }
                            >Save
                            </button>
                            <button
                                className={'btn btn--danger recipe-cancel-button'}
                                onClick={ cancelChanges }
                            >Cancel
                            </button>
                        </>
                        : <>
                            <button
                                className={'btn btn--primary mr-1 recipe-edit-button'}
                                onClick={ handleRecipeEdit }
                            >Edit
                            </button>
                            <button
                                className={'btn btn--danger recipe-delete-button'}
                                onClick={ () => handleRecipeDelete(id) }
                            >Delete
                            </button>
                        </>
                    }
                </div>
            </div>
            <div className={'recipe__row'}>
                <span className={'recipe__label recipe-time'}>Cooking time:</span>
                <span className={'recipe__value'}>{ cookTime }</span>
            </div>
            <div className={'recipe__row'}>
                <span className={'recipe__label recipe-instructions'}>Instructions:</span>
                <div className={'recipe__value recipe__value--indented recipe__instructions'}>
                    { instructions }
                </div>
            </div>
            <div className={'recipe__row'}>
                <span className={'recipe__label recipe-ingredients'}>Ingredients:</span>
                <div className={'recipe__value recipe__value--indented'}>
                    <IngredientList ingredients={ingredients} />
                </div>
            </div>
        </div>
    );
};

export default memo(Recipe);
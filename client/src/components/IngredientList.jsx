import React, { memo } from 'react';
import { Ingredient } from '../components';

const IngredientList = ( { ingredients } ) => {
    return (
        <div className={'ingredient-grid'}>
            { ingredients.map( ingredient => <Ingredient key={ ingredient.id } { ...ingredient } /> ) }
        </div>
    );
};

export default memo(IngredientList);
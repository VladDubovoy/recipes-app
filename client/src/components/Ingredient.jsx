import React, { memo } from 'react';

const Ingredient = ( { name, amount } ) => {
    return (
        <>
            <span>{name}</span>
            <span>{amount}</span>
        </>
    );
};

export default memo(Ingredient);
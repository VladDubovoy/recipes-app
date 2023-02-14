import React from 'react';
import { ToggleSwitch } from "../components";
import { useLanguage } from "../hooks";

const Language = () => {
    const { handleToggle, isEng } = useLanguage();

    return (
        <ToggleSwitch
            onClick={ handleToggle }
            title={ 'EN' }
            isToggleOn={ !isEng }
            langClass={'lang-title'}
        />
    );
};

export default Language;
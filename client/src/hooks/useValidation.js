import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import actions from "../store/actions.js";
import useLanguage from '../hooks/useLanguage';

const useValidation = () => {
    const dispatch = useDispatch();
    const { isEng } = useLanguage();

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({})

    function validateField(name, inputValue, newErrors) {
        const value = inputValue.trim();

        // Deleting this error field in order to validate it again
        if (newErrors[name] !== undefined) {
            delete newErrors[name];
        }

        switch(name) {
            case 'name':
                if( value.length < 2 ) {
                    newErrors[name] = isEng ? 'Min length 2 letters' : 'Мінімальна довжина 2 символа';
                }
                if( value.length > 40 ) {
                    newErrors[name] = isEng ? 'Max Length 40 letters' : 'Максимльна довжина 40 символів';
                }
                break;
            case 'email':
                const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
                if( !emailRegex.test(value) ) {
                    newErrors[name] = isEng ? 'Email is not valid' : 'Введіть коректний email';
                }
                break;
            case 'password':
                if( value.length < 4 ) {
                    newErrors[name] = isEng ? 'Min length 4 letters' : 'Мінімальна довжина паролю 4 символа';
                }
                if( value.length > 32 ) {
                    newErrors[name] = isEng ? 'Max Length 32 letters' : 'Максимльна довжина паролю 32 символів';
                }
                break;
            default:
                if( value.length === 0 ) {
                    newErrors[name] = isEng ? 'This field is blank' : 'Поле не повинне бути пустим';
                }
        }
        return newErrors
    }

    function validateForm(values) {
        const entries = Object.entries(values);

        const validatedErrors = entries.reduce((total, item) => {
            const [name, value] = item;
            return validateField(name, value, total);
        }, {...errors})
        setErrors(validatedErrors);
        const isValid = Object.keys(validatedErrors).length === 0;
        dispatch( actions.setIsValid(isValid) );
        return isValid;
    }

    function reset() {
        setErrors({});
        setTouched({});
        dispatch( actions.setIsValid(true) );
    }

    function touchForm(values) {
        const touched = Object.keys(values).reduce((total, key) => {
            total[key] = true;
            return total;
        }, {});
        setTouched( touched );
    }

    function handleTouched(name) {
        setTouched(prevState => ( { ...prevState, [name]: true } ));
    }

    return { touched, errors, handleTouched, touchForm, reset, validateForm };
};

export default useValidation;
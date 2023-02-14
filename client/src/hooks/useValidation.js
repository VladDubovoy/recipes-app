import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import actions from "../store/actions.js";

const useValidation = () => {
    const dispatch = useDispatch();

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({})

    function validateErrors(e) {
        const newErrors = { ...errors };

        // Deleting this error field in order to validate it again
        if (newErrors[e.target.name] !== undefined) {
            delete newErrors[e.target.name];
        }
        switch(e.target.name) {
            case 'name':
                if(e.target.value.trim().length < 2) {
                    newErrors[e.target.name] = 'Min length 2 letters';
                }
                if(e.target.value.trim().length > 40) {
                    newErrors[e.target.name] = 'Max Length 40 letters';
                }
                break;
            default:
                if(e.target.value.trim().length === 0) {
                    newErrors[e.target.name] = 'This field is blank';
                }
        }
        setErrors(newErrors);
        dispatch(actions.setIsValid(Object.keys(newErrors).length === 0));
    }

    function reset() {
        setErrors({});
        setTouched({});
        dispatch(actions.setIsValid(true));
    }

    function handleTouched(e) {
        setTouched(prevState => ( { ...prevState, [e.target.name]: true } ));
    }

    return { touched, errors, validateErrors, handleTouched, reset };
};

export default useValidation;
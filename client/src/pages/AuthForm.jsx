import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { operations, selectors } from "../store";
import { useValidation } from "../hooks";

const AuthForm = ( { type } ) => {
    const { errors, touched, validateForm, touchForm, reset, handleTouched } = useValidation();
    const dispatch = useDispatch();
    const isValid = useSelector(selectors.getIsValid());
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        validateForm(values);
    }, [values.email, values.password])

    function handleChange(e) {
        setValues((prevState) => ( { ...prevState, [e.target.name]: e.target.value } ) );
    }

    function onSubmit(e) {
        e.preventDefault();
        touchForm(values);
        validateForm(values);

        if( !isValid ) {
            return;
        }
        if (type === 'signup') {
            dispatch(operations.register(values.email, values.password));
        } else {
            dispatch(operations.login(values.email, values.password));
        }
        reset();
    }

    return (
        <fieldset className={'form'}>
            <legend className={type === 'signup' ? 'signup-auth-form' : 'login-auth-form'}>
                { type === 'signup' ? 'Sign-up form' : 'Login form' }
            </legend>
            <form
                onSubmit={(e) => onSubmit(e)}
                noValidate
            >
                <div className={'form__row'}>
                    <label htmlFor="email" className={'form__label auth-form-email'}>Email</label>
                    <input
                        autoFocus
                        placeholder={'Enter your email'}
                        className={`form__input ${errors.email && touched.email ? 'danger-border' : ''}`}
                        name={'email'}
                        id={'email'}
                        type={"text"}
                        onChange={ (e) => handleChange(e) }
                        onBlur={ (e) => handleTouched(e.target.name) }
                    />
                    { errors.email && touched.email && <span className={'form__error'}>{errors.email}</span> }
                </div>
                <div className={'form__row'}>
                    <label htmlFor="password" className={'form__label auth-form-pass'}>Password</label>
                    <input
                        placeholder={'Enter your password'}
                        className={`form__input ${errors.password && touched.password ? 'danger-border' : ''}`}
                        name={'password'}
                        id={'password'}
                        type={"password"}
                        onChange={ (e) => handleChange(e) }
                        onBlur={ (e) => handleTouched(e.target.name) }
                    />
                    { errors.password && touched.password && <span className={'form__error'}>{errors.password}</span> }
                </div>
                {
                    type === 'signup'
                        ? <button type={'submit'} className={`btn btn--primary sign-up-button`}>Sign-up</button>
                        : <button type={'submit'} className={`btn btn--primary sign-in-button`}>Sign-in</button>
                }
            </form>
            { type === 'signup'
                ? <Link to={'/login'} className={'link-hint go-to-login'}>Go to login</Link>
                : <Link to={'/signup'} className={'link-hint create-account'}>Create an account</Link>
            }
        </fieldset>
    );
};

export default memo(AuthForm);
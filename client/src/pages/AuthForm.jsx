import React, { memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { operations, selectors } from "../store";
import { useValidation } from "../hooks";

const AuthForm = ( { type } ) => {
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();

    const { errors, touched, validateField, handleTouched, reset } = useValidation();
    const isValid = useSelector(selectors.getIsValid());

    function handleChange(e) {
        validateField(e.target.name, e.target.value);
    }

    function onSubmit (e) {
        e.preventDefault();
        validateField(email.current.name, email.current.value);
        validateField(password.current.name, password.current.value);
        handleTouched(email.current.name)
        handleTouched(password.current.name)

        if( !isValid ) {
            return;
        }
        if (type === 'signup') {
            dispatch(operations.register(email.current.value, password.current.value));
        } else {
            dispatch(operations.login(email.current.value, password.current.value));
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
                        ref={email}
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
                        ref={password}
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
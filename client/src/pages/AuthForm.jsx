import React, { useState, memo }  from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { operations } from "../store";

const AuthForm = ( { type } ) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        reValidateMode: "onChange",
        shouldFocusError: true,
    });

    function onSubmit (inputData, e) {
        e.preventDefault();
        const { email, password } = inputData;
        if (type === 'signup') {
            dispatch(operations.register(email, password));
        } else {
            dispatch(operations.login(email, password));
        }
    }

    return (
        <fieldset className={'form'}>
            <legend className={type === 'signup' ? 'signup-auth-form' : 'login-auth-form'}>
                { type === 'signup' ? 'Sign-up form' : 'Login form' }
            </legend>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <div className={'form__row'}>
                    <label htmlFor="email" className={'form__label auth-form-email'}>Email</label>
                    <input
                        {...register("email",
                            {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })
                        }
                        autoComplete='true'
                        autoFocus
                        placeholder={'-'}
                        className={`form__input ${errors.email ? 'danger-border' : ''}`}
                        name={'email'}
                        id={'email'}
                        type={"text"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <span className={'form__placeholder auth-form-email-placeholder'}>Enter your email</span>
                    { errors.email && errors.email.type === "required" && <span className={'form__error'}>This field is required</span> }
                    { errors.email && errors.email.type === "pattern" && <span className={'form__error'}>Invalid email address</span> }
                </div>
                <div className={'form__row'}>
                    <label htmlFor="password" className={'form__label auth-form-pass'}>Password</label>
                    <input
                        {...register("password", {
                            required: true,
                            minLength: 4,
                            maxLength: 32,
                        })}
                        autoComplete='true'
                        placeholder={'-'}
                        className={`form__input ${errors.password ? 'danger-border' : ''}`}
                        name={'password'}
                        id={'password'}
                        type={"password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span className={'form__placeholder auth-form-pass-placeholder'}>Enter your password</span>
                    { errors.password && errors.password.type === "required" && <span className={'form__error'}>This field is required</span> }
                    { errors.password && errors.password.type === "minLength" && <span className={'form__error'}>Min length 4 letters</span> }
                    { errors.password && errors.password.type === "maxLength" && <span className={'form__error'}>Max length isn't to exceed 32 letters</span> }
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
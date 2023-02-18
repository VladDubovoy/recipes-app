import React, { useLayoutEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { operations, selectors } from "../store";
import { Loader } from "../components";

const AuthLayout = () => {
    const isAuth = useSelector(selectors.getAuth());
    const isLoading = useSelector(selectors.getLoading());
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if ( localStorage.getItem('token') ) {
            dispatch(operations.checkAuth());
        }
    }, []);

    if ( isAuth ) {
        return <Navigate to={'/'} replace={ true } />
    }

    return (
        <>
            <Outlet/>
            { isLoading && <Loader overlay={ true } /> }
        </>

    );
};

export default AuthLayout;
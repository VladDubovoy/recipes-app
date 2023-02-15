import React, { useEffect, memo } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { operations, selectors } from "../store";
import { ToastContainer } from 'react-toastify';
import  { Language } from "../components";
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
    const dispatch = useDispatch();
    const isDarkTheme = useSelector(selectors.getThemeMode());
    const isAuth = useSelector(selectors.getAuth());

    useEffect(() => {
        if ( localStorage.getItem('token') ) {
            dispatch(operations.checkAuth());
        }
    }, []);

    return (
        <>
            { !isAuth && <Language/> }
            <Outlet/>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                closeOnClick
                pauseOnHover
                theme={ isAuth && isDarkTheme ? "dark" : "light"}
            />
        </>
    );
};

export default memo(AppLayout);
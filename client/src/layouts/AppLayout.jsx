import React, { memo } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../store";
import { ToastContainer } from 'react-toastify';
import { Language } from "../components";
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
    const isDarkTheme = useSelector(selectors.getThemeMode());
    const isAuth = useSelector(selectors.getAuth());
    const { isActivated } = useSelector(selectors.getUser());

    return (
        <>
            <Outlet/>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                closeOnClick
                pauseOnHover
                theme={ isAuth && isDarkTheme ? "dark" : "light"}
            />
            { ( !isAuth || !isActivated ) && <Language/> }
        </>
    );
};

export default memo(AppLayout);
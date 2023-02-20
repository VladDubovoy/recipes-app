import React, { memo, Suspense } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../store";
import { ToastContainer } from 'react-toastify';
import { Language, Loader } from "../components";
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
    const isDarkTheme = useSelector(selectors.getThemeMode());
    const isAuth = useSelector(selectors.getAuth());
    const { isActivated } = useSelector(selectors.getUser());

    return (
        <Suspense fallback={ <Loader overlay={true}/> } >
            <Outlet/>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                closeOnClick
                pauseOnHover
                theme={ isAuth && isDarkTheme ? "dark" : "light"}
            />
            { ( !isAuth || !isActivated ) && <Language/> }
        </Suspense>
    );
};

export default memo(AppLayout);
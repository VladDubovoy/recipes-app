import React, { memo } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../store";
import { Language } from "../components";

const AuthLayout = () => {
    const isAuth = useSelector(selectors.getAuth());
    if ( isAuth ) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <Language/>
            <Outlet/>
        </>
    );
};

export default memo(AuthLayout);
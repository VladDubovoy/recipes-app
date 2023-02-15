import React, { memo } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../store";

const AuthLayout = () => {
    const isAuth = useSelector(selectors.getAuth());
    if ( isAuth ) {
        return <Navigate to={'/'}/>
    }

    return (
        <Outlet/>
    );
};

export default memo(AuthLayout);
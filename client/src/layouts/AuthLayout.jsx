import React, { memo } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../store";
import { NotFoundPage } from "../pages";

const AuthLayout = () => {
    const isAuth = useSelector(selectors.getAuth());
    if ( isAuth ) {
        return <NotFoundPage/>;
    }

    return (
        <Outlet/>
    );
};

export default memo(AuthLayout);
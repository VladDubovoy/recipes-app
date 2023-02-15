import React, { memo } from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectors } from "../store";
import { Activation } from "../pages";

const RequireAuth = () => {
    const isAuth = useSelector(selectors.getAuth());
    const { isActivated } = useSelector(selectors.getUser());

    return (
        isAuth
            ? isActivated
                ? <Outlet/>
                : <Activation/>
            : <Navigate to={'/login'}/>
    );
};

export default memo(RequireAuth);
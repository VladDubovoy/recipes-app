import React, { memo, Suspense } from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectors } from "../store";
import { Loader } from "../components";
import { Activation } from "../pages";

const RequireAuth = () => {
    const isAuth = useSelector(selectors.getAuth());
    const { isActivated } = useSelector(selectors.getUser());

    return (

        isAuth
            ? isActivated
                ? <Suspense fallback={ <Loader/> }>
                    <Outlet/>
                    </Suspense>
                : <Activation/>
            : <Navigate to={'/login'}/>

    );
};

export default memo(RequireAuth);
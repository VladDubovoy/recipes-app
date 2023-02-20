import React, {lazy, memo} from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectors } from "../store";
const Activation = lazy(() => import('../pages/Activation') );

const RequireAuth = () => {
    const isAuth = useSelector(selectors.getAuth());
    const { isActivated } = useSelector(selectors.getUser());

    if( !isAuth ) {
        return <Navigate to={'/login'} replace={ true } />;
    }

    return (
        isActivated
            ? <Outlet/>
            : <Activation/>
    );
};

export default memo(RequireAuth);
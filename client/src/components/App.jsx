import React, { memo, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import '../styles/app.css';
import { AuthForm, NotFoundPage } from "../pages";
import { RequireAuth } from '../components';
import { AppLayout, AuthLayout } from "../layouts";

const Home = lazy(() => import('../pages/Home'));

function App() {
    return (
        <Routes>
            <Route element={ <AppLayout/> }>
                <Route element={ <AuthLayout/> }>
                    <Route path={'/login'} element={ <AuthForm type={'login'} /> } />
                    <Route path={'/signup'} element={ <AuthForm type={'signup'} /> } />
                </Route>
                <Route path={'/'} element={ <RequireAuth/> }>
                    <Route index element={<Home/>} />
                </Route>
                <Route path={'*'} element={<NotFoundPage/> }/>
            </Route>
        </Routes>
    );
}

export default memo(App);

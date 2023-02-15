import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { operations, selectors } from "../store";
import { useValidation } from "../hooks";

const Logout = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.getUser());
    const { reset } = useValidation();

    const handleLogout = () => {
        dispatch(operations.logout());
        reset();
    }

    return (
        <div className={'logout'}>
            <span className={'logout__email'}>{user.email}</span>
            <button
                className={'btn btn--danger logout__button'}
                onClick={ handleLogout }
            >Log out
            </button>
        </div>
    );
};

export default memo(Logout);
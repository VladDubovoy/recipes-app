import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectors, operations } from "../store";
import { ToggleSwitch } from "../components";

const Theme = () => {
    const dispatch = useDispatch();
    const isDarkTheme = useSelector(selectors.getThemeMode());

    const handleThemeToggle = () => {
        dispatch(operations.changeTheme(!isDarkTheme))
    }

    return (
        <ToggleSwitch
            onClick={handleThemeToggle}
            title={'Dark Mode'}
            isToggleOn={isDarkTheme}
            langClass={'theme-title'}
        />
    );
}

export default memo(Theme);
import React, { memo } from 'react';

const ToggleSwitch = ({ onClick, title, isToggleOn, langClass = '' }) => {
    return (
        <div className={'toggle'}>
            <span className={`toggle__text ${langClass}`}>{title}</span>
            <button className={isToggleOn ? 'toggle__button blue' : 'toggle__button'}
                    onClick={ onClick }
            >
                <span className={isToggleOn ? 'toggle__circle toggle__on' : 'toggle__circle'}></span>
            </button>
        </div>
    );
};

export default memo(ToggleSwitch);
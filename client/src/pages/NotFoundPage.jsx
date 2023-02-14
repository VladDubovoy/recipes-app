import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className={'not-found__container'}>
            <h2 className={'not-found__title'}>Oops! Page is not found
                <strong className={'not-found__number'}>
                    <u>404</u>
                </strong>
            </h2>
            <Link to={'/'} className={'btn btn--danger not-found__button'}>Go Home</Link>
        </div>
    );
};

export default memo(NotFoundPage);
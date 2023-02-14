import React, { memo } from 'react';

const Activation = () => {
    return (
        <div className={'activation__container'}>
            <h2 className={'activation__title'}>Check your inbox to verify your account</h2>
            <div className={'activation-email__container'}>
                <a href={'https://mail.google.com/'}
                   target={'_blank'}
                   className={'btn btn--primary activation__email'}
                >Gmail</a>
                <a href={'https://accounts.ukr.net/login'}
                   target={'_blank'}
                   className={'btn btn--primary activation__email'}
                >Urk.net</a>
            </div>
        </div>
    );
};

export default memo(Activation);
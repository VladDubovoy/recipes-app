import React from 'react';

const Loader = ( { overlay = false } ) => {
    return (
      overlay
        ? <div className={'loader-overlay'}>
              <span className="loader"></span>
          </div>
        : <span className="loader"></span>
    );
};

export default Loader;
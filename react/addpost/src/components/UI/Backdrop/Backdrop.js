import React from 'react';

const backdrop = props => {
    return(
        <div className="reuse-form__overlay">
            {props.children}
        </div>
    );
};

export default backdrop;
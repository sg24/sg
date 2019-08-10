import React from 'react';

const backdrop = props => {
    return(
        <div 
            className="reuse-form__overlay"
            onClick={props.hidAddItm}>
            {props.children}
        </div>
    );
};

export default backdrop;
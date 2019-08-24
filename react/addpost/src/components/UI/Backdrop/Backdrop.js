import React from 'react';

const backdrop = props => {
    return(
        <div className="site-main__fm--overlay">
            {props.children}
        </div>
    );
};

export default backdrop;
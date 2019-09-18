import React from 'react';

const backdrop = props => {
    return (
        <div className="site-main__content--overlay">
            <props.component/>
        </div>
    );
};

export default backdrop;
import React from 'react';

const backdrop = props => {
    return (
        <div className="site-main__content--overlay">
            <props.component err={props.err ? props.err.message : null}/>
        </div>
    );
};

export default backdrop;
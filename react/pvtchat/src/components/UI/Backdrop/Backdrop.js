import React from 'react';

const backdrop = props => {
    return(
        <>
            <div 
                onClick={props.close}
                className="site-main__chat--overlay">
            <props.component 
                {...props}/>
            </div>
        </>
    );
};

export default backdrop;
import React from 'react';

const cntBackdrop = props => {
    return(
        <>
            <div 
                onClick={props.close}
                className="site-main__chat--cnt-overlay">
            <props.component 
                {...props}/>
            </div>
        </>
    );
};

export default cntBackdrop;
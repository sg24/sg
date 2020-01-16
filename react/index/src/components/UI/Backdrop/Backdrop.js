import React from 'react';

const backdrop = props => {
    return (
        <div className="site-main__content--overlay">
             <div 
                className="site-main__content--overlay__close"
                onClick={props.close}></div>
            <props.component 
                {...props}
                changePost={props.changePost}
                closeChangePost={props.closeChangePost}/>
        </div>
    );
};

export default backdrop;
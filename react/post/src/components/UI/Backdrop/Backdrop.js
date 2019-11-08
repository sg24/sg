import React from 'react';

const backdrop = props => {
    return (
        <div className="site-main__content--overlay">
            <props.component 
                {...props}
                changePost={props.changePost}
                closeChangePost={props.closeChangePost}/>
        </div>
    );
};

export default backdrop;
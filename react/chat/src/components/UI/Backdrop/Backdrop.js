import React from 'react';

const backdrop = props => {
    let modalClass = ['site-main__chat--overlay'];

    if (props.isCnt) {
        modalClass.push('site-main__chat--err')
    }

    return(
        <>
            <div 
                onClick={props.close}
                className={modalClass.join(' ')}>
            <props.component 
                {...props}/>
            </div>
        </>
    );
};

export default backdrop;
import React from 'react';

import './Loader.css';
const loader = props => {
    let cnt = 'Loading ....';
    if (props.cnt) {
        cnt = props.cnt
    }
    return (
        <section className="global">
        <div className="global__wrapper">
        <div>
            <div className="top mask">
            <div className="plane"></div>
            </div>
            <div className="middle mask">
            <div className="plane"></div>
            </div>
            <div className="bottom mask">
            <div className="plane"></div>
            </div>
        </div>
        <p>{cnt}</p>
        </div>
    </section>
    );
}

export default loader;
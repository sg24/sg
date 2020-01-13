import React from 'react';

import './Loader.css';
const loader = props => {
    let cnt = 'Loading ....';
    let loaderClass = ["global"];

    if (props.cnt) {
        cnt = props.cnt
    }
    if (props.view) {
        loaderClass.push("global_view");
    }

    return (
        <section className={loaderClass.join(' ')}>
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
import React from 'react';

import './Loader.css';
const loader = props => {
    let cnt = 'Loading ....';
    let globalClass = ['global'];

    if (props.cnt) {
        cnt = props.cnt
    }

    if (props.bg) {
        globalClass.push('global--bg')
    }

    return (
        <section className={globalClass.join(' ')}>
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
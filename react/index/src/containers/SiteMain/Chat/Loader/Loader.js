import React from 'react';

import './Loader.css';
const loader = props => {
    let loaderClass = ['global'];
    let loadingClass = [''];
    let cnt = "Loading ....";
    if (props.nav) {
        loaderClass.push('global-nav')
        loadingClass.push('global-load')
    }

    if (props.cnt) {
        cnt = props.cnt;
    }
    
    if (props.main) {
        loaderClass.push('global-bg')
    }

    if (props.bg) {
        loaderClass.push('global-nav-nobg')
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
        <p className={loadingClass.join(' ')}>{cnt}</p>
        </div>
    </section>
    )
}

export default loader;
import React from 'react';

import './Loader.css';
const loader = () => (
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
        <p>Loading ....</p>
        </div>
    </section>
)

export default loader;
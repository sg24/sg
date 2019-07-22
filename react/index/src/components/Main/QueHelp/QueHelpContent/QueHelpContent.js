import React from 'react';

import './QueHelpContent.css';

const queHelpContent = props => {
    let queHelpCnt = (
        <div className="reuse-que-help__cnt">
            <h4 className="reuse-que-help__cnt--title">You are not logged in.</h4>
            <ul>
                <li><a href="/" className="reuse-que-help__cnt--login">login in</a> </li>
                <li><a href="/" className="reuse-que-help__cnt--sign">sign up</a></li>
            </ul>
        </div>
    );

    if (props.auth) {
        queHelpCnt = (
            <div className="reuse-que-help__cnt">
                <h4 className="reuse-que-help__cnt--title reuse-que-help__cnt--title__add-grp">You have no shared Question!.</h4>
            </div>
        );
    };

    return (
        <div className="reuse-que-help">
            <div className="reuse-que-help__wrapper">
                <div className="reuse-que-help__icn">
                    <i className="fas fa-hand-paper icon icon__reuse-que-help--user"></i>
                </div>
               {queHelpCnt}
            </div>
        </div>
    );
};

export default queHelpContent;
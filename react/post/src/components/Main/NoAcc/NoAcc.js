import React from'react';

import './NoAcc.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const noAcc = props => {
    let noAccContent = (
        <div className="reuse-no-acc__cnt">
            <h4 className="reuse-no-acc__cnt--title">You are not logged in.</h4>
            <ul>
                <li><a href="/" className="reuse-no-acc__cnt--login">login in</a> </li>
                <li><a href="/" className="reuse-no-acc__cnt--sign">sign up</a></li>
            </ul>
        </div>
    );
    
    if (props.isAuth) {
        noAccContent = (
            <div className="reuse-no-acc__cnt">
                <h4 className="reuse-no-acc__cnt--title reuse-no-acc__cnt--title__add-grp">You have no { props.det } yet!.</h4>
            </div>
        );
    }

    return (
        <div className="reuse-no-acc">
            <div className="reuse-no-acc__wrapper">
                <div className="reuse-no-acc__icn">
                <FontAwesomeIcon 
                    icon={['fas', 'users']} 
                    className={props.icnClass} />
                </div>
                {noAccContent}
            </div>
        </div>
    );
};

export default noAcc;
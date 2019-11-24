import React from'react';

import './NoAcc.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const noAcc = props => {
    let noAccClass = ['reuse-no-acc'];

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
                <h4 className="reuse-no-acc__cnt--title reuse-no-acc__cnt--title__add-grp"> { props.det } </h4>
            </div>
        );
    }

    if (props.isNotify) {
        noAccClass.push('reuse-no-acc__notify');
    }

    return (
        <div className={noAccClass.join(' ')}>
            <div className="reuse-no-acc__wrapper">
                <div className="reuse-no-acc__icn">
                <FontAwesomeIcon 
                    icon={['fas', props.icn]} 
                    className={props.icnClass} />
                </div>
                {noAccContent}
            </div>
        </div>
    );
};

export default noAcc;
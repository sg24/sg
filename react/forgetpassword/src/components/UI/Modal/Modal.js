import React from 'react';

import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const modal = props => {
    return (
        <div className="reuse-form__modal">
            <div className="reuse-form__modal--icn">
            <FontAwesomeIcon 
                icon={['fas', 'envelope']} 
                className="icon icon__reuse-form--modal"/>
            </div>
            <h4>Message sent successfully</h4>
            <p className="reuse-form__modal--success"> 
                Please check you email address <span className="reuse-form__modal--success__cnt">{props.email}</span> to reset password
            </p>
        </div>
    );
}

export default modal
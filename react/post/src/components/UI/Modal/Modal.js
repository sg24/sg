import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const modal = props => (
    <div className="reuse-pt__modal">
        <div className="reuse-pt__modal--icn">
            <FontAwesomeIcon 
                icon={['fas', 'times']} 
                className="icon icon__reuse-pt--modal__icn"/>
        </div>
        <h3> {props.err} </h3> 
    </div>
);

export default modal;
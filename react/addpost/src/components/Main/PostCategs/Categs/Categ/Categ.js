import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const categ = props => (
    <li>
        {props.categ} 
        <div>
            <FontAwesomeIcon 
                icon={['fas', 'times']} 
                className="icon icon__reuse-form__cnt--tag__close" />
        </div>
    </li>
);

export default categ;
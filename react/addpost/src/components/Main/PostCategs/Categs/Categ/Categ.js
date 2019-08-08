import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const categ = props => {
    let categActiveClass = [];

    if (props.categActiveProps && props.index === props.categActiveProps.index && props.categActiveProps.active) {
        categActiveClass.push('reuse-form__cnt--tag__itm--active');
    }
    return (
        <li 
            className={categActiveClass.join(' ')} >
            {props.categ} 
            <div 
                onMouseEnter={props.categActive}
                onMouseLeave={props.categDefault}
                onClick={props.removeCategSelect}>
                <FontAwesomeIcon 
                    icon={['fas', 'times']} 
                    className="icon icon__reuse-form__cnt--tag__close" />
            </div>
        </li>
    );
};

export default categ;
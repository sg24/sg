import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const selectCateg = props => {

    return (
        <li>
        { props.category}
            <div 
                onClick={props.removeSelectCateg}>
                <FontAwesomeIcon 
                    icon={['fas', 'times']} 
                    className="icon icon__reuse-filter--close"/>
            </div>
        </li>
    );
};

export default selectCateg;
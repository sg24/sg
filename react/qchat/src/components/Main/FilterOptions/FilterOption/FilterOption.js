import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const filterOption = props => {
    let filterOptClass = [];

    for (let filterItm of props.filterSelect) {
        if (filterItm.id === props.filterOpt.id) {
            filterOptClass = ['reuse-filter__opt--cnt__det--active']
        }
    }

    return (
        <li 
            onClick={props.filterItm}
            className={filterOptClass.join(' ')}>
            {props.filterOpt.filterType} 
            <span>
                <FontAwesomeIcon 
                    icon={['fas', props.filterOpt.filterRangeIcn]}
                    className="icon icon__reuse-filter--cnt__angle" />
                {props.filterOpt.filterRange}
            </span>
        </li>
    );
};

export default filterOption;
import React from 'react';

const filterCategory = props => {
    let categGrpClass = null;
    if (props.categSelectGrp === props.category) {
        categGrpClass = 'reuse-filter__opt--cnt__det--active';
    }

    return (
        <li 
            onClick={props.categSelect}
            className={categGrpClass}>
        { props.category}
        </li>
    );
};

export default filterCategory;
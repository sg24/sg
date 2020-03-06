import React from 'react';

const filterCategory = props => {

    return (
        <li 
            onClick={props.categSelect}>
        { props.category}
        </li>
    );
};

export default filterCategory;
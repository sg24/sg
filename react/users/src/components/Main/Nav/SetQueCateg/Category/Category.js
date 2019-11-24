import React from 'react';

const category = props => (
    <li onClick={props.queCateg}>{ props.categ }</li>
);

export default category;
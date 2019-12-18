import React from 'react';
import { NavLink } from 'react-router-dom';

const Filter = props => (
    <li> 
        <NavLink
            to={ props.path + '/' + props.tag}
            activeClassName='reuse-tag__cnt--active'
            className="reuse-tag__cnt--tag">{ props.tag } </NavLink> 
    </li> 
);

export default Filter;
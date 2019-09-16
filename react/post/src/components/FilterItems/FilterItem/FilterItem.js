import React from 'react';
import { NavLink } from 'react-router-dom';

const Filter = props => (
    <li> 
        <NavLink
            to={ props.path + '/' + props.tag}>{ props.tag } </NavLink> 
    </li> 
);

export default Filter;
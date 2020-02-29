import React from 'react';
import NavLink from '../../../hoc/Link/Link';

const Filter = props => (
    <li> 
        <NavLink
            href={ props.path + '/' + props.tag}
            activeClassName='reuse-tag__cnt--active'
            className="reuse-tag__cnt--tag">{ props.tag } </NavLink> 
    </li> 
);

export default Filter;
import React from 'react';
import { NavLink } from 'react-router-dom';

const category = props => (
    <li>
        <NavLink
            to={`/question/${props.categ}`}
            className='reuse-categ__opt--itm'
            activeClassName='reuse-categ__opt--itm__active'>
            { props.categ }
        </NavLink>
    </li>
);

export default category;
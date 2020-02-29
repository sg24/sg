import React from 'react';
import NavLink from '../../../../hoc/Link/Link';

const category = props => (
    <li>
        <NavLink
            href={`/post/${props.categ}`}
            className='reuse-categ__opt--itm'
            activeClassName='reuse-categ__opt--itm__active'>
            { props.categ }
        </NavLink>
    </li>
);

export default category;
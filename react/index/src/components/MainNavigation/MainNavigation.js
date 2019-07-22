import React from 'react';
import { NavLink } from 'react-router-dom';

const mainNavigation = props => (
    <li>
        <NavLink 
            to={props.path}
            activeClassName="active">
            <i className={props.icnClass}></i> 
            {props.children}
            <div className="active__main active__main--tab">
                <div>9</div>
            </div>
        </NavLink>
    </li>
);

export default mainNavigation;
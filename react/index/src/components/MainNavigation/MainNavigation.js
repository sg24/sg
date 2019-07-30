import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mainNavigation = props => (
    <li>
        <NavLink 
            to={props.path}
            activeClassName="active">
            <FontAwesomeIcon 
                icon={['fas', props.icnGrp]} 
                className={props.icnClass} /> 
            {props.children}
            <div className="active__main active__main--tab">
                <div>9</div>
            </div>
        </NavLink>
    </li>
);

export default mainNavigation;
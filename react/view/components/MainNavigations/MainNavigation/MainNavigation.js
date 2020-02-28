import React from 'react';
import NavLink from '../../../hoc/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mainNavigation = props => {
    let active = null;

    if (props.active && props.active > 0) {
        active =  (
            <div className="active__main active__main--tab">
                <div>{props.active < 100 ? props.active : '99'}</div>
            </div>
        )
    }
    return (
        <li
            onClick={props.removeActive}>
            <NavLink 
                href={props.path}
                activeClassName="active-content-tab">
                <FontAwesomeIcon 
                    icon={['fas', props.icnGrp]} 
                    className={props.icnClass} /> 
                {props.children}
                {active}
            </NavLink>
        </li>
    )
};

export default mainNavigation;
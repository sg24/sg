import React from 'react';

import ActiveLink from './ActiveLink';

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
            <ActiveLink
                href={props.path}
                icnGrp={props.icnGrp}
                icnClass={props.icnClass}>
                { props.children }
                {active}
            </ActiveLink>
        </li>
    )
};

export default mainNavigation;
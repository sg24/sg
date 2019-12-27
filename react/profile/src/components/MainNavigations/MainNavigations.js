import React from 'react';

import MainNavigation from './MainNavigation/MainNavigation';

const mainNavigations = props => {
    const allMainNav = [{...props.content}].map(mainNav => (
        <MainNavigation 
            key={mainNav.path}
            path={mainNav.path}
            icnGrp={mainNav.icnGrp} 
            icnClass={mainNav.icnClass} 
            active={props.active}
            removeActive={props.removeActive}>
            {mainNav.title}</MainNavigation>
    ));

    return allMainNav;
};

export default mainNavigations;
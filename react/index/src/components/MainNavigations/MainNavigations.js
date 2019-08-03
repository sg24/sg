import React from 'react';

import MainNavigation from './MainNavigation/MainNavigation';

const mainNavigations = props => {
    let oldPropsContent = {...props.content};
    let newPropsContent = {};
    let mainNavs = [];

    for (let key in oldPropsContent) { 
        newPropsContent[key] = oldPropsContent[key];
        mainNavs.push(newPropsContent[key]);
    }

    const allMainNav = mainNavs.map(mainNav => (
        <MainNavigation 
            key={mainNav.path}
            path={mainNav.path}
            icnGrp={mainNav.icnGrp} 
            icnClass={mainNav.icnClass} 
            active={mainNav.active}>
            {mainNav.title}</MainNavigation>
    ));

    return allMainNav;
};

export default mainNavigations;
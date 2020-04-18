import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationOptions = props => {
    return (
        <ul className="site-header__nav-opt">
            <NavigationItem  path="/post">News Feed</NavigationItem>
            <NavigationItem path="/question">Question</NavigationItem>
            <NavigationItem path="/poet">Write Up</NavigationItem>
            <NavigationItem path="/users">Scholars</NavigationItem>
        </ul>
    )
};

export default navigationOptions;


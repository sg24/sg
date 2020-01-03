import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationOptions = props => {
    return (
        <ul className="site-header__nav-opt">
            <NavigationItem  path="/post">Post</NavigationItem>
            <NavigationItem path="/question">Question</NavigationItem>
            <NavigationItem path="/poet">Poet/Writer</NavigationItem>
            <NavigationItem path="/users">Users</NavigationItem>
        </ul>
    )
};

export default navigationOptions;


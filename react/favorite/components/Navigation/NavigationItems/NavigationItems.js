import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    let addNewOptClass = ["site-header__add-new--opt"]
    if (props.show) {
        addNewOptClass.push("site-header__add-new--opt__visible")
    }

    return (
        <ul className={addNewOptClass.join(' ')}>
            <NavigationItem  path="/add/post">News Feed</NavigationItem>
            <NavigationItem path="/add/question">Question</NavigationItem>
            {/* <NavigationItem path="/add/group">Group</NavigationItem> */}
            {/* <NavigationItem path="/add/onlineexam">Timed Question</NavigationItem> */}
            <NavigationItem path="/question">Answer</NavigationItem>
            <NavigationItem path="/add/poet">Writers</NavigationItem>
            <NavigationItem path="/add/group">Chat Room</NavigationItem>
        </ul>
    )
};

export default navigationItems

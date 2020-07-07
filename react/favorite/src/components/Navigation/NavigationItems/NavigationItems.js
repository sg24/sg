import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    let addNewOptClass = ["site-header__add-new--opt"]
    if (props.show) {
        addNewOptClass.push("site-header__add-new--opt__visible")
    }

    return (
        <ul className={addNewOptClass.join(' ')}>
            <NavigationItem  path="/add/post">Feed</NavigationItem>
            <NavigationItem path="/add/question">Question</NavigationItem>
            <NavigationItem path="/add/qchat">CBT</NavigationItem>
            <NavigationItem path="/question">Answer</NavigationItem>
            <NavigationItem path="/add/poet">Write Up</NavigationItem>
            <NavigationItem path="/add/group">Chat Room</NavigationItem>
            <NavigationItem path="/add/advert">Advert</NavigationItem>
            <NavigationItem path="/add/aroundme">Post</NavigationItem>
            <NavigationItem path="/add/contest">Contest</NavigationItem>
            <NavigationItem path="/add/contact">Contact Us</NavigationItem>
        </ul>
    )
};

export default navigationItems

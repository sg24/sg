import React from 'react';

const navigationList = props => (
    <li><a href={'/' + props.category + '/' + props.navList}> {props.navList}</a></li>
);

export default navigationList
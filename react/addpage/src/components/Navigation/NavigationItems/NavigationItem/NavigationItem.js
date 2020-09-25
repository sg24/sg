import React from 'react';

const navigationItem = props => (
    <li><a href={props.path}>{props.children}</a></li>
);

export default navigationItem
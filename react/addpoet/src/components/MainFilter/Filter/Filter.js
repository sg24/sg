import React from 'react';

const filter = props => (
    <li
        onClick={props.viewCnt}>
        <div
            style={{
                paddingLeft: props.filterPos
            }}>
            {props.filterRes.title}
        </div>
    </li>
);

export default filter;
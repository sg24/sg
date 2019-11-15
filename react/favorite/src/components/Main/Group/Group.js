import React from 'react';
import GroupContent from './GroupContent/GroupContent';

const group = props => {
    const group = props.content.map((grp, index) => (
        <GroupContent 
            key={index}
            grp={grp}
            userOpt={props.userOpt.bind(this, index)}
            showOpt={props.showUserOpt}
            index={index}/>
    ));

    return (
        group
    );
}

export default group;
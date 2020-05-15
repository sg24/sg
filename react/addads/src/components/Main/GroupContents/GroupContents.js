import React from 'react';

import GroupContent from './GroupContent/GroupContent';

const GroupContents = props => {
    const allGroups = props.content.map((group, index) => (
        <GroupContent
            key={index}
            cnt={group}
            selected={props.selected.bind(this, group)}
            selectedUser={props.selectedUser}
            id={group.id}/> 
    ));

    return allGroups;
};

export default GroupContents;
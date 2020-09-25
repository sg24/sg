import React from 'react';
import arraySort from 'array-sort';

import GroupContent from './GroupContent/GroupContent';

const group = props => {
    let content = arraySort(props.content, 'groupCreated', {reverse: true})
    const allGroup = content.map((cnt, index) => (
        <GroupContent 
            key={index} 
            cnt={cnt}
            selected={props.selected.bind(this, cnt)}
            selectedGroup={props.selectedGroup}
            />
    ));

    return allGroup;
}

export default group;
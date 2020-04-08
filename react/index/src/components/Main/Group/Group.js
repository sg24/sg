import React from 'react';
import arraySort from 'array-sort';

import GroupContent from './GroupContent/GroupContent';

const group = props => {
    let content = arraySort(props.content, 'groupCreated', {reverse: true})
    const allGroup = content.map((cnt, index) => (
        <GroupContent 
             key={index} 
             cnt={cnt}
             groupInfo={props.groupInfo.bind(this, cnt)}
             join={props.join.bind(this, cnt._id, 'join')} 
             joinStartID ={props.joinStartID }
             joined={props.joined}
             cancelReq={props.join.bind(this, cnt._id, 'cancel')}/>
    ));

    return allGroup;
}

export default group;
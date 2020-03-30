import React from 'react';
import arraySort from 'array-sort';

import GroupContent from './GroupContent/GroupContent';

const chats = props => {
    let content= arraySort(props.cnts, 'groupCreated', {reverse: true});
    let allChat = content.map((cnt, index) => (
        <GroupContent 
            key={index}
            cnt={cnt}/>
    ))

    return allChat;
}

export default chats;
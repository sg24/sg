import React from 'react';
import arraySort from 'array-sort';

import Edit from './Edit/Edit';

const edits = (props) =>{
    let content= arraySort(props.cnts, 'created', {reverse: false});
    let allChat = content.map((cnt, index) => (
            <Edit 
                key={index}
                cnt={cnt}
                users={props.users}
                userImage={props.userImage}
                filterChat={props.filterChat}
                selected={props.selected}/>
        ))

        return allChat;
}

export default edits;
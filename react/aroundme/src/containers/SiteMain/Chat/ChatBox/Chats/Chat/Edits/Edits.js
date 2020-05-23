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
                cntID={props.cntID}
                hold={props.hold}
                selected={props.selected}
                editChat={props.editChat}
                userID={props.userID}
                download={props.download}/>
        ))

        return allChat;
}

export default edits;
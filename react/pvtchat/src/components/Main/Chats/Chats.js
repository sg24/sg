import React from 'react';
import arraySort from 'array-sort';

import Chat from './Chat/Chat';

const chats = (props) =>{
    let content= arraySort(props.cnts, 'created', {reverse: false});
    let allChat = content.map((cnt, index) => (
            <Chat 
                key={index}
                cnt={cnt}
                curPos={index}
                cntLength={content.length}
                users={props.users}
                filterChat={props.filterChat}
                hold={props.hold.bind(this, cnt.chatID)}
                released={props.released.bind(this, cnt.chatID)}
                selected={props.selected}/>
        ))

        return allChat;
}

export default chats;
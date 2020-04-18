import React from 'react';
import arraySort from 'array-sort';

import Chat from './Chat/Chat';

const chats = (props) =>{
    let content= arraySort(props.cnts, 'position', {reverse: false});
    let allChat = content.map((cnt, index) => (
            <Chat 
                key={index}
                cnt={cnt}
                users={props.users}
                userImage={props.userImage}
                filterChat={props.filterChat}
                hold={props.hold.bind(this, cnt.chatID)}
                released={props.released.bind(this, cnt.chatID)}
                selected={props.selected}
                userID={props.userID}/>
        ))

        return allChat;
}

export default chats;
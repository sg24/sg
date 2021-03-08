import React from 'react';

import ChatItemBox from './ChatItemBox/ChatItemBox';

const chatItem = props => {
    let direction = 'left'
    return props.cnt.map((cnt, index) => (
        <ChatItemBox
            key={index}
            cnt={cnt}
            userProfile={props.userProfile.bind(this, cnt.authorID)}
            userID={props.userID}
            showReply={props.showReply}
            showUserImage={ cnt.authorID !== (props.cnt[index+1] ? props.cnt[index+1].authorID : null)}
            direction={(cnt.authorID !== (props.cnt[index-1] ? props.cnt[index-1].authorID : null)) ? 
                direction === 'right' ? direction = 'left' : direction = 'right' :
                direction}
            showOption={props.showOption.bind(this, cnt)}
            sendChatInfo={props.sendChatInfo.bind(this, cnt)}/>
    ));
}


export default chatItem;
import React from 'react';

import ChatItemBox from './ChatItemBox/ChatItemBox';

const chatItem = props => {
    let direction = 'right';
    let startDate = new Date();
    startDate.setHours(0,0,0,0);
    let endDate = startDate;

    function checkDate(created) {
        let createdStartDate = new Date(created);
        createdStartDate.setHours(0,0,0,0);
        if (startDate.getTime() > createdStartDate.getTime()) {
            endDate = new Date(created);
            endDate.setHours(23,59,59,999);
            startDate = createdStartDate;
            return true;
        }

        if (endDate.getTime() < new Date(created).getTime()) {
            endDate = new Date(created);
            endDate.setHours(23,59,59,999);
            return true;
        }
        return false;
    }
    return props.cnt.map((cnt, index) => (
        <ChatItemBox
            key={index}
            width={props.width}
            cnt={cnt}
            userProfile={props.userProfile.bind(this, cnt.authorID)}
            userID={props.userID}
            showReply={props.showReply}
            fetchChatStart={props.fetchChatStart}
            replyChat={props.replyChat.bind(this, cnt)}
            showUserImage={props.userID !== cnt.authorID}
            direction={props.userID === cnt.authorID ? 'right' : 'left' }
            showOption={props.showOption.bind(this, cnt, direction)}
            showReplyOption={props.showOption}
            chatBoxPosition={props.chatBoxPosition}
            scrollToChat={props.scrollToChat}
            sendChatInfo={props.sendChatInfo.bind(this, cnt)}
            deleteChatBox={props.deleteChatBox}
            editChatBox={props.editChatBox}
            preview={props.preview}
            disableUserOpt={props.disableUserOpt}
            enableReply={props.enableReply}
            showDuration={checkDate(cnt.created)}
            openURI={props.openURI}
            firstItem={index === 0}
            loadPrevious={props.loadPrevious}
            enableLoadPrevious={props.enableLoadPrevious}
            searchText={props.searchText}
            highlighted={props.highlighted}
            />
    ));
}


export default chatItem;
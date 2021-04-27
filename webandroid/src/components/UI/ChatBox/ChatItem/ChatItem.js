import React from 'react';
import moment from 'moment';

import ChatItemBox from './ChatItemBox/ChatItemBox';

const chatItem = props => {
    let direction = 'right';
    let startDate = moment().startOf('date');
    let endDate;
    function checkDate(created) {
        if (new Date(startDate).getTime() > new Date(created).getTime()) {
            let day = new Date(startDate).getDate() - new Date(created).getDate();
            endDate =  new Date(new Date(startDate).getTime() - (day * 3600 * 24 * 1000 - (3600 * 24 * 1000)));
            startDate = new Date(new Date(startDate).getTime() - (day * 3600 * 24 * 1000));
            return true;
        }

        if (new Date(endDate).getTime() < new Date(created).getTime()) {
            let day =  new Date(created).getDate() - new Date(endDate).getDate();
            endDate = new Date(new Date(endDate).getTime() + (day * 3600 * 24 * 1000 + (3600 * 24 * 1000)));
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
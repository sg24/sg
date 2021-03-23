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
            cnt={cnt}
            userProfile={props.userProfile.bind(this, cnt.authorID)}
            userID={props.userID}
            showReply={props.showReply}
            fetchChatStart={props.fetchChatStart}
            replyChat={props.replyChat.bind(this, cnt)}
            showUserImage={ cnt.authorID !== (props.cnt[index+1] ? props.cnt[index+1].authorID : null)}
            direction={
                (cnt.authorID !== (props.cnt[index-1] ? props.cnt[index-1].authorID : null)) ? 
                direction === 'right' ? direction = 'left' : direction = 'right' :
                direction }
            showOption={props.showOption.bind(this, cnt, direction)}
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
            />
    ));
}


export default chatItem;
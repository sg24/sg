import React from 'react';
import moment from 'moment';

import ChatItemBox from './CommentItemBox/CommentItemBox';

const commentItem = props => {
    let direction = startDirection('left', props.cnt);
    let startDate = moment().startOf('date');
    let endDate;
    function startDirection(direction, chat) {
        let check = 1;
        for (let _ of chat) {
            let cnt  = chat[chat.length - check];
            ++check;
            direction = (cnt.authorID !== (chat[chat.length-check] ? chat[chat.length-check].authorID : null)) ? 
                direction === 'right' ? direction = 'left' : direction = 'right' :
                direction
        }
        return direction
    }
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
            correct={props.changeReaction.bind(this, cnt._id, cnt.content, 'setCorrect', false, 'Are you sure this answer is correct !!')}
            wrong={props.changeReaction.bind(this, cnt._id, cnt.content, 'setWrong', false, 'Are you sure this answer is wrong !!')}
            chatBoxReaction={props.chatBoxReaction}
            showReply={props.showReply}
            hideSolutionInfo={props.hideSolutionInfo}
            fetchChatStart={props.fetchChatStart}
            replyChat={props.replyChat.bind(this, cnt)}
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
            searchText={props.searchText}
            highlighted={props.highlighted}
            />
    ));
}


export default commentItem;
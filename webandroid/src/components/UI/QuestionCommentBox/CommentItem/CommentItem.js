import React from 'react';

import ChatItemBox from './CommentItemBox/CommentItemBox';

const commentItem = props => {
    // let direction = startDirection('left', props.cnt);
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
            showOption={props.showOption.bind(this, cnt, (index%2) === 0 ? 'left' : 'right')}
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
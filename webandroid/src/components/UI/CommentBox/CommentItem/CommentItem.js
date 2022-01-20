import React from 'react';

import ChatItemBox from './CommentItemBox/CommentItemBox';

const commentItem = props => {
    // let direction = startDirection('left', props.cnt);
    // function startDirection(direction, chat) {
    //     let check = 1;
    //     for (let _ of chat) {
    //         let cnt  = chat[chat.length - check];
    //         ++check;
    //         direction = (cnt.authorID !== (chat[chat.length-check] ? chat[chat.length-check].authorID : null)) ? 
    //             direction === 'right' ? direction = 'left' : direction = 'right' :
    //             direction
    //     }
    //     return direction
    // }
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
            showReply={props.showReply}
            fetchChatStart={props.fetchChatStart}
            replyChat={props.replyChat.bind(this, cnt)}
            showUserImage={ cnt.authorID !== (props.cnt[index+1] ? props.cnt[index+1].authorID : null)}
            // direction={
            //     (cnt.authorID !== (props.cnt[index-1] ? props.cnt[index-1].authorID : null)) ? 
            //     direction === 'right' ? direction = 'left' : direction = 'right' :
            //     direction }
            direction={(index%2) === 0 ? 'left' : 'right'}
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
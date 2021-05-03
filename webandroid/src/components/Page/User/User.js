import React from 'react';

import PrivateConv from '../../Main/Conv/PrivateConv/PrivateConv';

const user = props => {
    return props.cnt.map((cnt, index) => (
        <PrivateConv 
            key={index}
            cnt={cnt}
            hideMessage={props.hideMessage}
            userID={props.userID}
            userProfile={props.userProfile.bind(this, cnt._id)}
            chat={props.chat.bind(this, cnt)}
            addUser={props.changeProfile.bind(this, cnt._id, null, 'addUser', true)}
            acceptUser={props.changeProfile.bind(this, cnt._id, cnt.username, 'acceptUser', true)}
            rejUser={props.changeProfile.bind(this, cnt._id, cnt.username, 'rejUser', false, 'Are you sure you want to reject this user !')}
            cancelReq={props.changeProfile.bind(this, cnt._id, cnt.username, 'cancelReq', false, 'Are you sure you want to cancel this request !')}
            unfriend={props.changeProfile.bind(this, cnt._id, cnt.username, 'unfriend', false, 'Are you sure you want to remove this user !')}
            pageReaction={props.pageReaction}
            closeModal={props.closeModal}
            lastItem={(props.cnt.length - 1) === index}
            enableLoadMore={props.enableLoadMore}
            start={props.start}
            loadMore={props.loadMore}/>
    ));
}

export default user;
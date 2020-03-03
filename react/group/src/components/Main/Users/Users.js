import React from 'react';

import User from './User/User';

const users = props => {
    const allUser = props.content.map((user, index) => (
        <User 
            key={index} 
            user={user}
            addUser={props.changeCnt.bind(this, user.id, null, 'addUser', true)}
            blockUser={props.changeCnt.bind(this, user.id, user.username, 'blockUser', false)}
            acceptUser={props.changeCnt.bind(this, user.id, user.username, 'acceptUser', false)}
            rejUser={props.changeCnt.bind(this, user.id, user.username, 'rejUser', false)}
            cancelReq={props.changeCnt.bind(this, user.id, user.username, 'cancelReq', false)}
            unfriend={props.changeCnt.bind(this, user.id, user.username, 'unfriend', false)}/>
    ));

    return allUser;
}

export default users;
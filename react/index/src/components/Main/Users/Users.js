import React from 'react';

import User from './User/User';

const users = props => {
    const allUser = props.content.map((user, index) => (
        <User 
            key={index} 
            user={user}
            addUser={props.changeCnt.bind(this, user.id, null, 'addUser', true, 'user')}
            blockUser={props.changeCnt.bind(this, user.id, user.username, 'blockUser', false, 'user')}
            acceptUser={props.changeCnt.bind(this, user.id, user.username, 'acceptUser', false, 'user')}
            rejUser={props.changeCnt.bind(this, user.id, user.username, 'rejUser', false, 'user')}
            cancelReq={props.changeCnt.bind(this, user.id, user.username, 'cancelReq', false, 'user')}
            unfriend={props.changeCnt.bind(this, user.id, user.username, 'unfriend', false, 'user')}/>
    ));

    return allUser;
}

export default users;
import React from 'react';

import User from './User/User';

const Users = props => {
    const allUsers = props.content.map((user, index) => (
        <User 
            key={index}
            userDet={user}
            id={user._id}
            userOpt={props.userOpt}
            curTab={props.curTab}
            disable={props.disable}
            accept={props.changeCnt.bind(this, user._id, 'accept', user.username, true)}
            reject={props.changeCnt.bind(this, user._id, 'reject', user.username, false)}
            remove={props.changeCnt.bind(this, user._id, 'remove', user.username, false)}/> 
    ));

    return allUsers;
};

export default Users;
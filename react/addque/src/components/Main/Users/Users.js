import React from 'react';

import User from './User/User';

const Users = props => {
    const allUsers = props.content.map((user, index) => (
        <User 
            key={index}
            userDet={user}
            selected={props.selected.bind(this, user)}
            selectedUser={props.selectedUser}
            id={user.id}/> 
    ));

    return allUsers;
};

export default Users;
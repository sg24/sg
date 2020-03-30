import React from 'react';

import User from './User/User';

const Users = props => {
    const allUsers = props.content.map((user, index) => (
        <User 
            key={index}
            userDet={user}
            typing={props.typing}/> 
    ));

    return allUsers;
};

export default Users;